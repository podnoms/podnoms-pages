import React from "react";
import Image from "next/image";

import { MdPlayCircleFilled, MdPauseCircleFilled } from "react-icons/md";
import dynamic from "next/dynamic";
import { setPlayState } from "services/store/audio.store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store/store";

const WaveformComponent = dynamic(() => import("./waveform.component"), {
  ssr: false,
});

export enum PlayState {
  Stopped,
  Playing,
  Paused,
}

interface IFeaturePlayerComponentProps {
  podcastTitle: string;
  episodeTitle: string;
  audioUrl: string;
  audioDuration: number;
  pcmUrl: string;
  imageUrl: string;
  position: number;
  onClickHome: () => void;
}

const FeaturePlayerComponent = ({
  podcastTitle,
  episodeTitle,
  audioUrl,
  audioDuration,
  pcmUrl,
  imageUrl,
  position,
  onClickHome,
}: IFeaturePlayerComponentProps) => {
  const dispatch = useDispatch();
  const { playState, nowPlaying } = useSelector(
    (state: RootState) => state.audio
  );

  return (
    <div className="flex items-center w-full h-12">
      <div className="flex-none w-12 h-12 p-1">
        <Image
          className="cursor-pointer"
          onClick={() => onClickHome()}
          src={imageUrl}
          alt={episodeTitle}
          width={64}
          height={64}
        />
      </div>
      {process.env.SHOW_DEBUG_INFO && (
        <div>
          {playState === PlayState.Playing
            ? "Playing"
            : playState === PlayState.Paused
            ? "Paused"
            : "Stopped"}
        </div>
      )}
      <div
        className="flex-none w-12 h-12 cursor-pointer stroke-0 align-center"
        onClick={() => {
          dispatch(
            setPlayState(
              playState === PlayState.Stopped || playState === PlayState.Paused
                ? PlayState.Playing
                : PlayState.Paused
            )
          );
        }}
      >
        {playState === PlayState.Stopped || playState === PlayState.Paused ? (
          <MdPlayCircleFilled className="w-full h-full delay-200 text-info hover:text-secondary" />
        ) : (
          <MdPauseCircleFilled className="w-full h-full delay-200 text-info hover:text-secondary" />
        )}
      </div>
      <div className="flex-grow h-full overflow-hidden">
        <WaveformComponent
          playState={playState}
          audioDuration={audioDuration}
          audioUrl={audioUrl}
          pcmUrl={pcmUrl}
          currentPosition={position}
          progress={(e) => localStorage.setItem("_npp", `${e}`)}
        />
      </div>
      <div className="flex-initial hidden w-52 md:block">
        <div className="flex flex-col px-2 text-sm">
          <div className="flex-grow text-sm leading-tight line-clamp-1">
            {episodeTitle}
          </div>
          <div className="flex-grow text-sm leading-tight line-clamp-1">
            {podcastTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePlayerComponent;
