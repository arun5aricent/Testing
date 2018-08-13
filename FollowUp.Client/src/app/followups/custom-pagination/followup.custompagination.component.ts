import { PaginationInstance } from 'ngx-pagination'; // <-- import the module
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core"
import {Followup } from '../followup-models/followup';

@Component({
    selector: 'custom-followup-pagination',
    templateUrl: './followup.custompagination.component.html',
    styleUrls: ['./followup.custompagination.component.css'],
})
export class CustomPaginationComponent {
    @Input('followUps') public  followUps: Array<Followup> = [];
    @Output() public   pageChange: EventEmitter<number> = new EventEmitter<number>();
    @Input() public   maxSize: number;
    @Input() public  recordsPerPage: number;
    @Input() public   currPage: number;
    public autoHide: boolean = true;

    public config: PaginationInstance = {
        id: 'clients',
        itemsPerPage: this.recordsPerPage,
        currentPage: this.currPage
    };
}