import React from "react";
import Wavesurfer from "wavesurfer.js";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { useTheme } from "next-themes";
import { debug } from "console";
// import daisyuiColors from "daisyui/src/colors/themes";
const daisyuiColors = require("daisyui/src/colors/themes");
type WaveformComponentProps = {
  audioUrl: string;
  pcmUrl: string;
  playAudio: any;
};
const WaveformComponent = ({
  audioUrl,
  pcmUrl,
  playAudio,
}: WaveformComponentProps) => {
  const { theme } = useTheme();

  const fullConfig = resolveConfig(tailwindConfig);
  const waveform = React.useRef<WaveSurfer | null>(null);

  React.useEffect(() => {
    console.log("waveform-component", "fullConfig", fullConfig.theme.colors);
  }, [fullConfig]);

  React.useEffect(() => {
    playAudio.current = () => {
      waveform.current?.play();
    };
  }, [playAudio]);

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
        waveColor: daisyuiColors[`[data-theme=${theme}]`]["accent"],
        progressColor: daisyuiColors[`[data-theme=${theme}]`]["neutral"],
        height: 48,
        responsive: true,
        hideScrollbar: true,
        barWidth: 1,
      });
    }
  }, [audioUrl, pcmUrl, theme]);

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
      <span className="absolute bottom-0 left-0 z-50 mb-0.5 text-sm text-base-content bg-opacity-20  bg-secondary-focus">
        00:00:00
      </span>
      <div id="waveform" className="h-12 overflow-hidden"></div>
      <span className="absolute bottom-0 right-0 z-50 mb-0.5 text-sm bg-opacity-20 text-base-content bg-secondary-focus">
        01:55:12
      </span>
    </div>
  );
};

export default WaveformComponent;
