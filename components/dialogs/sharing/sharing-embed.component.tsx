import { PodcastEntry } from "models";
import React from "react";
import { FeaturePlayerComponent, EmbeddedPlayerComonent } from "../../audio";
interface ISharingEmbedComponent {
  episode: PodcastEntry;
}
const SharingEmbedComponent: React.FC<ISharingEmbedComponent> = ({
  episode,
}) => {
  const [theme, setTheme] = React.useState("dark");
  return (
    <div>
      <div className="px-4 pt-8">
        <EmbeddedPlayerComonent
          theme={theme}
          onClickHome={() => {}}
          podcastTitle={episode.podcastTitle}
          episodeTitle={episode.title}
          description={episode.description}
          audioUrl={episode.audioUrl}
          pcmUrl={episode.pcmUrl}
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
