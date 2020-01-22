import { Injectable, Inject } from '@angular/core';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    constructor(@Inject(REQUEST) private request: Request) {
        console.log('request.service', 'ctor', request);
    }
    getHost(): string {
        return this.request.hostname;
    }
}
