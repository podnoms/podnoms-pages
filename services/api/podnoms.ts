import { PodcastEntry, Podcast } from "models";
import service from "./server";
import { Domain } from "../../models";
import PodcastAggregator from "../../models/podcast-aggregator.model";

const getFeaturedEntry = async (
  user: string,
  podcast: string
): Promise<PodcastEntry> => {
  const response = await service.get(`/podcast/${user}/${podcast}/featured`);
  return response.data as PodcastEntry;
};

const getPodcast = async (user: string, podcast: string): Promise<Podcast> => {
  const response = await service.get(`/podcast/${user}/${podcast}`);
  return response.data as Podcast;
};

const resolveDomain = async (domain: string): Promise<Domain | null> => {
  const response = await service.get(`/domainresolver?domain=${domain}`);

  return response.data ? (response.data as Domain) : null;
};

export { getFeaturedEntry, getPodcast, resolveDomain };
