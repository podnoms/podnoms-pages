import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';
import { tap } from 'rxjs/operators';
import { PodcastEntryDataService } from 'src/app/services/podcast-entry-data.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-episode',
    templateUrl: './episode.component.html',
    styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit, AfterViewInit {
    episode$: Observable<PodcastEntry>;

    facebookRef: string = `https://www.facebook.com/sharer/sharer.php?u=${window.location}`;
    twitterRef: string = `https://twitter.com/intent/tweet?url=${window.location}`;
    constructor(
        private route: ActivatedRoute,
        private service: PodcastEntryDataService,
        private titleService: Title,
    ) {}

    ngOnInit() {
        let user = this.route.snapshot.params.user;
        let podcast = this.route.snapshot.params.podcast;
        const episode = this.route.snapshot.params.episode;
        if (user && podcast) {
            this.episode$ = this.service
                .getByKey({
                    user: user,
                    podcast: podcast,
                    episode: episode,
                })
                .pipe(
                    tap(e => {
                        this.titleService.setTitle(e.title);
                    }),
                );
        } else {
            this.route.data.subscribe(r => {
                console.log('home.component', 'currentUrl', r);
                if (r.domain) {
                    user = r.domain.userSlug;
                    podcast = r.domain.podcastSlug;
                    this.episode$ = this.service
                        .getByKey({
                            user: user,
                            podcast: podcast,
                            episode: episode,
                        })
                        .pipe(
                            tap(e => {
                                this.titleService.setTitle(e.title);
                            }),
                        );
                }
            });
        }
    }
    ngAfterViewInit() {}
}
