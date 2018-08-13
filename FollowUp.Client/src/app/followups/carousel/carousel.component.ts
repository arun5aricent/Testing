import { style, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy} from '@angular/core';
import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Slide } from './slide.component';
import { AppConstant } from '../util/util.appconstant';

export enum Direction { UNKNOWN, NEXT, PREV };

declare var upstream: any;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'carousel',
    template: `
    <div id="carouselCmpt" data-wrap="false" class="carousel slide">
      <div class="carousel-inner"><ng-content></ng-content>
                  
                 </div>
    </div>
<div class="viewModalNavPrev uwf-previous" (click) = "prev()" *ngIf="!isEditModeEnable"  [style.visibility]="isFirst || isHide?'hidden':'visible'"></div>
                  <div class="viewModalNavNext uwf-advance" (click) = "next()" *ngIf="!isEditModeEnable" [style.visibility]="isLast || isHide?'hidden':'visible'"></div>
  `,
    styleUrls: ['./carousel.component.css'],
})

export class Carousel {
    private static TAG: string = "Carousel~";
    @Output() public clickedNext: EventEmitter<number> = new EventEmitter<number>();
    @Output() public clickedPrev: EventEmitter<number> = new EventEmitter<number>();
    @Input() public slideIndex: number = 0;
    @Input() public isEditModeEnable: boolean;
    public isHide: boolean = false;
    public isLast: boolean = false;
    public isFirst: boolean = false;
    private currentSlide: Slide;

    constructor(private appRef: ChangeDetectorRef) {
        upstream.Logger.info(Carousel.TAG, "Carousel created " );
    }

    public getInstance() {
        upstream.Logger.info(Carousel.TAG, "Carousel this " + this);
        return this;
    }
   
    /*
      * move carousel to next position if current slide is not 
      * last one.
     */
    private next() {
        upstream.Logger.info(Carousel.TAG, "current Slide Index => " + this.slideIndex);
        if (this.isLast) {
            upstream.Logger.info(Carousel.TAG, "next You are on last slide");
            true;
        }
        this.isFirst = false;
        this.clickedNext.emit(this.slideIndex + 1);
        upstream.Logger.info(Carousel.TAG, this.slideIndex + " last update value " + this.isLast);
        this.refreshDOM();
    }

    /*
     * move carousel to prev position if current slide is not 
     * zero.
    */
    private prev() {
        upstream.Logger.info(Carousel.TAG, "current Slide Index => " + this.slideIndex);
        if (this.isFirst) {
            upstream.Logger.info(Carousel.TAG, "prev You are on last slide");
            true;
        }
        this.isLast = false;
        this.clickedPrev.emit(this.slideIndex - 1);
        this.refreshDOM();
    }

    public addSlide(slide: Slide) {
        slide.index = 0;
        slide.active = true;
        this.currentSlide = slide;
        this.slideIndex = 0;
    }

    public scrollTo(index: number) {
        upstream.Logger.info(Carousel.TAG, "Scroll To : " + index);
        this.currentSlide.index = index;
        this.slideIndex = index;
        this.refreshDOM();
    }

    public updateLastVal(isLast: boolean) {
        this.isLast = isLast;
        this.refreshDOM();
    }

    public updateFirstVal(isFirst: boolean) {
        this.isFirst = isFirst;
        this.refreshDOM();
    }

    hideCarousel(isHide) {
        this.isHide = isHide;
        this.refreshDOM();
    }

    private refreshDOM() {
        if (!this.appRef['destroyed']) {
            this.appRef.detectChanges()
        }
    }
}