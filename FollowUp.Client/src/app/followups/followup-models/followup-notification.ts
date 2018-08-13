export class FollowUpNotification {
    NotificationType: string;
    NotificationValue: string;
    NotificationStatus: number;

    constructor(notificationType: string, notificationValue: string, notificationStatus: number) {
        this.NotificationType = notificationType;
        this.NotificationValue = notificationValue;
        this.NotificationStatus = notificationStatus;
    }
}