import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Podcast } from 'src/app/models/podcast.model';
import { Observable } from 'rxjs';
import { PodcastDataService } from 'src/app/services/podcast-data.service';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
    podcast$: Observable<Podcast>;

    constructor(router: Router, podcastService: PodcastDataService) {
        router.events
            .pipe(filter((e) => e instanceof NavigationEnd))
            .subscribe((p: NavigationEnd) => {
                console.log('top-menu.component', 'route-changed', p);
                const params = p.url.replace(/^\/+|\/+$/g, '').split('/');
                if (params.length === 2) {
                    this.podcast$ = podcastService.getByKey({
                        user: params[0],
                        podcast: params[1]
                    });
                }
            });
    }
    ngOnInit() {}
}
