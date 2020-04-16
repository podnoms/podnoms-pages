import { Injectable, Inject, Injector, Optional } from '@angular/core';
import { DOCUMENT, APP_BASE_HREF } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    serverUrl: string = '';
    baseHref: string = '';
    constructor(@Inject(DOCUMENT) private document: Document) {
        console.log('request.service', 'ctor', document);
        console.log('request.service', 'ctor', `documentUrl: ${this.document.location.href}`);
    }
    getHost(): string {
        return this.document.location.hostname;
    }
    getUrl(): string {
        return this.document.location.href;
    }
}
