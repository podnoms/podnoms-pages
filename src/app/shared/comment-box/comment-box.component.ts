import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PodcastEntry } from 'src/app/models/podcast-entry.model';
import { CommentsService } from 'src/app/services/comments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { EpisodeComment } from '../../models/episode-comment-model';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-comment-box',
    templateUrl: './comment-box.component.html',
    styleUrls: ['./comment-box.component.scss'],
})
export class CommentBoxComponent implements OnInit, AfterViewInit {
    @Input()
    episode: PodcastEntry;
    commentForm: FormGroup;
    comments$: Observable<EpisodeComment[]>;

    constructor(
        private commentsService: CommentsService,
        private formBuilder: FormBuilder,
        private logger: NGXLogger,
    ) {}

    ngOnInit(): void {
        this.commentForm = this.formBuilder.group({
            comment: ['', [Validators.required, Validators.minLength(10)]],
            fromName: ['', [Validators.required, Validators.minLength(5)]],
            fromEmail: ['', [Validators.required, ValidationService.emailValidator]],
        });
    }
    ngAfterViewInit(): void {
        this._getComments();
    }
    private _getComments() {
        this.comments$ = this.commentsService.getComments(this.episode.userSlug, this.episode.slug);
    }
    postComment() {
        const comment = new EpisodeComment(
            this.commentForm.controls.fromName.value,
            this.commentForm.controls.fromEmail.value,
            this.commentForm.controls.fromName.value,
        );
        if (this.commentForm.valid) {
            this.commentsService
                .postComment(this.episode.userSlug, this.episode.slug, comment)
                .subscribe(
                    (r) => {
                        this.logger.debug('comment-box.component', 'comment-added', r);
                        this.commentForm.reset();
                        this._getComments();
                    },
                    (err) => {
                        this.logger.error('comment-box.component', 'postComment', err);
                    },
                );
        }
    }
}
