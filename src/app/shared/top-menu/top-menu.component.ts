import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Podcast } from 'src/app/models/podcast.model';
import { Observable } from 'rxjs';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { DomainResolverService } from 'src/app/services/domain-resolver.service';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent {
    podcast$: Observable<Podcast>;

    constructor(
        router: Router,
        domainResolverService: DomainResolverService,
        private podcastService: PodcastDataService,
    ) {
        domainResolverService.resolveBaseUrl(window.location.host).subscribe(r => {
            if (r) {
                this._loadDetails(domainResolverService.user, domainResolverService.slug);
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
}
