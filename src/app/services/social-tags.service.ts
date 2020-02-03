import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RequestService } from './request.service';

@Injectable({
    providedIn: 'root',
})
export class SocialTagsService {
    constructor(private meta: Meta, private request: RequestService) {}

    public setTags(title: string, description: string, imageUrl: string) {
        this.meta.addTag({
            property: 'title',
            content: title,
        });
        this.meta.addTag({
            property: 'description',
            content: description,
        });

        this.meta.addTag({
            property: 'og:type',
            content: 'website',
        });
        this.meta.addTag({
            property: 'og:url',
            content: this.request.getUrl(),
        });
        this.meta.addTag({
            property: 'og:title',
            content: title,
        });
        this.meta.addTag({
            property: 'og:description',
            content: description,
        });
        this.meta.addTag({
            property: 'og:image',
            content: imageUrl,
        });

        this.meta.addTag({
            property: 'twitter:card',
            content: 'summary_large_image',
        });
        this.meta.addTag({
            property: 'twitter:url',
            content: this.request.getUrl(),
        });
        this.meta.addTag({
            property: 'twitter:title',
            content: title,
        });
        this.meta.addTag({
            property: 'twitter:description',
            content: description,
        });
        this.meta.addTag({
            property: 'twitter:image',
            content: imageUrl,
        });
    }
}
