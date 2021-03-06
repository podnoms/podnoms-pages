import { Component, OnInit } from '@angular/core';
import { Podcast } from 'src/app/models/podcast.model';
import { Observable } from 'rxjs';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { DomainResolverService } from 'src/app/services/domain-resolver.service';
import { PodcastAggregator } from 'src/app/models/podcast-aggregator.model';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-subscribe',
    templateUrl: './subscribe.component.html',
    styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {
    podcast$: Observable<Podcast>;
    aggregators$: Observable<PodcastAggregator[]>;

    constructor(
        private route: ActivatedRoute,
        private service: PodcastDataService,
        private domainResolver: DomainResolverService,
        private logger: NGXLogger,
    ) {}
    ngOnInit() {
        if (this.domainResolver.domain) {
            this.aggregators$ = this.service.getAggregators(this.domainResolver.domain.podcastId);
            this.podcast$ = this.service.getByKey({
                user: this.domainResolver.domain.userSlug,
                podcast: this.domainResolver.domain.podcastSlug,
            });
        } else {
            const user = this.route.snapshot.params.user;
            const podcast = this.route.snapshot.params.podcast;
            this.podcast$ = this.service
                .getByKey({
                    user: user,
                    podcast: podcast,
                })
                .pipe(
                    tap((r) => {
                        this.logger.debug('subscribe.component', 'tap-podcast', r);
                        this.aggregators$ = this.service.getAggregators(r.id);
                    }),
                );
        }
    }
}
