import { HostListener } from '@angular/core';
import { FollowUpNotificationModel } from '../followup-models/followup-notification-model';
import { FollowupNotifications } from '../followup-models/followup-notifications';
import { AppConstant } from './util.appconstant';
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { FollowupsApis } from '../followup-models/followups-apis';
import { DateTimeUtil } from './util.dateTime';
import { AppUtil } from './util.apputil';
import * as moment from 'moment';
import 'moment/locale/it';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/pt';
import 'moment/locale/fr';

declare var Notification;
declare var GadgetServices: any;
declare var upstream: any;
declare var Handlebars: any;

/**
 * FollowUpNotification :: Handle followup notification
 */
export class FollowUpNotification {
    private static TAG: string = "FollowUpNotifi~";
    private notification: Notification;
    private static CLOSEDELAY: number = upstream.gadget.Config.extTaskNoteTimeout || 10000;;
    private static TIMERSTART_AT: number = 2000;
    private static TIMER_INTERVAL: number = 6000;//time interval for timer
    private notificationData: Array<FollowUpNotificationModel> = null;//Store notification data
    private subscription: Subscription;
    private instances: Notification[] = [];
    private localization = upstream.gadget.locale.FollowUpGadget;
    private extNotifierWind: any;

    constructor() {
        var enableFollowUp = AppUtil.getEnableFollowUp();
        moment.locale('en');
        upstream.Logger.info(FollowUpNotification.TAG, "enable followup " + enableFollowUp);
        if (!enableFollowUp || enableFollowUp === 'false') {// if followup is not enable return from here
            return;
        }

        this.notificationData = new Array();
        let timer = TimerObservable.create(FollowUpNotification.TIMERSTART_AT, FollowUpNotification.TIMER_INTERVAL);
        this.subscription = timer.subscribe(t => {
            this.handleNotification();
        });
        upstream.Logger.debug(FollowUpNotification.TAG, "Notification Timer Set");
    }



    /**
     * 1- traverse notificationData and validate notification item
     * 2- convert notificationvalue into valid date & format that data
     *    into ddd MMM DD YYYY, hh:mm A
     * 3- If  NotificationValue == null check type if its completion then show
     *    completion notification.
     */
    private handleNotification() {
        let currentDatTime = moment().format(AppConstant.DATEFORMAT);
        this.notificationData.forEach((item, index) => {
            if (item == null) {
                upstream.Logger.info(FollowUpNotification.TAG, "NotificationValue " + item);
                return;
            }
            try {
                var inputedDate = new Date(item.NotificationValue);
                var notificatioValue = moment(inputedDate).format(AppConstant.DATEFORMAT);
                var isSameDate = moment(notificatioValue).isSameOrBefore(currentDatTime);// exact date & time OR before current date & time 

                if (isSameDate && Number(item.NotificationStatus) == AppConstant.DEFAULT_NOTIFICAITON_STATUS) {
                    upstream.Logger.info(FollowUpNotification.TAG, "Due Date & custom date notification :: " + currentDatTime +
                        " notificatioValue :: " + notificatioValue);
                    var notificationGroups = this.notificationData.filter(dueDate => (moment(moment(new Date(dueDate.NotificationValue)).format(AppConstant.DATEFORMAT)).isSameOrBefore(currentDatTime)));
                    this.showNotification(item, index, notificationGroups);
                }
            } catch (e) {
                upstream.Logger.error(FollowUpNotification.TAG, e);
            }
        });
    }

    /**
     * merge new list of notification into existing notifications.
     * @param data
     */
    public addData(data: Array<FollowUpNotificationModel>) {
        this.notificationData = [];
        this.notificationData = data;
        upstream.Logger.debug(FollowUpNotification.TAG, "size of notification array :: " + this.notificationData.length);
    }

    private checkCompatibility() {
        return !!('Notification' in window);
    }

    private isPermissionGranted(permission) {
        return permission === 'granted';
    }
    /**
     * Update request for notification in case of viewed
     * @param datas
     * @param notificationStatus
     */
    private updateRemoteNotification(datas: Array<FollowUpNotificationModel>, notificationStatus: number) {
        var len = datas.length;
        if (len == 0)
            return;
        var valueArray = [];
        var value = {};
        for (var x = 0; x < len; x++) {
            value = {};
            var item = datas[x];
            value['FollowUpId'] = item.FollowUpId;
            value['NotificationType'] = item.NotificationType;
            value['NotificationValue'] = (item.NotificationValue == null || item.NotificationValue == undefined) ? item.NotificationValue : DateTimeUtil.getDateStringInUTCFormat(item.NotificationValue);
            value['NotificationStatus'] = notificationStatus;
            valueArray.push(value);
        }
        GadgetServices.hub.publish('com.upstreamworks.events.update_notification', JSON.stringify(valueArray));
    }




    /**
     * show followup notification
     * @param item
     * @param index
     */
    private showNotification(item: FollowUpNotificationModel, index: number, datas: Array<FollowUpNotificationModel>) {
        if (!this.checkCompatibility()) {
            this.ieNotification(item, index, datas);
            return upstream.Logger.debug(FollowUpNotification.TAG, 'Notification API not available in this browser.');
        }

        if (this.isPermissionGranted(Notification.permission)) {
            this.create(item, index, datas);
        } else if (Notification) {
            Notification.requestPermission();
            if (this.isPermissionGranted(Notification.permission)) {
                this.create(item, index, datas);
            }
        }
    }

    /**
     * In case of  browser doesn't ssupport Notification, a new window'll open, in place of dekstop notification.
     * @param item
     * @param index
     * @param datas
     */
    private ieNotification(item: FollowUpNotificationModel, index: number, datas: Array<FollowUpNotificationModel>): void {
        let title = "", body = "";
        var source = AppUtil.getTemplate();

        if (datas.length == 1) {
            title = item.FollowUpSubject.length <= 27 ? item.FollowUpSubject : item.FollowUpSubject.substring(0, 24) + "...";
            body = this.localization.Status + " : " + this.localization[item.FollowUpStatus];
        } else if (datas.length > 1) {
            var unique = this.getUniqueFollowUpCount(datas);
            title = this.localization.MultipleNotificationMessage.replace(AppConstant.PLACEHOLDER_1, unique).replace(AppConstant.PLACEHOLDER_2, datas.length);
            body = "";
        } else if (datas.length == 0) {
            upstream.Logger.info(FollowUpNotification.TAG, "No Notification available " + datas.length);
            return;
        }

        var data = {
            "Title": "FollowUp",
            "iconPath": FollowupsApis.NOTIFICATION_LOGO_PATH,
            "title": title,
            "Status": body
        };

        var wargs = "width=300,height=70,toolbar=no,titlebar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top=" + (window.screen.height - 200) + ",right=80";
        var pfunc = Handlebars.compile(source);
        this.extNotifierWind = window.open("", "_blank", wargs);
        this.extNotifierWind.document.write(pfunc(data));
        var ua = navigator.userAgent.toLowerCase();
        var isWinXP = ua.indexOf('windows nt 5.1') > 0;

        if (isWinXP) {
            this.extNotifierWind.document.querySelector("#opFocus").style.display = "none";
        }
        var pTimeout = upstream.gadget.Config.extTaskNoteTimeout || 10000;
        if (pTimeout > 0) setTimeout(function () { this.extNotifierWind.close(); }, pTimeout);

        if (datas.length == 1) {
            this.notificationData.splice(index, 1);
        } else {
            var len = datas.length;
            for (var subI = 0; subI < len; subI++) {
                var id = datas[subI].FollowUpId;
                var v = datas[subI].NotificationValue;
                var i = this.notificationData.findIndex(x => (x.FollowUpId == id && x.NotificationValue == v));
                upstream.Logger.info(FollowUpNotification.TAG, " Remove data of pos  " + i + " Size of main list after remove ");
                this.notificationData.splice(i, 1);
            }
        }
        this.updateRemoteNotification(datas, AppConstant.DELIVERED_NOTIFICAITON_STATUS);//update server data of notification
        upstream.Logger.info(FollowUpNotification.TAG, "Notification Size After prompt " + this.notificationData.length);
    }

    /**
     * Notification creation for inputed data
     * @param item
     * @param index
     */
    private create(item: FollowUpNotificationModel, index: number, datas: Array<FollowUpNotificationModel>) {
        let title = "", body = "";

        var isExist = this.isAlreadyNotify("" + item.FollowUpId);
        if (isExist) {
            upstream.Logger.info(FollowUpNotification.TAG, "This Notificationis already shown");
            return;
        }

        if (datas.length == 1) {
            title = item.FollowUpSubject.length <= 27 ? item.FollowUpSubject : item.FollowUpSubject.substring(0, 24) + "...";
            body = this.localization.Status + " : " + this.localization[item.FollowUpStatus];
        } else if (datas.length > 1) {
            var unique = this.getUniqueFollowUpCount(datas);
            title = this.localization.MultipleNotificationMessage.replace(AppConstant.PLACEHOLDER_1, unique).replace(AppConstant.PLACEHOLDER_2, datas.length);
            body = "";
        } else if (datas.length == 0) {
            upstream.Logger.info(FollowUpNotification.TAG, "No Notification available " + datas.length);
            return;
        }
        upstream.Logger.info(FollowUpNotification.TAG, "Notification Size before prompt " + this.notificationData.length);

        let notification = new Notification(title, {
            dir: "ltr",
            icon: FollowupsApis.NOTIFICATION_LOGO_PATH,
            body: body,
            tag: "" + item.FollowUpId
        });
        if (datas.length == 1) {
            this.notificationData.splice(index, 1);
        } else {
            var len = datas.length;
            for (var subI = 0; subI < len; subI++) {
                var id = datas[subI].FollowUpId;
                var v = datas[subI].NotificationValue;
                var i = this.notificationData.findIndex(x => (x.FollowUpId == id && x.NotificationValue == v));
                upstream.Logger.info(FollowUpNotification.TAG, " Remove data of pos  " + i + " Size of main list after remove ");
                this.notificationData.splice(i, 1);
            }
        }
        this.updateRemoteNotification(datas, AppConstant.DELIVERED_NOTIFICAITON_STATUS);//update server data of notification
        upstream.Logger.info(FollowUpNotification.TAG, "Notification Size After prompt " + this.notificationData.length);
        this.instances.push(notification);
        this.attachEventHandlers(notification, item);
        this.close(notification);
    }

    /**
     * 
     * @param notification
     * @param item
     */
    private attachEventHandlers(notification: Notification, item: FollowUpNotificationModel) {
        notification.onclick = (event) => {
            FollowUpNotification.CLOSEDELAY = 0;
            if (notification.body.length > 0) {
                var reqData = {};
                reqData['FollowUpId'] = item.FollowUpId;
                reqData['interaction'] = 1;
                reqData['TaskId'] = 1;
                GadgetServices.hub.publish('com.upstreamworks.events.view_followup', JSON.stringify(reqData));//notification viewed

            } else {
                GadgetServices.hub.publish('com.upstreamworks.events.view_multiple_followup_notification', true);//notification viewed 
            }
            GadgetServices.hub.publish("com.upstreamworks.events.showActiveFollowUp", true);// move to followuptab
            this.close(notification);
        };

        notification.onerror = () => {
            upstream.Logger.error(FollowUpNotification.TAG, "Unexpected error happened");
        };

    }

    /**
     * Close open notifications manualy/auto in x sec
     * @param notification
     */
    private close(notification): void {
        if (FollowUpNotification.CLOSEDELAY > 0) {
            setTimeout(() => {
                this.clearTemp(notification);
                notification.close();
            }, FollowUpNotification.CLOSEDELAY);
        } else {
            this.clearTemp(notification);
            notification.close();
        }
    }

    private clearTemp(notification) {
        for (var i = 0; i < this.instances.length; i++) {
            var iTag = this.instances[i].tag;
            if (notification.tag == iTag) {
                this.instances.splice(i, 1)
            }
        }
    }

    /**
     * close all visible notifications
     */
    public closeAll(): void {
        for (var i = 0; i < this.instances.length; i++) {
            this.instances[i].close();
        };
        this.instances = [];
    }

    /**
     * check notification already shown
     * @param tag
     */
    private isAlreadyNotify(tag: string) {
        var isExist = this.instances.filter(notification => notification.tag === tag);
        upstream.Logger.info(FollowUpNotification.TAG, "Current notification tag :: isExist " + isExist);
        return isExist.length == 0 ? false : true;
    }

    /**
     * before window unload :: clear all pending notification & unsubscribed timer
     */
    public beforeUnload() {
        upstream.Logger.info(FollowUpNotification.TAG, "delete all local notification record & unsubscribed timer.");
        this.notificationData = [];
        this.closeAll();

        if (this.subscription)// this if will detect undefined issue of subscription)
            this.subscription.unsubscribe();
    }
    /**
     * Filter Unique element :for removing duplicacy of same notification
     * @param datas
     */
    private getUniqueFollowUpCount(datas: Array<FollowUpNotificationModel>) {
        var uniqueArray = [];
        datas.forEach((item, index) => {
            if (uniqueArray.indexOf(item.FollowUpId) == -1) {
                uniqueArray.push(item.FollowUpId);
            }
        });
        return uniqueArray.length;
    }

}