import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FollowUpService } from '../followups/shared/followup.service';
import { FollowupListSearchComponent } from '../followups/followup-search/followup-listsearch.component';
import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, Component } from '@angular/core';
import { FollowupRes } from '../followups/followup-models/followup-res';
describe('FollowuplistComponent (templateUrl)', () => {

    let comp: FollowupListSearchComponent;
    let fixture: ComponentFixture<FollowupListSearchComponent>;
    let de;
    let el: HTMLElement;
    let followUpService: FollowUpService;
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                HttpModule,
                FormsModule
            ],
            declarations: [
                FollowupListSearchComponent,
            ], // declare the test component
            providers: [FollowUpService]
        })
            .compileComponents() // compile template and css
            .then(() => {
                fixture = TestBed.createComponent(FollowupListSearchComponent);
                comp = fixture.componentInstance;
                fixture.detectChanges();
                de = fixture.debugElement.query(By.css('input'));
            });
    }));



    it('should emit event for notification clear', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            comp._isSearchBoxEmpty = false;
            de = fixture.debugElement.query(By.css('.followup-icon'));
            comp.clearSearchNotify.subscribe((value: boolean) => value = true);
            de.triggerEventHandler('click', null);
            comp.notifyClearButtonClicked();
            expect(comp._isSearchBoxEmpty).toBeTruthy();
            comp.clearSearchText = true;
            expect(comp._isSearchBoxEmpty).toBeTruthy();
        });

    }));
    it('should update string search on key down', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            comp._isSearchBoxEmpty = false;
            de = fixture.debugElement.query(By.css('input'));
            comp.searchNotify.subscribe((value: string) => value = "testValue");
            de.triggerEventHandler('keyup', null);
            expect(comp.searchValue).toBe("");
            var event = { "keyCode": 10 };
            comp.onKey(event, "TestValue")
            expect(comp.searchValue).toBe("TestValue");
        });

    }));

    it('should set searchvalue to blank', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            comp._isSearchBoxEmpty = false;
            comp.clearSearchNotify.subscribe((value: boolean) => value = true);
            expect(comp.searchValue).toBe("");
            var event = { "keyCode": 10 };
            comp.onKey(event, "")
            expect(comp.searchValue).toBe("");
        });

    }));
    it('should handle enter key pressed event accurately', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            var event = { "keyCode": 13 };
            comp.onKey(event, "testValue")
            expect(comp.searchValue).toBe("testValue");
            comp.onEnterKeyPressed("");
            expect(comp._isSearchBoxEmpty).toBeTruthy();
            comp.onEnterKeyPressed("test");
            expect(comp._isSearchBoxEmpty).toBeFalsy();
            expect(comp.searchValue).toBe("test");
        });

    }));

    it('search box should be cleared', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            comp.emptySearchBox();
            expect(comp.searchValue).toBe("");
            expect(comp._isSearchBoxEmpty).toBeTruthy();
        });

    }));

});
