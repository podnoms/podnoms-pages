import { Component } from '@angular/core';
import { DomainResolverService } from './services/domain-resolver.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'podnoms-pages';
    constructor(domainResolver: DomainResolverService) {}
}
