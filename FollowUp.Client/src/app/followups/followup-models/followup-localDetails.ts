import { TaskFollowUpDetails } from './followup-taskdetail';
import { Customer } from './customer';
import { FollowUpNotification } from './followup-notification';
export class FollowUpLocalDetails {
    FollowUpSubject: string = "";
    FollowUpDueDate: string;
    FollowUpLabel: number;
    FollowUpType: number;
    FollowUpComment: string = "";
    IsPersonal: boolean = false;
    IsOpen: boolean = false;
    AgentId: string = "";
    ChannelType: number;
    TaskDetail: TaskFollowUpDetails;
    Owner: string = "";
    CustomerInfo: Customer;
    Notifications: FollowUpNotification[];
    customNotificationDate: string;
    /*constructor(followUpSubject: string, followUpDueDate: string, followUpType: number, followUpLabel: number, followUpComment: string) {
        this.FollowUpSubject = followUpSubject;
        this.FollowUpDueDate = followUpDueDate;
        this.FollowUpType = followUpType;
        this.FollowUpLabel = followUpLabel;
        this.FollowUpComment = followUpComment;
    }*/
}