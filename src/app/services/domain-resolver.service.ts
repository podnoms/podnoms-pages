import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DomainResolverService {
    private baseUrl: string = '';
    public user: string = '';
    public slug: string = '';
    constructor(private http: HttpClient) {}

    resolveBaseUrl(url: string): Observable<string> {
        return this.http
            .get(`${environment.apiHost}/podcast/domainresolver?domain=${url}`, {
                responseType: 'text',
            })
            .pipe(
                tap(p => {
                    const parts = p.split('/');
                    this.user = parts[0];
                    this.slug = parts[1];
                }),
            );
    }
}
