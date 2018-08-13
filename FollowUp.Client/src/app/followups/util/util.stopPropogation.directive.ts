import { Directive, HostListener, Input } from "@angular/core";

@Directive({
    selector: "[click-stop-propagation]"
})
export class ClickStopPropagationDirective {
    @Input() disablePropogation: boolean;
    @HostListener("click", ["$event"])
    public onClick(event: any): void {
        if (!this.disablePropogation) {
            event.stopPropagation();
        } 
    }
}