import { Notification } from '../followup-models/notification';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppConstant } from '../util/util.appconstant';
declare var upstream: any;


@Component({
    selector: 'followup-header-notification-banner',
    templateUrl: `./followup-notification-banner.component.html`,
    styleUrls: ['./followup-notification-banner.component.css']
})

export class FollowUpListNotificationBannerComponent {
     @Input() UIParams: any;
    @Input(AppConstant.NOTIFICATION) notification: Notification;
    @Output() onCancel = new EventEmitter();

    getClassName() {
        switch (this.notification.notificationType) {
            case AppConstant.SUCCESS:
                return AppConstant.SUCCESS;
            case AppConstant.INFO:
                return AppConstant.INFO;
            case AppConstant.WARNING:
                return AppConstant.WARNING;
            case AppConstant.DANGER_KEY:
                return AppConstant.DANGER_KEY;
        }
        return AppConstant.DEFAULT;
    }

    getTextClassName() {
        switch (this.notification.notificationType) {
            case AppConstant.SUCCESS:
                return AppConstant.SUCCESS_TEXT;
            case AppConstant.INFO:
                return AppConstant.INFO_TEXT;
            case AppConstant.WARNING:
                return AppConstant.WARNING_TEXT;
            case AppConstant.DANGER_KEY:
                return AppConstant.DANGER_TXT;
        }
        return AppConstant.DEFAULT_TEX;
    }

    onNotificationClosed() {
        this.onCancel.emit();
    }


}