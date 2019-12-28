import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Podcast } from 'src/app/models/podcast.model';
import { PodcastEntry } from '../models/podcast-entry.model';
import { environment } from 'src/environments/environment';

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
    // getById(data: any): Observable<Podcast> {
    //     return this.getByKey(data);
    // }
    // getWithQuery(params: string | QueryParams): Observable<Podcast[]> {
    //     return super
    //         .getWithQuery(params)
    //         .pipe(map(podcasts => podcasts.map(podcast => this.mapPodcast(podcast))));
    // }
    // private mapPodcast(podcast: Podcast): Podcast {
    //     return { ...podcast, dateLoaded: new Date() };
    // }
}
