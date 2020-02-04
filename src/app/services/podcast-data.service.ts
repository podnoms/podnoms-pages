import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Podcast } from 'src/app/models/podcast.model';
import { PodcastEntry } from '../models/podcast-entry.model';
import { environment } from 'src/environments/environment';
import { PodcastAggregator } from '../models/podcast-aggregator.model';

@Injectable()
export class PodcastDataService {
    constructor(private http: HttpClient) {}

    getFeaturedEpisode(user: string, podcast: string): Observable<PodcastEntry> {
        return this.http.get<PodcastEntry>(
            `${environment.apiHost}/podcast/${user}/${podcast}/featured`,
        );
    }
    getByKey(key: any): Observable<Podcast> {
        return this.http.get<Podcast>(`${environment.apiHost}/podcast/${key.user}/${key.podcast}`);
    }
    getAll(): Observable<Podcast[]> {
        return this.http.get<Podcast[]>(`${environment.apiHost}/podcast/`);
    }
    getAggregators(podcastId: string): Observable<PodcastAggregator[]> {
        return this.http.get<PodcastAggregator[]>(
            `${environment.apiHost}/podcast/${podcastId}/aggregators`,
        );
    }
    getAllButFeatured(podcastId: string): Observable<PodcastEntry[]> {
        return this.http.get<PodcastEntry[]>(
            `${environment.apiHost}/podcast/${podcastId}/allbutfeatured`,
        );
    }
}
