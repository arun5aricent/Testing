export class FollowUpFilter {
    isPersonal: number;
    offset: number;
    recordsPerPage: number;
    label: number;
    status: number;
    type: number;
    sortingColumn: string;
    sortingOrder: string;
    textSearch: string;
    startDueDate:string;
    endDueDate:string;
    isNotify:boolean;
    userID:number;

    constructor(isPersonal: number, offset: number, recordsPerPage: number, label: number, status: number,
        type: number, sortingColumn: string, sortingOrder: string, textSearch: string, startDueDate: string, enddueDate: string, isNotify:boolean,userID:number) {
        this.isPersonal = isPersonal;
        this.offset = offset;;
        this.recordsPerPage = recordsPerPage;;
        this.label = label;;
        this.status = status;;
        this.type = type;;
        this.sortingColumn = sortingColumn;
        this.sortingOrder = sortingOrder;
        this.textSearch = textSearch;
        this.startDueDate=startDueDate;
        this.endDueDate=enddueDate;
        this.isNotify = isNotify;
        this.userID = userID;
    }
}