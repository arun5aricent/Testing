export class TaskFollowUpDetails {
    FollowUpId: number;
    TaskId: string;
    SubInteractionId: number;
    ChannelName: string;
    ChannelIcon: string;

    constructor(FollowUpId: number, TaskId: string, SubInteractionId: number, ChannelName: string, ChannelIcon:string) {
        this.FollowUpId = FollowUpId;
        this.TaskId = TaskId;
        this.SubInteractionId = SubInteractionId;
        this.ChannelName = ChannelName;
        this.ChannelIcon = ChannelIcon;
    }
}
