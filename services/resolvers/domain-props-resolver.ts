import {Podcast} from "../../models";
import absoluteUrl from "next-absolute-url";
import {getPodcast, resolveDomain} from "../api/podnoms";
import {PodcastEntry} from "models";
import {getFeaturedEntry} from "services/api";
import {IncomingMessage} from "http";
import {useSelector} from "react-redux";

const resolveDomainProps = async (req: IncomingMessage, user?: string, podcast?: string) => {

  const {protocol, host} = absoluteUrl(req);

  const domain = host === process.env.BASE_URL && user && podcast ? {
    canonicalUrl: `/${user}/${podcast}`,
    userSlug: user,
    podcastSlug: podcast,
  } : await resolveDomain(host);

  if (domain) {
    const podcast: Podcast = await getPodcast(
      domain.userSlug,
      domain.podcastSlug
    );
    const featured: PodcastEntry = await getFeaturedEntry(
      domain.userSlug,
      domain.podcastSlug
    );
    return {
      domain,
      podcast,
      featured,
    };
  }
  return {props: {}};
};
export default resolveDomainProps;
