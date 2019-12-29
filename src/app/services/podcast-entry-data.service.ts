import { Injectable } from '@angular/core';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomainResolverService } from './domain-resolver.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class PodcastEntryDataService {
    constructor(private http: HttpClient, private resolver: DomainResolverService) {}
    getByKey(key: any): Observable<PodcastEntry> {
        const path = `${environment.apiHost}/entry/${key.user}/${key.podcast}/${key.episode}`;
        return this.http.get<PodcastEntry>(path);
    }
    getTop100(): Observable<PodcastEntry[]> {
        return this.http.get<PodcastEntry[]>(`${environment.apiHost}/entry/top100`);
    }
}
