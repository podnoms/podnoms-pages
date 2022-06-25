export default interface Domain {
  domain: string;
  canonicalUrl: string | undefined;
  podcastId: string;
  userSlug: string;
  podcastSlug: string;
  url: string;
}
