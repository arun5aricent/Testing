import { FollowupCreateRes } from './followup-create-res';
export interface FollowupResponse {
    Status: boolean;
    Message: string;
    data: FollowupCreateRes;
}