import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EpisodeComment } from '../models/episode-comment-model';

@Injectable({
    providedIn: 'root',
})
export class CommentsService {
    constructor(private httpClient: HttpClient) {}

    public getComments(userSlug: string, episodeslug: string): Observable<EpisodeComment[]> {
        return this.httpClient.get<EpisodeComment[]>(
            `${environment.apiHost}/entry/comment/${userSlug}/${episodeslug}`,
        );
    }
    public postComment(
        userSlug: string,
        episodeslug: string,
        comment: EpisodeComment,
    ): Observable<EpisodeComment> {
        return this.httpClient.post<EpisodeComment>(
            `${environment.apiHost}/entry/postcomment/${userSlug}/${episodeslug}/`,
            comment,
        );
    }
}
