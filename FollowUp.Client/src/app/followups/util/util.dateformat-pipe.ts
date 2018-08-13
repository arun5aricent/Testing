/**
 * Custom pipe for showing date tomorrow, today and yesterday
 * format
*/
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import 'moment/locale/it';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/pt';
import 'moment/locale/fr';
declare var upstream;

@Pipe({
    name: 'commentDateFormat'
})
export class CommentDateFormatPipe extends DatePipe implements PipeTransform {

    transform(dateString: string) {
        let inputedDate = new Date(dateString);
        let startOfToday = moment().startOf('day');
        let startOfDate = moment(inputedDate).startOf('day');
        let daysDiff = startOfDate.diff(startOfToday, 'days');
        let days = {
            '0': 'Today',
            '-1': 'Yesterday',
            '1': 'tomorrow'
        };

        let dateText = moment(inputedDate).format("ddd MMM DD YYYY, hh:mm A");;
        let timeStamp = dateText.split(",")
        if (daysDiff == -1 || daysDiff == 0) {
            dateText = days[daysDiff] + timeStamp[1];
        }
        return dateText;
    }
}