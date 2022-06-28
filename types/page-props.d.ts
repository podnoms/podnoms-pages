import {Domain, Podcast, PodcastEntry} from "../models";

export type PodcastPageProps = {
  featured: PodcastEntry;
  podcast: Podcast;
  domain: Domain;
}

export type EpisodePageProps = PodcastPageProps & {
  episode: PodcastEntry
}
