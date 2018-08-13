import { Followup } from './followup';
export interface FollowupRes{
    TotalRecords : number;
    isPersonal : boolean;
    FollowUpList : Followup[];
}