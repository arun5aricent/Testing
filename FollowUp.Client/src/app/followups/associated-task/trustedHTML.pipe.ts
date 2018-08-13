import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
    name: 'trustedHTML'
})
export class TrustedHTMLPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(html) {
        let sanitizedUrl = this.sanitizer.bypassSecurityTrustHtml(html);
        return sanitizedUrl;
    }
}