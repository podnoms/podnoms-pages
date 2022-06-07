import { PodcastEntry } from "models";
import service from "./server";
const getFeaturedEntry = async (
  user: string,
  podcast: string
): Promise<PodcastEntry> => {
  const response = await service.get(`/podcast/${user}/${podcast}/featured`);
  return response.data;
};

export { getFeaturedEntry };
