import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
    name: 'trusted'
})
export class TrusteURLPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url: string) {
        let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(url);
        return sanitizedUrl;
    }
}