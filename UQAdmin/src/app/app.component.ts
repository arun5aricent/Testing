declare var upstream: any;
declare var gadgets: any;
declare var finesse: any;

import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { SocialMiner } from './models/socialminer'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AppService]
})

export class AppComponent implements OnInit {

    socialMiners: SocialMiner[] = [];
    currentSM: SocialMiner = null;
    data = {};
    error = "";
    showError = false;
    uqEnabled = "false";

    // enum constants
    stateType = { Up: "Up", Down: "Down" };

    constructor(private appService: AppService, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.uqEnabled = upstream.gadget.Config.UniversalQueueEnabled;
        if (this.uqEnabled == "true") {
            this.getSocialMinerStates();
        }
    }

    getSocialMinerStates() {
        this.appService.getSocialMinerStates(this.getSocialMinerStateSuccess.bind(this), this.getSocialMinerStateFailure.bind(this));
    }

    getSocialMinerStateSuccess(response) {
        for (var i = 0; i < response.length; i++) {
            response[i].Progress = -1;
        }
        this.socialMiners = response;
        this.currentSM = this.socialMiners[0];
        this.getTaskRoutingStatistics();
        this.cdRef.detectChanges();
    }

    getSocialMinerStateFailure(response) {
        this.error = this.error = 'Social Miner states could not be retrieved due to error: ' + response.status + '-' + response.statusText;
        this.showError = true;
        this.cdRef.detectChanges();
    }

    /*changeStatus(currentState, fqdn) {
        if (currentState == this.stateType.Up) {
            this.setSocialMinerStateDown(fqdn);
        } else if (currentState = this.stateType.Down) {
            this.setSocialMinerStateUp(fqdn);
        }
    }

    setSocialMinerStateUp(fqdn) {
        this.appService.setSocialMinerStateUp(fqdn, this.setSocialMinerStateUpSuccess.bind(this), this.setSocialMinerStateUpFailure.bind(this));
    }

    setSocialMinerStateUpSuccess(response, id) {
        this.setState(id, this.stateType.Up);
        this.cdRef.detectChanges();
    }

    setSocialMinerStateUpFailure(response) {
        this.error = 'State could not be set to "Up" due to error: ' + response.status + '-' + response.statusText;
        this.showError = true;
        this.cdRef.detectChanges();
    }*/

    setSocialMinerStateDown(fqdn) {
        this.appService.setSocialMinerStateDown(fqdn, this.setSocialMinerStateDownSuccess.bind(this), this.setSocialMinerStateDownFailure.bind(this));
    }

    setSocialMinerStateDownSuccess(response, id) {
        this.setState(id, this.stateType.Down);
        this.cdRef.detectChanges();
    }

    setSocialMinerStateDownFailure(response) {
        this.error = 'State could not be set to "Down" due to error: ' + response.status + '-' + response.statusText;
        this.showError = true;
        this.cdRef.detectChanges();
    }

    setSocialMinerResubmitRequest(fqdn) {
        this.appService.setSocialMinerResubmitRequest(fqdn, this.setSocialMinerResubmitRequestSuccess.bind(this), this.setSocialMinerResubmitRequestFailure.bind(this));
    }

    setSocialMinerResubmitRequestSuccess(response, id) {
        this.setResubmit(id);
        this.getTaskRoutingStatistics();
        this.cdRef.detectChanges();
    }

    setSocialMinerResubmitRequestFailure(response) {
        this.error = 'Tasks could not be requeued due to error: ' + response.status + '-' + response.statusText;
        this.showError = true;
        this.cdRef.detectChanges();
    }

    setState(fqdn, state) {
        for (var i = 0; i < this.socialMiners.length; i++) {
            if (this.socialMiners[i].FQDN == fqdn) {
                this.socialMiners[i].State = state;
                break;
            }
        }
    }

    setResubmit(fqdn) {
        for (var i = 0; i < this.socialMiners.length; i++) {
            if (this.socialMiners[i].FQDN == fqdn) {
                if (!this.socialMiners[i].ResubmitRequest) {
                    this.socialMiners[i].ResubmitRequest = true;
                }
                this.currentSM = this.socialMiners[i];
                break;
            }
        }
    }

    hideError() {
        this.showError = false;
        this.cdRef.detectChanges();
    }

    getTaskRoutingStatistics() {
        this.appService.getTaskRoutingStatistics(this.getTaskRoutingStatisticsSuccess.bind(this), this.getTaskRoutingStatisticsFailure.bind(this));
    }

    getTaskRoutingStatisticsSuccess(response, id) {
        this.setProgress(response.TotalPendingOperations);
        this.cdRef.detectChanges();
    }

    getTaskRoutingStatisticsFailure(response) {
        this.error = 'Requeue progress could not be retrieved due to error: ' + response.status + '-' + response.statusText;
        this.showError = true;
        this.cdRef.detectChanges();
    }

    setProgress(progress) {
        this.currentSM.Progress = progress;
        this.cdRef.detectChanges();
    }

    refreshApp() {
        this.getSocialMinerStates();
        this.cdRef.detectChanges();
    }
}
