import { PodcastEntry } from './podcast-entry.model';

export interface Podcast {
    id?: string;
    title: string;
    description?: string;
    slug?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    customDomain?: string;
    rssUrl?: string;
    createDate?: Date;
    podcastEntries?: PodcastEntry[];

    private?: boolean;
    authUserName?: string;
    authPassword?: string;

    dateLoaded: Date;
}