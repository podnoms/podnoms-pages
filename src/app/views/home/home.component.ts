import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainResolverService } from 'src/app/services/domain-resolver.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private router: Router,
        private currentUrl: ActivatedRoute,
        private domainResolver: DomainResolverService,
    ) {}
    ngOnInit() {
        // need to do some stuff here
        // first off, hook into the domain resolver service
        this.domainResolver.resolveBaseUrl(window.location.hostname).subscribe(r => {
            this.domainResolver.setBaseUrl(r);
            if (r) {
                this.router.navigateByUrl(r, { skipLocationChange: true });
            }
        });
    }
}
