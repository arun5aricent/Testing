import { Directive, ElementRef, Renderer } from '@angular/core';
import { AppConstant } from '../util/util.appconstant';

@Directive({
    selector: '[customAutofocus]'
})
export class CustomAutofocusDirective {
    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.el.nativeElement, AppConstant.FOCUS, []);
    }
}