import PodcastAggregator from "./podcast-aggregator.model";
import PodcastEntry from "./podcast-entry.model";

export default interface Podcast {
  id: string;
  title: string;
  description: string;
  slug: string;
  coverImageUrl: string;
  imageUrl: string;
  thumbnailUrl: string;
  customDomain: string;
  rssUrl: string;
  createDate: Date;
  podcastEntries: PodcastEntry[];
  aggregators: PodcastAggregator[];

  private: boolean;
  authUserName: string;
  authPassword: string;

  facebookUrl: string;
  twitterUrl: string;
  publicTitle: string;

  dateLoaded: Date;
}
