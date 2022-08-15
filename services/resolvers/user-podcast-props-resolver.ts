import resolveDomainProps from "./domain-props-resolver";
import {Podcast, PodcastEntry} from "../../models";
import {getFeaturedEntry, getPodcast} from "../api/podnoms";
import {GetServerSidePropsContext} from "next";

export const resolveUserPodcastProps = async (
  {
    params,
    req,
  }: GetServerSidePropsContext): Promise<{
  podcast: Podcast; featured: PodcastEntry;
}> => {
  const {domain} = await resolveDomainProps(
    req,
    params?.user as string,
    params?.podcast as string
  );

  if (domain?.userSlug && domain?.podcastSlug) {
    const podcast: Podcast = await getPodcast(
      domain?.userSlug,
      domain?.podcastSlug
    );
    const featured: PodcastEntry = await getFeaturedEntry(
      domain?.userSlug,
      domain?.podcastSlug
    );
    return {
      podcast,
      featured,
    };
  }
  throw new Error("Unable to resolve user podcast props");
};
