
export class FollowupLabels {    
    LabelID: number;
    Description:string;
    LabelName:string;
    constructor(labelID:number,description:string,labelName:string){
        this.LabelID = labelID;
        this.Description = description;
        this.LabelName = labelName;
    }
}