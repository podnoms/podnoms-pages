import PodcastEntry from "./podcast-entry.model";
import Podcast from "./podcast.model";

export default interface NowPlaying {
  podcast: Podcast;
  entry: PodcastEntry;
  position: number;
}
