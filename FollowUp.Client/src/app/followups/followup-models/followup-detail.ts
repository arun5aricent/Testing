import { FollowupUser } from './followup-user';
import { FollowUpComment } from './followup-comment';
import { TaskFollowUpDetails } from './followup-taskdetail';
import { Customer } from './customer';
import { FollowUpNotification } from './followup-notification';
export class FollowupDetail{
    UserID: string;
    FollowUpChannel: number;
    FollowUpLastModifiedDate: string;
    FollowUpCompleteDate: string;
    FollowUpLastModifyUser: string;
    TotalComment: number;
    Comment: FollowUpComment[];
    Customer: Customer;
    FollowUpID: string;
    FollowUpStatus: number;
    FollowUpType: number;
    FollowUpLabel: number;
    IsPersonal: boolean;
    ContactID: string;
    Owner: string;
    CustomerName: string;
    FollowUpCreationDate: string;
    FollowUpDueDate: string;
    FollowUpSubject: string;
    SkillAddress:string;
    IsQueued: boolean;
    TaskDetail: TaskFollowUpDetails;
    Notifications: FollowUpNotification[];
    constructor(){}

}