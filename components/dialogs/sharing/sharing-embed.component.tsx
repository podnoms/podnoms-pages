import { PodcastEntry } from "models";
import React from "react";
import { FeaturePlayerComponent } from "../../audio";
interface ISharingEmbedComponent {
  episode: PodcastEntry;
}
const SharingEmbedComponent: React.FC<ISharingEmbedComponent> = ({
  episode,
}) => {
  return (
    <div>
      <div className="px-4 pt-8">
        <FeaturePlayerComponent
          onClickHome={() => {}}
          podcastTitle={episode.podcastTitle}
          episodeTitle={episode.title}
          audioUrl={episode.audioUrl}
          pcmUrl={episode.pcmUrl}
          position={0}
          imageUrl={episode.imageUrl}
        />
      </div>
      <div className="py-3 shadow-md">
        <div className="flex flex-row justify-evenly">
          <label className="cursor-pointer label">
            <span className="label-text">Light Player</span>
            <input
              type="radio"
              name="radio-6"
              className="radio checked:bg-red-500"
              checked
            />
          </label>
          <label className="cursor-pointer label">
            <span className="label-text">Dark Player</span>
            <input
              type="radio"
              name="radio-6"
              className="radio checked:bg-blue-500"
              checked
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SharingEmbedComponent;
