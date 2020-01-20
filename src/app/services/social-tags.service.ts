import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class SocialTagsService {
    constructor(private meta: Meta) {}

    public setTags(title: string, description: string, imageUrl: string, url: string) {
        this.meta.addTag({
            property: 'title',
            content: title,
        });
        this.meta.addTag({
            property: 'description',
            content: description || document.title,
        });

        this.meta.addTag({
            property: 'og:type',
            content: 'website',
        });
        this.meta.addTag({
            property: 'og:url',
            content: url,
        });
        this.meta.addTag({
            property: 'og:title',
            content: title,
        });
        this.meta.addTag({
            property: 'og:description',
            content: description || document.title,
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
            content: url,
        });
        this.meta.addTag({
            property: 'twitter:title',
            content: title,
        });
        this.meta.addTag({
            property: 'twitter:description',
            content: description || document.title,
        });
        this.meta.addTag({
            property: 'twitter:image',
            content: imageUrl,
        });
    }
}
