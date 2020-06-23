import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Podcast } from 'src/app/models/podcast.model';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { SocialTagsService } from 'src/app/services/social-tags.service';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';

@Component({
    selector: 'app-episode',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
    podcast$: Observable<Podcast>;
    entries$: Observable<PodcastEntry[]>;
    featuredEpisode$: Observable<PodcastEntry>;
    loading$: Observable<boolean>;
    expanded: boolean = false;

    user: string = '';
    podcast: string = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private podcastService: PodcastDataService,
        private titleService: Title,
        private socialTagService: SocialTagsService,
    ) {
        activatedRoute.data.subscribe((r) => {
            if (r.domain) {
                this.user = r.domain.userSlug;
                this.podcast = r.domain.podcastSlug;
            }
        });
    }

    ngOnInit() {
        this.user = this.activatedRoute.snapshot.params.user;
        this.podcast = this.activatedRoute.snapshot.params.podcast;
        this.podcast$ = this.podcastService
            .getByKey({ user: this.user, podcast: this.podcast })
            .pipe(
                tap((p) => {
                    this.socialTagService.setTags(p.publicTitle, p.description, p.imageUrl);
                    this.titleService.setTitle(p.publicTitle);
                    this.entries$ = this.podcastService.getAllButFeatured(p.id);
                    this.featuredEpisode$ = this.podcastService.getFeaturedEpisode(
                        this.user,
                        this.podcast,
                    );
                }),
            );
    }
}
