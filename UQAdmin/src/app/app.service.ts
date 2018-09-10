declare var upstream: any;
declare var gadgets: any;
declare var finesse: any;

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class AppService {

    constructor() { }

    baseUri = upstream.gadget.Config.baseUri;

    getSocialMinerStates(success, failure): void {
        return upstream.gadgets.io.ajax({
            url: this.baseUri + '/api/taskrouting/getsocialminerstates',
            type: "GET",
            success: function (data: any) {
                success(JSON.parse(data.StateList));
            },
            error: function (data: any) {
                failure(data);
            }
        });
    }

    /*setSocialMinerStateUp(id, success, failure): void {
        return upstream.gadgets.io.ajax({
            url: this.baseUri + '/api/taskrouting/setsocialminerstateup?fqdn=' + id,
            type: "PUT",
            success: function (data: any) {
                success(data, id);
            },
            error: function (data: any) {
                failure(data);
            }
        });
    }*/

    setSocialMinerStateDown(id, success, failure): void {
        return upstream.gadgets.io.ajax({
            url: this.baseUri + '/api/taskrouting/setsocialminerstatedown?fqdn=' + id,
            type: "PUT",
            success: function (data: any) {
                success(data, id);
            },
            error: function (data: any) {
                failure(data);
            }
        });
    }

    setSocialMinerResubmitRequest(id, success, failure): void {
        return upstream.gadgets.io.ajax({
            url: this.baseUri + '/api/taskrouting/setsocialminerresubmitrequest?fqdn=' + id,
            type: "PUT",
            success: function (data: any) {
                success(data, id);
            },
            error: function (data: any) {
                failure(data);
            }
        });
    }

    getTaskRoutingStatistics(success, failure): void {
        return upstream.gadgets.io.ajax({
            url: this.baseUri + '/api/taskrouting/gettaskroutingstatistics',
            type: "GET",
            success: function (data: any) {
                success(JSON.parse(data.Statistics));
            },
            error: function (data: any) {
                failure(data);
            }
        });
    }

}