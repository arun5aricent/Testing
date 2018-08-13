/**
 * Custom pipe for showing date tomorrow, today and yesterday
 * format
*/
import { Pipe, PipeTransform } from '@angular/core';

declare var moment;
declare var upstream;

@Pipe({
    name: 'custommaxlength'
})
export class CustomMaxLengthPipe implements PipeTransform {

    transform(value: string, maxLength: number) {
        if (value) {
            var length = isNaN(maxLength) ? 20 : maxLength;
            var transformedText = value.length > maxLength ? value.substring(0, length - 3) + "..." : value;
            return transformedText;
        }
    }
}