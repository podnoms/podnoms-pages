import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';
import { tap } from 'rxjs/operators';
import { PodcastEntryDataService } from 'src/app/services/podcast-entry-data.service';
import { Title } from '@angular/platform-browser';
import { SocialTagsService } from 'src/app/services/social-tags.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
    selector: 'app-episode',
    templateUrl: './episode.component.html',
    styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit, AfterViewInit {
    episode$: Observable<PodcastEntry>;
    facebookRef: string = '';
    twitterRef: string = '';
    constructor(
        private route: ActivatedRoute,
        private service: PodcastEntryDataService,
        private requestService: RequestService,
        private titleService: Title,
        private socialTagService: SocialTagsService,
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
                        const shareUrl = this.requestService.getUrl();
                        this.socialTagService.setTags(e.title, e.description, e.imageUrl);
                        this.titleService.setTitle(e.title);

                        this.facebookRef = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
                        this.twitterRef = `https://twitter.com/intent/tweet?url=${shareUrl}`;
                        //set share URLs
                    }),
                );
        } else {
            this.route.data.subscribe(r => {
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
                                this.socialTagService.setTags(e.title, e.description, e.imageUrl);
                                this.titleService.setTitle(e.title);
                                const shareUrl = this.requestService.getUrl();

                                this.facebookRef = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
                                this.twitterRef = `https://twitter.com/intent/tweet?url=${shareUrl}`;
                            }),
                        );
                }
            });
        }
    }
    ngAfterViewInit() {}
}
