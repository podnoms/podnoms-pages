import React from "react";
import Wavesurfer from "wavesurfer.js";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

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
      waveform.current = Wavesurfer.create({
        backend: "MediaElement",
        container: "#waveform",
        waveColor: "primary",
        cursorColor: "#fff",
        height: 48,
        responsive: true,
        hideScrollbar: true,
        barWidth: 1,
      });
    }
  }, [audioUrl, pcmUrl, fullConfig.theme.colors]);

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
  }, [pcmUrl]);

  return <div id="waveform" className="h-16 overflow-hidden"></div>;
};

export default WaveformComponent;
