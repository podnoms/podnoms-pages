import { Component, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Podcast } from 'src/app/models/podcast.model';
import { Observable } from 'rxjs';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { DomainResolverService } from 'src/app/services/domain-resolver.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent {
    podcast$: Observable<Podcast>;
    menuOpen: boolean = false;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        router: Router,
        domainResolverService: DomainResolverService,
        private podcastService: PodcastDataService,
    ) {
        domainResolverService.resolveBaseUrl().subscribe(r => {
            if (r) {
                this._loadDetails(
                    domainResolverService.domain.userSlug,
                    domainResolverService.domain.podcastSlug,
                );
                // close nav menu on navigation
                router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
                    this.menuOpen = false;
                    this.document.body.classList.remove('mobile-menu-opened');
                });
            } else {
                router.events
                    .pipe(filter(e => e instanceof NavigationEnd))
                    .subscribe((p: NavigationEnd) => {
                        const params = p.url.replace(/^\/+|\/+$/g, '').split('/');
                        if (params.length === 2) {
                            this._loadDetails(params[0], params[1]);
                        }
                    });
            }
        });
    }
    private _loadDetails(user: string, slug: string) {
        this.podcast$ = this.podcastService.getByKey({
            user: user,
            podcast: slug,
        });
    }
    toggleNav() {
        this.menuOpen = !this.menuOpen;
        if (this.menuOpen) {
            this.document.body.classList.add('mobile-menu-opened');
        } else {
            this.document.body.classList.remove('mobile-menu-opened');
        }
    }
}
