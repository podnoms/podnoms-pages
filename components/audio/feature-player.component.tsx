import React from "react";
import Image from "next/image";
import {
  MdFavoriteBorder,
  MdPauseCircleFilled,
  MdPlayCircleFilled,
  MdSkipNext,
} from "react-icons/md";

const FeaturePlayerComponent = () => {
  const nowPlaying = {
    podcastTitle: "Podcast Fergal's Mixyboos from PodNoms",
    episodeTitle: "Fergal@Home - Lower your expectations mix",
    smallImage:
      "https://cdn.podnoms.com/images/entry/151ecf21-893b-4f19-4009-08da306fce5c.jpg?width=725&height=748&cb=6ab5b0d6-81f4-4d95-826d-6782c787aad0",
  };
  return (
    <div className="flex items-center w-full h-12">
      <div className="flex-none w-12 h-12 p-1">
        <Image
          src={nowPlaying?.smallImage}
          alt={nowPlaying?.podcastTitle}
          width={64}
          height={64}
        />
      </div>
      <div className="flex-none w-12 h-12 cursor-pointer stroke-0 align-center">
        <MdPlayCircleFilled className="w-full h-full delay-100 hover:text-secondary" />
      </div>
      <div className="grow">
        
      </div>
      <div className="flex-none">
        <div className="flex flex-col px-2 text-sm">
          <div className="flex-grow font-medium text-gray-200">
            {nowPlaying?.podcastTitle}
          </div>
          <div className="font-light text-gray-200">
            {nowPlaying?.episodeTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePlayerComponent;
