import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';
import { tap } from 'rxjs/operators';
import { PodcastEntryDataService } from 'src/app/services/podcast-entry-data.service';

@Component({
    selector: 'app-episode',
    templateUrl: './episode.component.html',
    styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit, AfterViewInit {
    episode$: Observable<PodcastEntry>;

    facebookRef: string = `https://www.facebook.com/sharer/sharer.php?u=${window.location}`;
    twitterRef: string = `https://twitter.com/intent/tweet?url=${window.location}`;
    constructor(private route: ActivatedRoute, private service: PodcastEntryDataService) {}

    ngOnInit() {
        const user = this.route.snapshot.params.user;
        const podcast = this.route.snapshot.params.podcast;
        const episode = this.route.snapshot.params.episode;

        this.episode$ = this.service
            .getByKey({
                user: user,
                podcast: podcast,
                episode: episode,
            })
            .pipe(tap(e => console.log('episode.component', 'tap', e)));
    }
    ngAfterViewInit() {}
}
