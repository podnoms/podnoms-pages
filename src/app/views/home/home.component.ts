import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainResolverService } from 'src/app/services/domain-resolver.service';
import { CustomDomain } from 'src/app/models/custom-domain.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    loaded: boolean = false;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private domainResolver: DomainResolverService,
    ) {
        activatedRoute.data.subscribe(r => {
            if (r) {
                router.navigateByUrl(r.domain.url, { skipLocationChange: true });
            } else {
                this.loaded = true;
            }
        });
    }
    ngOnInit() {}
}
