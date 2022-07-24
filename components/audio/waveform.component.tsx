import React from "react";
import Wavesurfer from "wavesurfer.js";
import { useTheme } from "next-themes";
import { PlayState } from "./feature-player.component";
import { secondsToHHMMSS } from "../../services/utils/dateUtils";

const daisyuiColors = require("daisyui/src/colors/themes");
type WaveformComponentProps = {
  audioUrl: string;
  pcmUrl: string;
  playState: PlayState;
};
const WaveformComponent = ({
  audioUrl,
  pcmUrl,
  playState,
}: WaveformComponentProps) => {
  const { theme } = useTheme();
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [totalTime, setTotalTime] = React.useState(0);

  const waveform = React.useRef<WaveSurfer | null>(null);

  React.useEffect(() => {
    if (playState === PlayState.Playing) {
      waveform.current?.play();
    } else {
      waveform.current?.pause();
    }
  }, [playState, audioUrl]);

  React.useEffect(() => {
    const waveColour = daisyuiColors[`[data-theme=${theme}]`]["primary"];
    const progressColour = daisyuiColors[`[data-theme=${theme}]`]["secondary"];
    if (!waveform.current && audioUrl && pcmUrl) {
      waveform.current = Wavesurfer.create({
        backend: "MediaElement",
        container: "#waveform",
        cursorWidth: 0,
        waveColor: waveColour,
        progressColor: progressColour,
        height: 48,
        responsive: true,
        hideScrollbar: true,
        barWidth: 1,
      });
    }
  }, [audioUrl, pcmUrl, theme, playState]);

  React.useEffect(() => {
    waveform.current?.setWaveColor(
      daisyuiColors[`[data-theme=${theme}]`]["primary"]
    );
    waveform.current?.setProgressColor(
      daisyuiColors[`[data-theme=${theme}]`]["secondary"]
    );
  }, [theme]);

  React.useEffect(() => {
    const loadPcm = async () => {
      if (waveform.current) {
        const response = await fetch(pcmUrl);
        if (response.ok) {
          const result = await response.json();
          const peaks = result.data.map((p: number) => p / 128);
          waveform.current.backend.setPeaks(peaks);
          waveform.current.drawBuffer();
          waveform.current.load(audioUrl, peaks, "auto");
          waveform.current.on("audioprocess", (e) => {
            setElapsedTime(e);
            setTotalTime(waveform.current?.getDuration() ?? 0);
          });
          waveform.current.on("ready", (r) => {
            setTotalTime(waveform.current?.getDuration() ?? 0);
            if (playState === PlayState.Playing) {
              waveform?.current?.play();
            }
          });
        }
      }
    };
    loadPcm();
    // don't add PlayState as a dependency, it's not a part of the state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pcmUrl, audioUrl]);

  return (
    <div id="wrapper" className="relative">
      <span className="absolute bottom-0 left-0 z-50 text-xs font-semibold text-neutral-content bg-opacity-20 ">
        {secondsToHHMMSS(elapsedTime)}
      </span>
      <div id="waveform" className="h-12 overflow-hidden"></div>
      <span className="absolute bottom-0 right-0 z-50 text-xs font-semibold bg-opacity-20 text-neutral-content ">
        {secondsToHHMMSS(totalTime)}
      </span>
    </div>
  );
};

export default WaveformComponent;
