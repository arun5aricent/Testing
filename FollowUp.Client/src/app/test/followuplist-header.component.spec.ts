//import { FollowupsApis } from '../followups/followup-models/followups-apis';
//import { FollowUpService } from "../followups/shared/followup.service";
//import { FollowUpStatusComponent } from '../followups/followup-status/followup-status.component';
//import { FollowUpListNotificationBannerComponent } from '../followups/followup-notification/followup-notification-banner.component';
//import { FollowupListSearchComponent } from '../followups/followup-search/followup-listsearch.component';
//import { FollowupListToggleComponent } from '../followups/followup-toggle/followup-listtoggle.component';
//import { Observable } from 'rxjs/Observable';
//import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
//import { CommonModule } from '@angular/common';
//import { FollowUpListHeaderComponent } from '../followups/followup-listheader/followup-listheader.component';
//import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
//import { By, BrowserModule } from '@angular/platform-browser';
//import { DebugElement, NgModule, Component } from '@angular/core';
//import { FollowupRes } from '../followups/followup-models/followup-res';
//import { Notification } from '../followups/followup-models/notification';
//import { Daterangepicker,DaterangepickerConfig} from 'ng2-daterangepicker';
//describe('FollowUpHeaderComponent (templateUrl)', () => {

//    let comp: FollowUpListHeaderComponent;
//    let fixture: ComponentFixture<FollowUpListHeaderComponent>;
//    let de: DebugElement;
//    let deArray: DebugElement[];
//    let el: HTMLElement;

//    beforeEach(() => {

//        TestBed.configureTestingModule({
//            imports: [
//                CommonModule,
//                HttpModule,
//                FormsModule,
//                Daterangepicker
//            ],
//            declarations: [
//                FollowUpListHeaderComponent,
//                FollowupListToggleComponent,
//                FollowupListSearchComponent,
//                FollowUpListNotificationBannerComponent,
//                FollowUpStatusComponent
//            ], // declare the test component
//            providers: [FollowUpService, FollowupsApis,DaterangepickerConfig]
//        })
//            .compileComponents() // compile template and css
//    });
//    beforeEach(() => {
//        fixture = TestBed.createComponent(FollowUpListHeaderComponent);
//        comp = fixture.componentInstance;

//        fixture.detectChanges();
//    });
//    it('personal toogle event should be notified to main component', async(() => {

//        fixture.whenStable().then(() => {
//            de = fixture.debugElement.query(By.css('followup-toggle-switch'));
//            comp.notify.subscribe((value: boolean) => value = true);
//            fixture.detectChanges();
//            de.triggerEventHandler('notify', "true");
//            comp.onNotify(true);
//            expect(comp.reloadToggleView).toBeFalsy();
//            de.triggerEventHandler('notify', "true");
//            comp.onNotify(true);
//            expect(comp.reloadToggleView).toBeFalsy();
//        });


//    }));
//    it('search event should be notified to main component', async(() => {
//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            de = fixture.debugElement.query(By.css('followup-search'));
//            comp.searchNotify.subscribe((value: string) => value = "test search");
//            fixture.detectChanges();
//            de.triggerEventHandler('searchNotify', "test search");
//            comp.onSearchNotify("test search");
//            de.triggerEventHandler('searchNotify', true);
//        });
//    }));
//    it('clear search event should be notified to main component', async(() => {
//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            de = fixture.debugElement.query(By.css('followup-search'));
//            comp.clearSearchNotify.subscribe((value: boolean) => value = true);
//            comp.onClearSearchNotify(true);
            
//            de.triggerEventHandler('clearSearchNotify', true);
            
//        });
//    }));
   

   
//    it('filter event should be notified to main component', async(() => {

//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            var filter = { "whichFilter": 2, "filterValue": "All" };
//            comp.filterNotify.subscribe((value: any) => filter = value);
//            comp.onChange(0,2);
//            de.triggerEventHandler('filterNotify', true);
//        });


//    }));
//    it('all filters should be set to default', async(() => {

//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            comp.setDefaultFilterValues();
//           expect(comp.selectedLabel).toContain("All");
//           expect(comp.selectedStatus).toContain("All");
//           expect(comp.selectedType).toContain("All");
//           expect(comp.reloadToggleView).toBeTruthy();
//        });

//    }));
//    it('notification for default filters should be send', async(() => {

//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            comp.sendNotificationForDefaultFilters();
//           de.triggerEventHandler('filterNotify', true);
//        });

//    }));
//    it('search box should be empty', async(() => {

//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            comp.emptySearchBox();
//        });

//    }));
//    it('correct label values should be set', async(() => {

//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            comp.onLabelChange('All','#ffffff','All');
//            expect(comp.selectedLabel).toContain("All");
//            expect(comp.selectedLabelColor).toContain("#ffffff");
//             de.triggerEventHandler('filterNotify', true);
//        });

//    }));
//    it('create new followup event should be notified', async(() => {

//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            comp.onCreateNewNotify(true);
//            de.triggerEventHandler('createNewFollowUpNotify', true);
//        });

//    }));
//    it('calendar events should be handled properly', async(() => {

//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            comp.calendarEventsHandler(null);
//            comp.cancelDateRangeEvent(null,null);
//            var currentDate=new Date
//            var value={"picker":{"chosenLabel":"Today","endDate":{"_d":new Date()},"startDate":{"_d":new Date()}}}
//            comp.applyDateRange(value,1);
//            expect(comp.dueDateValue).toContain("Today");
//            de.triggerEventHandler('dueDateRangechangeNotify', true);
//    });

//    }));


//});

