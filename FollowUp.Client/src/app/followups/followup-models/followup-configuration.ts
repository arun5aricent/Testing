import { UserFollowUpTypes } from './followup-user-types';
import { FollowupStatus } from './followup-status';
import { FollowupLabels } from './followup-labels';
import { FollowupTypes } from './followup-types';
import { FollowupStates } from './followup-states';

export class FollowupConfiguration{
    Labels:FollowupLabels[];
    Status:FollowupStatus[];
    UserFollowUpTypes: UserFollowUpTypes[];
    FollowUpTypes: FollowupTypes[];
    States: FollowupStates[];
    constructor(){
        this.Labels=[];
        this.Status=[];
        this.UserFollowUpTypes = [];
        this.FollowUpTypes = [];
        this.States = [];
    }
}