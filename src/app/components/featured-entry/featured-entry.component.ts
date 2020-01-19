import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-featured-entry',
    templateUrl: './featured-entry.component.html',
    styleUrls: ['./featured-entry.component.scss'],
})
export class FeaturedEntryComponent implements OnInit {
    episode$: Observable<any>;
    @Input()
    user: string;
    @Input()
    podcast: string;

    constructor(private podcastService: PodcastDataService, private logger: NGXLogger) {
        logger.debug('featured-entry.component', 'ctor');
    }

    ngOnInit() {
        this.episode$ = this.podcastService.getFeaturedEpisode(this.user, this.podcast);
        this.episode$.subscribe(
            data => this.logger.debug('featured-entry.component', 'episode', data),
            err => this.logger.debug('No featured entry'),
        );
    }
}
