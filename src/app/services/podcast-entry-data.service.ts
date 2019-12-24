import { Injectable } from '@angular/core';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomainResolverService } from './domain-resolver.service';

@Injectable()
export class PodcastEntryDataService {
    constructor(private http: HttpClient, private resolver: DomainResolverService) {}
    getByKey(key: any): Observable<PodcastEntry> {
        const path = `entry/${key.user}/${key.podcast}/${key.episode}`;
        const resolved = this.resolver.getResolvedUrl(path);
        return this.http.get<PodcastEntry>(resolved);
    }
    getTop100(): Observable<PodcastEntry[]> {
        const path = this.resolver.getResolvedUrl('/entry/top100');
        return this.http.get<PodcastEntry[]>(path);
    }
}
