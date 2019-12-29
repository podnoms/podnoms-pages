import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainResolverService } from 'src/app/services/domain-resolver.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    loaded: boolean = false;
    constructor(
        private router: Router,
        private currentUrl: ActivatedRoute,
        private domainResolver: DomainResolverService,
    ) {
        currentUrl.data.subscribe(r => {
            console.log('home.component', 'currentUrl', r);
            if (r.domain) {
                const parts = r.domain.split('/');
                const path = `${parts[0]}/${parts[1]}`;
                console.log('home.component', 'customDomain', path);
                if (parts.length === 2) {
                    router.navigateByUrl(path, { skipLocationChange: true });
                }
            } else {
                this.loaded = true;
            }
        });
    }
    ngOnInit() {}
}
