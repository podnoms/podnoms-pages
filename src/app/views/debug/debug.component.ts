import { Component, OnInit } from '@angular/core';
import { PodcastEntryDataService } from 'src/app/services/podcast-entry-data.service';
import { Observable } from 'rxjs';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss'],
})
export class DebugComponent implements OnInit {
    episodes$: Observable<PodcastEntry[]>;
    constructor(private service: PodcastEntryDataService) {}

    ngOnInit() {
        this.episodes$ = this.service.getTop100();
    }
}
