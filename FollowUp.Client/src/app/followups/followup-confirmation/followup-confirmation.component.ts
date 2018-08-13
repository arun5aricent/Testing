import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppConstant } from '../util/util.appconstant';

declare var upstream;

@Component({
    selector: 'confirmation-box',
    templateUrl: `./followup-confirmation.component.html`,
    styleUrls: ['./followup-confirmation.component.css']
})
export class FollowupConfirmationComponent {
    @Input() public UIParams: any;
    @Output() public confirmQueueTaskNotify: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public hideModalNotify: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild(AppConstant.CONFIRMATION_MODAL_KEY) public confirmationModal: ModalDirective;
    public message: string;
    public type: string;

    hideConfirmationDialog() {
        this.confirmationModal.hide();
        if(this.type == AppConstant.CRITICAL){
            this.hideModalNotify.emit(true);
        }
    }

    confirmQueueTask() {
        this.confirmQueueTaskNotify.emit(true);
        this.hideConfirmationDialog();
    }

    show(message: string, type: string) {
        this.message = message;
        this.type = type;
        this.confirmationModal.show();
    }
}