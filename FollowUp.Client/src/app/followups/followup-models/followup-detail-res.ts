import { FollowupDetail } from './followup-detail';
export interface FollowupDetailRes{
    Status: boolean;
    Message: string;
    data: FollowupDetail;
}