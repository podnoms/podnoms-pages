import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { DomainResolverService } from './domain-resolver.service';
import { RequestService } from './request.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class DomainResolver implements Resolve<any> {
    constructor(
        private domainResolverService: DomainResolverService,
        private requestService: RequestService,
        private logger: NGXLogger,
    ) {}

    async resolve() {
        const host = this.requestService.getHost();
        this.logger.debug('domain-resolver', 'resolve', host);
        const result = await this.domainResolverService.resolveBaseUrl(host).toPromise();
        return result;
    }
}
