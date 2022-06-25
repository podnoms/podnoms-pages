import React from "react";
import Image from "next/image";

import { MdPlayCircleFilled, MdPauseCircleFilled } from "react-icons/md";
import dynamic from "next/dynamic";
import { HtmlRenderComponent } from "../index";
import { setPlayState } from "services/store/audio.store";
import { useDispatch, useSelector } from "react-redux";

const WaveformComponent = dynamic(() => import("./waveform-component"), {
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
  description: string;
  audioUrl: string;
  pcmUrl: string;
  imageUrl: string;
  onClickHome: () => void;
  // position: number;
}

const FeaturePlayerComponent = ({
  podcastTitle,
  episodeTitle,
  description,
  audioUrl,
  pcmUrl,
  imageUrl,
  onClickHome,
}: IFeaturePlayerComponentProps) => {
  const dispatch = useDispatch();
  const { playState } = useSelector((state) => state.audio);

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
          <MdPlayCircleFilled className="w-full h-full delay-100 hover:text-secondary" />
        ) : (
          <MdPauseCircleFilled className="w-full h-full delay-100 hover:text-secondary" />
        )}
      </div>
      <div className="flex-grow h-full overflow-hidden">
        <WaveformComponent
          playState={playState}
          audioUrl={audioUrl}
          pcmUrl={pcmUrl}
        />
      </div>
      <div className="flex-initial hidden w-52 md:block">
        <div className="flex flex-col px-2 text-sm">
          <div className="flex-grow text-sm leading-tight line-clamp-1">
            {podcastTitle}
          </div>
          <div className="flex-grow text-sm leading-tight line-clamp-1">
            {episodeTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePlayerComponent;
