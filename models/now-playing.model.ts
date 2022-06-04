import PodcastEntry from "./podcast-entry.model";

export default interface NowPlaying {
  entry: PodcastEntry;
  position: number;
}
