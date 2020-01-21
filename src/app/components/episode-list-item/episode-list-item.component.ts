import { Component, OnInit, Input, AfterViewChecked, AfterViewInit } from '@angular/core';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';
import { Podcast } from 'src/app/models/podcast.model';

@Component({
    selector: 'app-episode-list-item',
    templateUrl: './episode-list-item.component.html',
    styleUrls: ['./episode-list-item.component.scss'],
})
export class EpisodeListItemComponent implements AfterViewInit {
    strippedDescription: string = '';
    expanded: boolean = false;
    episodeUrl: string = '';
    @Input() podcast: Podcast;
    @Input() episode: PodcastEntry;
    @Input() user: string;
    @Input() slug: string;

    constructor() {}
    ngAfterViewInit() {
        setTimeout(() => {
            if (this.user && this.slug) {
                this.episodeUrl = `/${this.episode.slug}`;
            } else {
                this.episodeUrl = this.episode.slug;
            }
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
