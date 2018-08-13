import {Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';

import {Carousel, Direction} from  './carousel.component';
//import "../../../assets/js/logger.js";

declare var upstream: any

@Component({
    selector: 'slide',
    template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `
})
export class Slide implements OnInit, OnDestroy {
  
    @Input() public index:number = 0;
    @Input() public direction:Direction;

    @HostBinding('class.active')
    @Input() public active:boolean;

    @HostBinding('class.item')
    @HostBinding('class.carousel-item')
    private addClass:boolean = true;

    constructor(private carousel:Carousel) {
    }

    public ngOnInit() {
        this.carousel.addSlide(this);
        //upstream.Logger.info("Slide", "slide added");
    }

    public ngOnDestroy() {
       // this.carousel.removeSlide(this);
    }
}
