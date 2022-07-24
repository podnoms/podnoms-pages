import {resolveUserPodcastProps} from "./user-podcast-props-resolver";
import resolveDomainProps from "./domain-props-resolver";
import {GetServerSidePropsContext} from "next";
import {setDomain} from "services/store/domain.store";

export const resolveEpisodeProps = async (
  context: GetServerSidePropsContext
) => {

  const episode = Array.isArray(context?.params?.episode)
    ? context?.params?.episode[0]
    : context?.params?.episode;
  const {featured, podcast} = await resolveUserPodcastProps(context);
  if (featured?.userSlug && featured?.podcastSlug) {
    const {domain, podcast} = await resolveDomainProps(
      context.req,
      featured?.userSlug as string,
      featured?.podcastSlug as string
    );

    const e = podcast?.podcastEntries?.filter((e) => {
      return e.slug === episode;
    })[0];

    return {
      props: {
        featured,
        podcast,
        episode: e,
        domain,
      },
    };
  }
  return {props: {}};
};
