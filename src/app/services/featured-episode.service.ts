import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PodcastEntry } from '../models/podcast-entry.model';
import { PodcastDataService } from './podcast-data.service';

@Injectable({
    providedIn: 'root',
})
export class FeaturedPodcastService {
    episode$ = new BehaviorSubject<PodcastEntry>(null);
    constructor(private podcastService: PodcastDataService) {}

    public updateUserSlugDetails(userSlug: string, podcastSlug: string) {
        this.podcastService
            .getFeaturedEpisode(userSlug, podcastSlug)
            .subscribe((p) => this.episode$.next(p));
    }
}
