export class FollowupTypes {
    FollowUpTypeId: number;
    Name: string;
    Description: string;
    Active: boolean;

    constructor(FollowUpTypeId: number, Name: string, Description: string, Active: boolean) {
        this.FollowUpTypeId = FollowUpTypeId;
        this.Description = Description;
        this.Name = Name;
        this.Active = Active;
    }
}