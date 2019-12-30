import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { DomainResolverService } from './domain-resolver.service';

@Injectable()
export class DomainResolver implements Resolve<any> {
    constructor(private domainResolverService: DomainResolverService) {}

    async resolve() {
        const result = await this.domainResolverService
            .resolveBaseUrl(window.location.host)
            .toPromise();
        return result;
    }
}
