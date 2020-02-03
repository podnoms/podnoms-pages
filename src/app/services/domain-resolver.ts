import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { DomainResolverService } from './domain-resolver.service';
import { RequestService } from './request.service';

@Injectable()
export class DomainResolver implements Resolve<any> {
    constructor(
        private domainResolverService: DomainResolverService,
        private requestService: RequestService,
    ) {}

    async resolve() {
        console.log('domain-resolver', 'resolve');
        const result = await this.domainResolverService
            .resolveBaseUrl(this.requestService.getHost())
            .toPromise();
        return result;
    }
}
