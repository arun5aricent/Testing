import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Carousel } from '../followups/carousel/carousel.component';
import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, Component } from '@angular/core';
import { Slide } from '../followups/carousel/slide.component';


describe('Carousel', () => {

    let comp: Carousel;
    let fixture: ComponentFixture<Carousel>;
    let de;
    let el: HTMLElement;
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                HttpModule,
                FormsModule
            ],
            declarations: [
                Slide,
                Carousel
            ], // declare the test component

        })
            .compileComponents() // compile template and css
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(Carousel);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('correct instance of carousel should be recieved', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            var comp1 = comp.getInstance();
        });

    }));


    it('correct slide should become active', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            var slide = new Slide(comp.getInstance());
            slide.index = 0;
            var slide2 = new Slide(comp.getInstance());
            slide2.index = 1;
            comp.addSlide(slide);
            comp.addSlide(slide2);
            comp["currentSlide"] = slide;
            expect(slide.active).toBeTruthy();
        });

    }));


    it('on clicking next next slide should open', async(() => {

        fixture.whenStable().then(() => {
            de = fixture.debugElement.query(By.css('a'));
            fixture.detectChanges();
            var slide = new Slide(comp.getInstance());
            slide.index = 0;
            comp.addSlide(slide);
            comp.scrollTo(0);
            comp["next"]();
            comp.isLast = true;
            comp["next"]();
        });

    }));

    it('on clicking next, next slide should open', async(() => {

        fixture.whenStable().then(() => {
            de = fixture.debugElement.query(By.css('a'));
            fixture.detectChanges();
            var slide = new Slide(comp.getInstance());
            slide.index = 0;
            comp.addSlide(slide);
            comp.scrollTo(2);
            comp["next"]();
        });

    }));

    it('on clicking previous, previous slide should open', async(() => {

        fixture.whenStable().then(() => {
            de = fixture.debugElement.query(By.css('a'));
            fixture.detectChanges();
            var slide = new Slide(comp.getInstance());
            slide.index = 0;
            var slide2 = new Slide(comp.getInstance());
            var slide3 = new Slide(comp.getInstance());
            comp.addSlide(slide);
            comp.addSlide(slide2);
            comp.addSlide(slide3);
            comp.scrollTo(0);
            comp["prev"]();
            comp.isFirst = true;
            comp["prev"]();
        });

    }));

    it('on clicking previous, previous slide should open', async(() => {

        fixture.whenStable().then(() => {
            de = fixture.debugElement.query(By.css('a'));
            fixture.detectChanges();
            var slide = new Slide(comp.getInstance());
            slide.index = 0;
            var slide2 = new Slide(comp.getInstance());
            var slide3 = new Slide(comp.getInstance());
            comp.addSlide(slide);
            comp.addSlide(slide2);
            comp.addSlide(slide3);
            comp.scrollTo(0);
            comp["prev"]();
        });

    }));


    it('lastval should be set accurately', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            var slide = new Slide(comp.getInstance());
            slide.index = 0;
            var slide2 = new Slide(comp.getInstance());
            var slide3 = new Slide(comp.getInstance());
            slide.ngOnInit();
            slide.ngOnDestroy();
            comp.addSlide(slide2);
            comp.addSlide(slide3);
            comp.updateLastVal(true);
            expect(comp.isLast).toBeTruthy();
            comp.updateLastVal(false);
            expect(comp.isLast).toBeFalsy();

        });

    }));
    it('update first value should be caaled correctly', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            comp.updateFirstVal(true);
            expect(comp.isFirst).toBeTruthy();
            comp.updateFirstVal(false);
            expect(comp.isFirst).toBeFalsy();
        });

    }));
    it('corousel should hide', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            comp.hideCarousel(true);
            expect(comp.isHide).toBeTruthy();
        });

    }));

});

