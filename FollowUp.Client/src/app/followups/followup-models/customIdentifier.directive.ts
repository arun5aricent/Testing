import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { AppConstant } from '../util/util.appconstant';

@Directive({
    selector: '[customIdentifier]'
})
export class CustomIdentifierDirective {
    @Input("customIdentifier") customIdentifier:string;
    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
    }
}