import { Customer } from './customer';
import { FollowUpComment } from './followup-comment';
import { FollowUpNotification } from './followup-notification';

export class FollowUpModel {
    FollowUpId : string;
    UserID: string;
    FollowUpChannel: number;
    TotalComment: number;
    Customer: Customer;
    FollowUpStatus: number;
    FollowUpType: number;
    FollowUpLabel: number;
    IsPersonal: boolean;
    Owner: string;
    FollowUpDueDate: string;
    FollowUpSubject: string;
    Comment : FollowUpComment[];
    FollowUpLastModifyUser : string;
    SkillAddress: string;
    Notifications: FollowUpNotification[];
  
  constructor(followUpId : string, userID: string, followUpChannel: number, totalComment: number, customer: Customer,
    followUpStatus: number, followUpType: number, followUpLabel: number, isPersonal: boolean, owner: string,
    followUpDueDate: string, followUpSubject: string, comments: FollowUpComment[], skillAddress: string, Notifications: FollowUpNotification[]) {
      this.FollowUpId = followUpId;
      this.UserID = userID;
      this.FollowUpChannel = followUpChannel;
      this.TotalComment = totalComment;
      this.Customer = customer;
      this.FollowUpStatus = followUpStatus;
      this.FollowUpType = followUpType;
      this.FollowUpLabel = followUpLabel;
      this.IsPersonal = isPersonal;
      this.Owner = owner;
      this.FollowUpDueDate = followUpDueDate;
      this.FollowUpSubject = followUpSubject;
      this.Comment = comments;
      this.FollowUpLastModifyUser = userID;
      this.SkillAddress = skillAddress;
      this.Notifications = Notifications;
  }

  public static getFollowUpModelJson(): String{
        return JSON.stringify(this);
    }
}