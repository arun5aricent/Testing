import { FollowUpComment } from './followup-comment';
import { FollowUpNotification } from './followup-notification';
/**
 * folloup interface
 */
export class Followup {
    FollowUpID: string;
    FollowUpStatus: number;
    FollowUpType: number;
    FollowUpSubject: string;
    FollowUpDueDate: string;
    CustomerName: string;
    FollowUpCreationDate: string;
    FollowUpLabel: number;
    FollowUpChannel: number;
    FollowUpLastModifiedDate: string;
    FollowUpCompleteDate: string;
    FollowUpLastModifyUser: string;
    FirstComment: string;
    LastComment: string;
    TotalComment: string;
    ContactID: string;
    IsPersonal: boolean;
    Owner: string;
    Comments: FollowUpComment[];
    SkillAddress: string;
    Notification: FollowUpNotification[];
    OwnerUserID: number;

    constructor(followUpID: string, followUpStatus: number, followUpType: number, followUpSubject: string,
        followUpDueDate: string, customerName: string, followUpCreationDate: string, followUpLabel: number,
        followUpChannel: number, followUpLastModifiedDate: string, followUpCompleteDate: string, followUpLastModifyUser: string,
        firstComment: string, lastComment: string, totalComment: string, contactID: string, isPersonal: boolean,
        owner: string, comments: FollowUpComment[], notification: FollowUpNotification[], owneruserid:number) {
        this.FollowUpID = followUpID;
        this.FollowUpStatus = followUpStatus;
        this.FollowUpType = followUpType;
        this.FollowUpSubject = followUpSubject;
        this.FollowUpDueDate = followUpDueDate;
        this.CustomerName = customerName;
        this.FollowUpCreationDate = followUpCreationDate;
        this.FollowUpLabel = followUpLabel;
        this.FollowUpChannel = followUpChannel;
        this.FollowUpLastModifiedDate = followUpLastModifiedDate;
        this.FollowUpCompleteDate = followUpCompleteDate;
        this.FollowUpLastModifyUser = followUpLastModifyUser;
        this.FirstComment = firstComment;
        this.LastComment = lastComment;
        this.TotalComment = totalComment;
        this.ContactID = contactID;
        this.IsPersonal = isPersonal;
        this.Owner = owner;
        this.Comments = comments;
        this.Notification = notification;
        this.OwnerUserID = owneruserid;
    }
}

