import React from "react";
import Image from "next/image";

import { MdPlayCircleFilled, MdPauseCircleFilled } from "react-icons/md";
import dynamic from "next/dynamic";

const WaveformComponent = dynamic(() => import("./waveform-component"), {
  ssr: false,
});
enum PlayState {
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
  // playState: PlayState;
}
const FeaturePlayerComponent = ({
  title,
  description,
  audioUrl,
  pcmUrl,
  imageUrl,
}: IFeaturePlayerComponentProps) => {
  const waveFormPlayer = React.createRef<typeof WaveformComponent>();
  const playAudio = React.useRef<() => void>(null);
  const [playState, setPlayState] = React.useState<PlayState>(
    PlayState.Stopped
  );
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
      <div className="h-full overflow-hidden grow">
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
      <div className="flex-none hidden md:block">
        <div className="flex flex-col px-2 text-sm">
          <div className="flex-grow text-sm leading-tight">{title}</div>
          <div className="text-xs font-light leading-tight">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePlayerComponent;
