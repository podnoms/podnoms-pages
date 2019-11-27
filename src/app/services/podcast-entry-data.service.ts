import { Injectable } from '@angular/core';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class PodcastEntryDataService {
    constructor(private http: HttpClient) {}
    getByKey(key: any): Observable<PodcastEntry> {
        return this.http.get<PodcastEntry>(
            `${environment.apiHost}/entry/${key.user}/${key.podcast}/${key.episode}`,
        );
    }
    getTop100(): Observable<PodcastEntry[]> {
        return this.http.get<PodcastEntry[]>(`${environment.apiHost}/entry/top100`);
    }
}
