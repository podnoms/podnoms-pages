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
    ngOnInit() {}
}
