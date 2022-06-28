import resolveDomainProps from "./domain-props-resolver";
import {Podcast, PodcastEntry} from "../../models";
import {getFeaturedEntry, getPodcast} from "../api/podnoms";
import {GetServerSidePropsContext, NextApiRequest} from "next";

export const resolveUserPodcastProps = async (
  {
    params,
    req
  }: GetServerSidePropsContext): Promise<{ podcast: Podcast, featured: PodcastEntry }> => {
  let userSlug = params?.user;
  let podcastSlug = params?.podcast;

  const {domain} = await resolveDomainProps(req, userSlug as string, podcastSlug as string);

  const podcast: Podcast = await getPodcast(
    params?.user as string,
    params?.podcast as string
  );
  const featured: PodcastEntry = await getFeaturedEntry(
    params?.user as string,
    params?.podcast as string
  );

  return {
    podcast,
    featured
  }
}
