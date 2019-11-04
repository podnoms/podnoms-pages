import { Component, OnInit, Input } from '@angular/core';
import { Observable, noop } from 'rxjs';
import { PodcastDataService } from 'src/app/services/podcast-data.service';

@Component({
    selector: 'app-featured-entry',
    templateUrl: './featured-entry.component.html',
    styleUrls: ['./featured-entry.component.scss']
})
export class FeaturedEntryComponent implements OnInit {
    episode$: Observable<any>;
    @Input()
    user: string;
    @Input()
    podcast: string;

    constructor(private podcastService: PodcastDataService) {}

    ngOnInit() {
        this.episode$ = this.podcastService.getFeaturedEpisode(
            this.user,
            this.podcast
        );
        this.episode$.subscribe(
            (data) => console.log('featured-entry.component', 'episode', data),
            (err) => console.log('No featured entry')
        );
    }
}
