import { Component, OnInit } from '@angular/core';
import { Podcast } from 'src/app/models/podcast.model';
import { Observable } from 'rxjs';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { DomainResolverService } from 'src/app/services/domain-resolver.service';
import { PodcastAggregator } from 'src/app/models/podcast-aggregator.model';

@Component({
    selector: 'app-subscribe',
    templateUrl: './subscribe.component.html',
    styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {
    podcast$: Observable<Podcast>;
    aggregators$: Observable<PodcastAggregator[]>;

    constructor(
        private service: PodcastDataService,
        private domainResolver: DomainResolverService,
    ) {}
    ngOnInit() {
        this.aggregators$ = this.service.getAggregators(this.domainResolver.domain.podcastId);
        this.podcast$ = this.service.getByKey({
            user: this.domainResolver.domain.userSlug,
            podcast: this.domainResolver.domain.podcastSlug,
        });
    }
}
