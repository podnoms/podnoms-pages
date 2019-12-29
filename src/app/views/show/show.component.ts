import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Podcast } from 'src/app/models/podcast.model';
import { PodcastDataService } from 'src/app/services/podcast-data.service';

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

    constructor(private activatedRoute: ActivatedRoute, private service: PodcastDataService) {
        activatedRoute.data.subscribe(r => {
            console.log('home.component', 'currentUrl', r);
            if (r.domain) {
                const parts = r.domain.split('/');
                const path = `${parts[0]}/${parts[1]}`;
                console.log('show.component', 'customDomain', path);
                if (parts.length === 2) {
                    this.user = parts[0];
                    this.slug = parts[1];
                }
            }
        });
    }

    ngOnInit() {
        this.podcast$ = this.service.getByKey({
            user: this.activatedRoute.snapshot.params.user,
            podcast: this.activatedRoute.snapshot.params.podcast,
        });
    }
}
