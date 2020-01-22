import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { CustomDomain } from '../models/custom-domain.model';

@Injectable({
    providedIn: 'root',
})
export class DomainResolverService {
    private baseUrl: string = '';
    public domain: CustomDomain;
    constructor(private http: HttpClient) {}

    resolveBaseUrl(): Observable<CustomDomain> {
        return this.http.get<CustomDomain>(`${environment.apiHost}/podcast/domainresolver`).pipe(
            tap(p => {
                this.domain = p;
            }),
        );
    }
}
