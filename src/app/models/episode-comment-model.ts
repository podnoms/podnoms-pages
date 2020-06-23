export class EpisodeComment {
    constructor(fromName: string, fromEmail: string, comment: string) {
        this.fromName = fromName;
        this.fromEmail = fromEmail;
        this.comment = comment;
    }
    fromName: string;
    fromEmail: string;
    comment: string;
    // avatarImage?: string;
    // commentDate?: Date;
    timestamp?: number;
}
