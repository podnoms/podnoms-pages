import { Injectable, Inject, Injector, Optional } from '@angular/core';
import { DOCUMENT, APP_BASE_HREF } from '@angular/common';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    serverUrl: string = '';
    baseHref: string = '';
    constructor(@Inject(DOCUMENT) private document: Document, private logger: NGXLogger) {
        logger.debug('request.service', 'ctor', document);
        logger.debug('request.service', 'ctor', `documentUrl: ${this.document.location.href}`);
    }
    getHost(): string {
        return this.document.location.hostname;
    }
    getUrl(): string {
        return this.document.location.href;
    }
}
