import React from "react";
import Wavesurfer from "wavesurfer.js";
import { useTheme } from "next-themes";
import { PlayState } from "./feature-player.component";
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

  const waveform = React.useRef<WaveSurfer | null>(null);

  React.useEffect(() => {
    console.log("waveform-component", "playState", playState);
    if (playState === PlayState.Playing) {
      waveform.current?.play();
    } else {
      waveform.current?.pause();
    }
  }, [playState, audioUrl]);

  React.useEffect(() => {
    if (!waveform.current && audioUrl && pcmUrl) {
      console.log(
        "waveform-component",
        "accent",
        daisyuiColors[`[data-theme=${theme}]`].secondary
      );
      waveform.current = Wavesurfer.create({
        backend: "MediaElement",
        container: "#waveform",
        cursorWidth: 0,
        waveColor: daisyuiColors[`[data-theme=${theme}]`]["accent"],
        progressColor: daisyuiColors[`[data-theme=${theme}]`]["neutral"],
        height: 48,
        responsive: true,
        hideScrollbar: true,
        barWidth: 1,
      });
    }
    if (playState === PlayState.Playing) {
      waveform.current?.play();
    }
  }, [audioUrl, pcmUrl, theme, playState]);

  React.useEffect(() => {
    const loadPcm = async () => {
      if (waveform.current) {
        const response = await fetch(pcmUrl);
        if (response.ok) {
          var result = await response.json();
          const peaks = result.data.map((p: number) => p / 128);
          waveform.current.backend.setPeaks(peaks);
          waveform.current.drawBuffer();
          waveform.current.load(audioUrl, peaks, "auto");
        }
      }
    };
    loadPcm();
  }, [pcmUrl, audioUrl]);

  return (
    <div id="wrapper" className="relative">
      <span className="absolute bottom-0 left-0 z-50 mb-0.5 text-xs text-neutral-content bg-opacity-20  ">
        00:00:00
      </span>
      <div id="waveform" className="h-12 overflow-hidden"></div>
      <span className="absolute bottom-0 right-0 z-50 mb-0.5 text-xs bg-opacity-20 text-neutral-content ">
        01:55:12
      </span>
    </div>
  );
};

export default WaveformComponent;
