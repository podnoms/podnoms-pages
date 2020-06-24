import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PodcastDataService } from 'src/app/services/podcast-data.service';
import { tap } from 'rxjs/operators';
import { DomainResolverService } from 'src/app/services/domain-resolver.service';
import { NGXLogger } from 'ngx-logger';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';

@Component({
    selector: 'app-header-entry',
    templateUrl: './header-entry.component.html',
    styleUrls: ['./header-entry.component.scss'],
})
export class HeaderEntryComponent implements AfterViewInit {
    @Input()
    episode: PodcastEntry;
    @Input()
    headerTitle: string = '';

    constructor(private logger: NGXLogger) {}
    ngAfterViewInit(): void {
        this.logger.debug('header-entry.component', 'ngOnInit', this.episode);
    }
}
