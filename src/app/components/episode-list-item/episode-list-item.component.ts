import { Component, Input, AfterViewInit, AfterViewChecked } from '@angular/core';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';
import { Podcast } from 'src/app/models/podcast.model';

@Component({
    selector: 'app-episode-list-item',
    templateUrl: './episode-list-item.component.html',
    styleUrls: ['./episode-list-item.component.scss'],
})
export class EpisodeListItemComponent implements AfterViewChecked {
    strippedDescription: string = '';
    expanded: boolean = false;
    @Input() podcast: Podcast;
    @Input() episode: PodcastEntry;

    constructor() {}

    ngAfterViewChecked(): void {
        setTimeout(() => {
            this.strippedDescription =
                this.episode.description && this._stripTag(this.episode.description, 'img');
        });
    }
    private _stripTag(html: string, tag: string): string {
        const div = document.createElement('div');
        div.innerHTML = html;

        const elements = div.getElementsByTagName(tag);
        while (elements[0]) {
            elements[0].parentNode.removeChild(elements[0]);
        }

        const repl = div.innerHTML;
        return repl;
    }
}
