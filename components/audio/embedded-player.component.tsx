import React from "react";
import Image from "next/image";

import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store/store";
import { PlayButtonComponent } from "components";

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
  episodeId: string;
  episodeTitle: string;
  description: string;
  audioUrl: string;
  pcmUrl: string;
  imageUrl: string;
  onClickHome?: () => void;
  // position: number;
}

const EmbeddedPlayerComonent = ({
  theme,
  podcastTitle,
  episodeId,
  episodeTitle,
  description,
  audioUrl,
  pcmUrl,
  imageUrl,
  onClickHome,
}: IEmbeddedPlayerComponentProps) => {
  const dispatch = useDispatch();
  const { playState } = useSelector((state: RootState) => state.audio);
  React.useEffect(() => {
    console.log("embedded-player.component", "Theme", theme);
  }, [theme]);
  return (
    <div
      className={`flex p-3 ${
        theme === "dark" ? "bg-embedded-dark" : "bg-embedded-light"
      }`}
    >
      <div id="image">
        <Image
          className="cursor-pointer"
          onClick={() => onClickHome && onClickHome()}
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
        <div className="flex items-center pt-4">
          <PlayButtonComponent
            episodeId={episodeId}
            playState={playState}
            extraClasses="w-20 mt-5"
          />
          <div className="flex-grow pt-6 overflow-hidden">
            <WaveformComponent
              audioDuration={0}
              currentPosition={0}
              playState={playState}
              audioUrl={audioUrl}
              pcmUrl={pcmUrl}
            />
            <div className="flex justify-between invisible">
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
