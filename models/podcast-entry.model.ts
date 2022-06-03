export default interface PodcastEntry {
  id: string;
  uid: string;
  author: string;
  slug: string;
  title: string;
  description: string;
  sourceUrl: string;
  audioUrl: string;
  audioLength: number;
  pcmUrl: string;
  imageUrl: string;
  processed: boolean;
  createDate: Date;
  processingStatus: string;
  processingPayload: string;
  podcastSlug: string;
  podcastTitle: string;
  podcastId: string;
  userSlug: string;
  userName: string;
}
