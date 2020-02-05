import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { tap } from 'rxjs/operators';
import { DomainResolverService } from 'src/app/services/domain-resolver.service';

@Component({
    selector: 'app-featured-entry',
    templateUrl: './featured-entry.component.html',
    styleUrls: ['./featured-entry.component.scss'],
})
export class FeaturedEntryComponent implements OnInit {
    episodeUrl: string = '';
    episode$: Observable<any>;
    @Input()
    user: string;
    @Input()
    podcast: string;

    constructor(
        private podcastService: PodcastDataService,
        private domainResolverService: DomainResolverService,
    ) {}

    ngOnInit() {
        this.episode$ = this.podcastService.getFeaturedEpisode(this.user, this.podcast).pipe(
            tap(e => {
                if (this.domainResolverService.domain) {
                    this.episodeUrl = `/${e.slug}`;
                } else {
                    this.episodeUrl = e.slug;
                }
            }),
        );
    }
}
