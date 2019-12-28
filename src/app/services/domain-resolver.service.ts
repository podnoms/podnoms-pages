import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DomainResolverService {
    private baseUrl: string = '';
    constructor(private http: HttpClient) {}

    resolveBaseUrl(url: string): Observable<string> {
        return this.http.get(`${environment.apiHost}/podcast/domainresolver?domain=${url}`, {
            responseType: 'text',
        });
    }
    setBaseUrl(r: string) {
        this.baseUrl = r;
    }
    getResolvedUrl(path: string): string {
        if (this.baseUrl) {
            return `${this.baseUrl}/${path}`;
        }
        return `${environment.apiHost}/${path}`;
    }
}
