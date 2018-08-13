import { FollowupConfiguration } from '../followup-models/followup-configuration';
import { Followup } from '../followup-models/followup';
import { Component, Input, OnInit } from '@angular/core';
@Component({
    selector: 'followup-status',
    templateUrl: `./followup-status.component.html`,
    styleUrls: ['./followup-status.component.css']
})

export class FollowUpStatusComponent implements OnInit {
    @Input() UIParams: any;
    @Input('datum') datum: Followup;
    @Input('configurationData')configurationData:FollowupConfiguration;
    currentDate = new Date();
    ngOnInit() {
        
    }
    isUrgent() {
        if (typeof this.datum !== 'undefined') {
            let dueDate = new Date(this.datum.FollowUpDueDate);

            if (this.numDaysBetween(dueDate, this.currentDate) < 7) {
                return true;
            }
            return false;
        }
    }

    numDaysBetween = function (d1, d2) {
        var diff = Math.abs(d1.getTime() - d2.getTime());
        return diff / (1000 * 60 * 60 * 24);
    };
    getSelectedLabel() {
        let selectedLabelObject=this.configurationData.Labels.find(electedLabel => electedLabel.LabelID==this.datum.FollowUpLabel);
        return selectedLabelObject.LabelName;
    }
    getSelectedLabelColor(){
        let selectedLabelObject=this.configurationData.Labels.find(electedLabel => electedLabel.LabelID==this.datum.FollowUpLabel);
        return selectedLabelObject.Description;
    }
}