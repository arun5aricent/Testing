import { Customer } from './customer';
import { FollowUpComment } from './followup-comment';
import { TaskFollowUpDetails } from './followup-taskdetail';
import { FollowUpNotification } from './followup-notification';
 export class FollowUpInsert{
  UserID: string;
  FollowUpChannel: number;
  FollowUpLastModifyUser: string;
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
  SkillAddress: string;
  TaskDetail: TaskFollowUpDetails;
  Notifications: FollowUpNotification[];
  constructor(userID: string, followUpChannel: number, totalComment: number, customer: Customer,
    followUpStatus: number, followUpType: number, followUpLabel: number, isPersonal: boolean, owner: string,
    followUpDueDate: string, followUpSubject: string, comments: FollowUpComment[], skillAddress: string, TaskDetail: TaskFollowUpDetails, Notifications: FollowUpNotification[]) {
      
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
      this.TaskDetail = TaskDetail;
      this.Notifications = Notifications;
  }
}
