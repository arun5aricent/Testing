import { AppConstant } from './util.appconstant';

export class DateTimeUtil {

    /**
     * Util method to get date in UTC format
     * @param dateString : date in string format fo whose UTC format is required
     */
    public static getDateStringInUTCFormat(dateString: string) {
        if (!dateString) {
            return new Date().toUTCString();
        } else {
            return new Date(dateString).toUTCString();
        }
    }

    /**
     * Get date in local timezone
     * @param dateString: 
     */
    public static getDateInLocalFormat(dateString: string) {
        if (!dateString) {
            return new Date();
        } else {
            return new Date(dateString);
        }
    }

    /**
     * Comparator to compare two dates
     * @param dateString1 : date1 in string format
     * @param dateString2 : date2 in string format
     */
    public static dateComparator(dateString1: string, dateString2: string): number {
        if (!dateString1) {
            dateString1 = new Date().toUTCString();
        }
        if (!dateString2) {
            dateString2 = new Date().toUTCString();
        }
        var date1 = new Date(dateString1);
        var date2 = new Date(dateString2);
        if (date1.getTime() > date2.getTime()) {
            return 1;
        } else if (date1.getTime() < date2.getTime()) {
            return -1;
        }
        return 0;
    }

    /**
     * Convert utc format into local format
     * @param dateString
     */
    public static utcToLocalTimeConverter(dateString:string) {
        var date = new Date(dateString);
        var millis = date.getTime() - (date.getTimezoneOffset() * AppConstant.MILISEC);
        return new Date().setTime(millis);
    }

    /**
     * Get differnece of days between two days
     * @param dateString1 : date 1 in string format
     * @param dateString2 : date 2 in string format
     */
    public static differenceOfDatesInDays(dateString1: string, dateString2: string) {
        if (!dateString1) {
            dateString1 = new Date().toUTCString();
        }
        if (!dateString2) {
            dateString2 = new Date().toUTCString();
        }
        var date1 = new Date(dateString1);
        var date2 = new Date(dateString2);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }

    /**
     * Get date before or after the current date based on parameter supplied
     * @param daysDifference
     */
    public static getDateBeforeAfter(daysDifference:number) {
        return new Date().setDate(new Date().getDate() + daysDifference);
    }

    /**
     * Get start of day in UTC format
     * @param dateObject
     */
    public static getStartOfDay(dateObject) {
        var d = dateObject == AppConstant.BLANK_STRING? new Date(): new Date(dateObject);
        d.setHours(0, 0, 0);
        return this.getDateStringInUTCFormat(d.toString());
    }

    /**
     * Get end of day in UTC format
     * @param dateObject
     */
    public static getEndOfDay(dateObject) {
        var d = dateObject == AppConstant.BLANK_STRING ? new Date() : new Date(dateObject);
        d.setHours(23, 59, 59);
        return this.getDateStringInUTCFormat(d.toString());
    }
}