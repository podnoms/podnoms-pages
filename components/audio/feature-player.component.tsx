import React from "react";
import Image from "next/image";

import { MdPlayCircleFilled, MdPauseCircleFilled } from "react-icons/md";
import dynamic from "next/dynamic";
import { HtmlRenderComponent } from "../index";

const WaveformComponent = dynamic(() => import("./waveform-component"), {
  ssr: false,
});

export enum PlayState {
  Stopped,
  Playing,
  Paused,
}

interface IFeaturePlayerComponentProps {
  title: string;
  description: string;
  audioUrl: string;
  pcmUrl: string;
  imageUrl: string;

  // position: number;
  initialPlayState: PlayState;
}

const FeaturePlayerComponent = ({
  title,
  description,
  audioUrl,
  pcmUrl,
  imageUrl,
  initialPlayState,
}: IFeaturePlayerComponentProps) => {
  const playAudio = React.useRef<() => void>(null);
  const [playState, setPlayState] = React.useState<PlayState>(initialPlayState);

  React.useEffect(() => {
    if (
      audioUrl &&
      playAudio.current &&
      initialPlayState === PlayState.Playing
    ) {
      playAudio.current();
    }
  }, [audioUrl, initialPlayState]);

  return (
    <div className="flex items-center w-full h-12">
      <div className="flex-none w-12 h-12 p-1">
        <Image src={imageUrl} alt={title} width={64} height={64} />
      </div>
      <div
        className="flex-none w-12 h-12 cursor-pointer stroke-0 align-center"
        onClick={() => {
          if (playAudio.current) {
            playAudio.current();
          }
        }}
      >
        {playState === PlayState.Stopped || playState === PlayState.Paused ? (
          <MdPlayCircleFilled className="w-full h-full delay-100 hover:text-secondary" />
        ) : (
          <MdPauseCircleFilled className="w-full h-full delay-100 hover:text-secondary" />
        )}
      </div>
      <div className="flex-grow h-full overflow-hidden">
        <WaveformComponent
          playAudio={playAudio}
          audioUrl={audioUrl}
          pcmUrl={pcmUrl}
          playStateChanged={() => {
            setPlayState(
              playState === PlayState.Stopped
                ? PlayState.Playing
                : PlayState.Paused
            );
          }}
        />
      </div>
      <div className="flex-initial hidden w-52 md:block">
        <div className="flex flex-col px-2 text-sm">
          <div className="flex-grow text-sm leading-tight line-clamp-1">
            {title}
          </div>
          <HtmlRenderComponent html={description} maxLines={1} />
        </div>
      </div>
    </div>
  );
};

export default FeaturePlayerComponent;
