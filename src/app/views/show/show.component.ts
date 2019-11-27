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

    constructor(private route: ActivatedRoute, private service: PodcastDataService) {}

    ngOnInit() {
        this.podcast$ = this.service.getByKey({
            user: this.route.snapshot.params.user,
            podcast: this.route.snapshot.params.podcast,
        });
    }
}
