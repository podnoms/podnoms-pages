import { Component, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Podcast } from 'src/app/models/podcast.model';
import { Observable } from 'rxjs';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { DomainResolverService } from 'src/app/services/domain-resolver.service';
import { DOCUMENT } from '@angular/common';
import { RequestService } from 'src/app/services/request.service';
import { NGXLogger } from 'ngx-logger';
import { FeaturedPodcastService } from 'src/app/services/featured-episode.service';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent {
    podcast$: Observable<Podcast>;
    menuOpen: boolean = false;
    siteUrl: string = '/';
    subscribeUrl: string = 'subscribe';
    aboutUrl: string = 'about';
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private router: Router,
        private route: ActivatedRoute,
        private featuredPodcastService: FeaturedPodcastService,
        requestService: RequestService,
        domainResolverService: DomainResolverService,
        private podcastService: PodcastDataService,
        private logger: NGXLogger,
    ) {
        domainResolverService.resolveBaseUrl(requestService.getHost()).subscribe((r) => {
            if (r) {
                this._loadDetails(
                    domainResolverService.domain.userSlug,
                    domainResolverService.domain.podcastSlug,
                );
                this.featuredPodcastService.updateUserSlugDetails(
                    domainResolverService.domain.userSlug,
                    domainResolverService.domain.podcastSlug,
                );
                // close nav menu on navigation
                router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
                    this.menuOpen = false;
                    this.document.body.classList.remove('mobile-menu-opened');
                });
            } else {
                router.events
                    .pipe(filter((e) => e instanceof NavigationEnd))
                    .subscribe((p: NavigationEnd) => {
                        const params = p.url.replace(/^\/+|\/+$/g, '').split('/');
                        if (params.length >= 2) {
                            this.siteUrl = `${params[0]}/${params[1]}`;
                            this.subscribeUrl = `${params[0]}/${params[1]}/subscribe`;
                            this.aboutUrl = `${params[0]}/${params[1]}/about`;
                            this._loadDetails(params[0], params[1]);
                            this.featuredPodcastService.updateUserSlugDetails(params[0], params[1]);
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
