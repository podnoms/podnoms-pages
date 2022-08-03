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

interface IEmbeddedPlayerComponentProps {
  theme: string;
  podcastTitle: string;
  episodeTitle: string;
  description: string;
  audioUrl: string;
  pcmUrl: string;
  imageUrl: string;
  onClickHome: () => void;
  // position: number;
}

const EmbeddedPlayerComonent = ({
  theme,
  podcastTitle,
  episodeTitle,
  description,
  audioUrl,
  pcmUrl,
  imageUrl,
  onClickHome,
}: IEmbeddedPlayerComponentProps) => {
  const dispatch = useDispatch();
  const { playState } = useSelector((state: RootState) => state.audio);

  return (
    <div
      className={`flex p-3 ${
        theme === "dark" ? "bg-embedded-dark" : "bg-embedded-light"
      }`}
    >
      <div id="image">
        <Image
          className="cursor-pointer"
          onClick={() => onClickHome()}
          src={imageUrl}
          alt={episodeTitle}
          width={180}
          height={180}
        />
      </div>
      <div id="details" className="w-full ml-2">
        <div id="details-head w-full">
          <div className="text-sm tracking-wider text-base-content/70 line-clamp-1">
            {podcastTitle}
          </div>
          <div className="text-lg font-extrabold tracking-wider line-clamp-1">
            {episodeTitle}
          </div>
        </div>
        <div className="flex items-center">
          <div
            className="flex-none w-20 pt-6 cursor-pointer stroke-0 align-center"
            onClick={() => {
              dispatch(
                setPlayState(
                  playState === PlayState.Stopped ||
                    playState === PlayState.Paused
                    ? PlayState.Playing
                    : PlayState.Paused
                )
              );
            }}
          >
            {playState === PlayState.Stopped ||
            playState === PlayState.Paused ? (
              <MdPlayCircleFilled className="w-full h-full delay-100 hover:text-secondary" />
            ) : (
              <MdPauseCircleFilled className="w-full h-full delay-100 hover:text-secondary" />
            )}
          </div>
          <div className="flex-grow h-full pt-6 overflow-hidden">
            <WaveformComponent
              audioDuration={0}
              currentPosition={0}
              playState={playState}
              audioUrl={audioUrl}
              pcmUrl={pcmUrl}
            />
            <div className="flex justify-between">
              <button className="text-white btn btn-xs btn-outline ">1x</button>
              <div className="text-2xs btn-group">
                <button className="px-1 uppercase">Share</button>
                <button className="px-1 uppercase">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbeddedPlayerComonent;
