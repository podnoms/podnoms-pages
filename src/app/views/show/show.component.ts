import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Podcast } from 'src/app/models/podcast.model';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-episode',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
    podcast$: Observable<Podcast>;
    loading$: Observable<boolean>;
    expanded: boolean = false;

    user: string = '';
    slug: string = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private service: PodcastDataService,
        private titleService: Title,
    ) {
        activatedRoute.data.subscribe(r => {
            console.log('home.component', 'currentUrl', r);
            if (r.domain) {
                this.user = r.domain.userSlug;
                this.slug = r.domain.podcastSlug;
            }
        });
    }

    ngOnInit() {
        this.podcast$ = this.service
            .getByKey({
                user: this.activatedRoute.snapshot.params.user,
                podcast: this.activatedRoute.snapshot.params.podcast,
            })
            .pipe(tap(p => this.titleService.setTitle(p.publicTitle)));
    }
}
