import { Podcast, PodcastEntry } from "models";
import React from "react";
interface IEpisodeComponentProps {
  podcast: Podcast;
  episode: PodcastEntry;
}
const EpisodeComponent: React.FC<IEpisodeComponentProps> = ({ podcast, episode }) => {
  return <div>{episode.title}</div>;
};

export default EpisodeComponent;
