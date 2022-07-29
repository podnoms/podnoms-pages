import { Podcast, PodcastEntry } from "models";

export const getNowPlaying = (featured: PodcastEntry): PodcastEntry => {
  const nowPlaying = localStorage.getItem("_np");

  if (nowPlaying) {
    return JSON.parse(nowPlaying);
  }
  return featured;
};
export const getNowPlayingEpisode = (episode: PodcastEntry): PodcastEntry => {
  const nowPlaying = localStorage.getItem("_np");
  if (nowPlaying) {
    return JSON.parse(nowPlaying);
  }
  return episode;
};
export const getNowPlayingPosition = (): number => {
  return Number.parseInt(localStorage.getItem("_npp") || "0");
};
