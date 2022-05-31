import React from "react";
import Image from "next/image";
import type WaveSurferType from "wavesurfer.js";

import { MdPlayCircleFilled } from "react-icons/md";
import dynamic from "next/dynamic";

const WaveformComponent = dynamic(() => import("./waveform-component"), {
  ssr: false,
});

const FeaturePlayerComponent = () => {
  const nowPlaying = {
    podcastTitle: "Fergal's Mixyboos",
    episodeTitle: "Fergal@Home - Lower your expectations mix",
    audioUrl:
      "https://api.podnoms.com/audio/2ef3cd54-df28-40d4-bc61-08d804c488ea.mp3",
    pcmUrl:
      "https://cdn.podnoms.com/waveforms/ed87efe9-f1fe-46c9-3a1b-08d7a9fff3c2.json",
    imageUrl:
      "https://i.pdnm.be/images/entry/44c3c133-900e-49c2-666b-08d72c897f8b.jpg?width=725&height=748&cb=7bf2bb13-b492-4605-b1e7-a39ec99b96c2",
  };

  const waveFormPlayer = React.createRef<typeof WaveformComponent>();
  const playAudio = React.useRef<() => void>(null);

  return (
    <div className="flex items-center w-full h-12">
      <div className="flex-none w-12 h-12 p-1">
        <Image
          src={nowPlaying?.imageUrl}
          alt={nowPlaying?.podcastTitle}
          width={64}
          height={64}
        />
      </div>
      <div
        className="flex-none w-12 h-12 cursor-pointer stroke-0 align-center"
        onClick={() => {
          if (playAudio.current) {
            playAudio.current();
          }
        }}
      >
        <MdPlayCircleFilled className="w-full h-full delay-100 hover:text-secondary" />
      </div>
      <div className="h-full overflow-hidden grow">
        <WaveformComponent
          playAudio={playAudio}
          audioUrl={nowPlaying.audioUrl}
          pcmUrl={nowPlaying.pcmUrl}
        />
      </div>
      <div className="flex-none hidden md:block">
        <div className="flex flex-col px-2 text-sm">
          <div className="flex-grow text-sm leading-tight">
            {nowPlaying?.podcastTitle}
          </div>
          <div className="text-xs font-light leading-tight">
            {nowPlaying?.episodeTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePlayerComponent;
