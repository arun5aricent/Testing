export class UserFollowUpTypes{
    UserId:number;
    FollowUpTypeId: number;
    Name: string;

    constructor(UserId: number, FollowUpTypeId: number, Name:string){
        this.UserId = UserId;
        this.FollowUpTypeId = FollowUpTypeId;
        this.Name = Name;
    }
}