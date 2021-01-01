import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Podcast } from 'src/app/models/podcast.model';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { SocialTagsService } from 'src/app/services/social-tags.service';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';
import { FeaturedPodcastService as FeaturedEpisodeService } from 'src/app/services/featured-episode.service';
import { PodcastAggregator } from 'src/app/models/podcast-aggregator.model';
import { NgxAudioplayerComponent } from '@podnoms/ngx-audioplayer';

@Component({
    selector: 'app-episode',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements AfterViewInit {
    podcast$: Observable<Podcast>;
    entries$: Observable<PodcastEntry[]>;
    loading$: Observable<boolean>;
    expanded: boolean = false;

    itunesAggregator: PodcastAggregator;

    isPlaying: boolean = false;

    user: string = '';
    podcast: string = '';
    @ViewChild('player')
    player: NgxAudioplayerComponent;

    constructor(
        private activatedRoute: ActivatedRoute,
        private podcastService: PodcastDataService,
        private titleService: Title,
        private socialTagService: SocialTagsService,
        public featuredEpisodeService: FeaturedEpisodeService,
    ) {
        activatedRoute.data.subscribe((r) => {
            if (r.domain) {
                this.user = r.domain.userSlug;
                this.podcast = r.domain.podcastSlug;
            }
        });
        this.user = this.activatedRoute.snapshot.params.user;
        this.podcast = this.activatedRoute.snapshot.params.podcast;
        this.podcast$ = this.podcastService
            .getByKey({ user: this.user, podcast: this.podcast })
            .pipe(
                tap((p) => {
                    this.socialTagService.setTags(p.publicTitle, p.description, p.imageUrl);
                    this.titleService.setTitle(p.publicTitle);
                    this.entries$ = this.podcastService.getAllButFeatured(p.id);

                    setTimeout(() => {
                        this._setupPlayerHooks();
                    }, 100);

                    this.podcastService
                        .getAggregatorByType(p.id, 'iTunes')
                        .subscribe((r) => (this.itunesAggregator = r));
                }),
            );
    }
    ngAfterViewInit(): void {}
    _setupPlayerHooks() {
        this.player.audioplay.subscribe((r) => {
            this.isPlaying = true;
        });
        this.player.audiopause.subscribe((r) => {
            this.isPlaying = false;
        });
        this.player.audioend.subscribe((r) => {
            this.isPlaying = false;
        });
    }
    playAudio() {
        this.player.play();
    }
}
