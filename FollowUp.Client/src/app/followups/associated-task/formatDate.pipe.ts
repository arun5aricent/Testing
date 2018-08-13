import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment;
@Pipe({
    name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(date) {
        var dateNoTz = new Date(date).toLocaleString('en-Us', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        var dateTz = new Date(date).toLocaleString('en-Us', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
        if (dateTz.length == dateNoTz.length) {
            return moment(date).format('ddd, MMM D, YYYY hh:mm A Z');
        } else {
            return dateTz;
        }
    }
}