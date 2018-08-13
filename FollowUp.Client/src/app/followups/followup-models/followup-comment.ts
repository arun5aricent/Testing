export class FollowUpComment{
    CommentDesc: string;
    CommentDate: string;
    CommentUser: string;

    constructor(commentDesc: string, commentDate: string, commentUser: string){
        this.CommentDesc = commentDesc;
        this.CommentDate = commentDate;
        this.CommentUser = commentUser;
    }
}