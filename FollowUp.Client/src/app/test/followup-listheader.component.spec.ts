import { AppConstant } from './../followups/util/util.appconstant';
import { FollowupsApis } from '../followups/followup-models/followups-apis';
import { FollowUpService } from '../followups/shared/followup.service';
import { FollowUpStatusComponent } from '../followups/followup-status/followup-status.component';
import { FollowUpListNotificationBannerComponent } from '../followups/followup-notification/followup-notification-banner.component';
import { FollowupListSearchComponent } from '../followups/followup-search/followup-listsearch.component';
import { FollowupListToggleComponent } from '../followups/followup-toggle/followup-listtoggle.component';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FollowUpListHeaderComponent } from '../followups/followup-listheader/followup-listheader.component';
import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, Component } from '@angular/core';
import { FollowupRes } from '../followups/followup-models/followup-res';
import { Notification } from '../followups/followup-models/notification';
import { Daterangepicker, DaterangepickerConfig } from 'ng2-daterangepicker';
describe('FollowUpHeaderComponent (templateUrl)', () => {

    let comp: FollowUpListHeaderComponent;
    let fixture: ComponentFixture<FollowUpListHeaderComponent>;
    let de: DebugElement;
    let deArray: DebugElement[];
    let el: HTMLElement;
    let configData = {
        "Labels": [
            {
                "LabelID": 1,
                "Description": "#ffffff",
                "LabelName": "LabelNoLabel"
            },
            {
                "LabelID": 2,
                "Description": "#7ae7bf",
                "LabelName": "LabelMint"
            },
            {
                "LabelID": 3,
                "Description": "#fbd75b",
                "LabelName": "LabelYellow"
            },
            {
                "LabelID": 4,
                "Description": "#ffb878",
                "LabelName": "LabelOrange"
            },
            {
                "LabelID": 5,
                "Description": "#dbadff",
                "LabelName": "LabelPink"
            },
            {
                "LabelID": 6,
                "Description": "#8f7ce2",
                "LabelName": "LabelPurple"
            },
            {
                "LabelID": 7,
                "Description": "#46d6db",
                "LabelName": "LabelTeal"
            }
        ],
        "Status": [
            {
                "StatusID": 1,
                "Description": "StatusActivePending"
            },
            {
                "StatusID": 2,
                "Description": "StatusActiveInProgress"
            },
            {
                "StatusID": 3,
                "Description": "StatusCompleted"
            }
        ],
        "FollowUpTypes": [
            {
                "FollowUpTypeId": 3,
                "Name": "Add new type",
                "Description": "",
                "Active": true
            },
            {
                "FollowUpTypeId": 4,
                "Name": "Followup type having a big name to test bottom scr",
                "Description": "",
                "Active": true
            },
            {
                "FollowUpTypeId": 1,
                "Name": "Type 1",
                "Description": "asd",
                "Active": true
            },
            {
                "FollowUpTypeId": 2,
                "Name": "Type 2",
                "Description": "asdasd",
                "Active": true
            }
        ],
        "UserFollowUpTypes": [
            {
                "UserId": 0,
                "FollowUpTypeId": 4,
                "Name": "Followup type having a big name to test bottom scr"
            },
            {
                "UserId": 0,
                "FollowUpTypeId": 1,
                "Name": "Type 1"
            },
            {
                "UserId": 0,
                "FollowUpTypeId": 2,
                "Name": "Type 2"
            }
        ],
        "States": [
            {
                "StateID": 0,
                "Description": "Public"
            },
            {
                "StateID": 1,
                "Description": "Personal"
            }
        ]
    }

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                HttpModule,
                FormsModule,
                Daterangepicker
            ],
            declarations: [
                FollowUpListHeaderComponent,
                FollowupListToggleComponent,
                FollowupListSearchComponent,
                FollowUpListNotificationBannerComponent,
                FollowUpStatusComponent
            ], // declare the test component
            providers: [FollowUpService, FollowupsApis, DaterangepickerConfig]
        })
            .compileComponents() // compile template and css
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(FollowUpListHeaderComponent);
        comp = fixture.componentInstance;
        comp.configurationData = configData;
        comp.ngOnInit();
        fixture.detectChanges();
    });
    it('state change event should be notified to main component', () => {
            de = fixture.debugElement.query(By.css('select'));
            comp.notify.subscribe((value: string) => value = "Public");
            fixture.detectChanges();
            de.triggerEventHandler('notify', true);
            comp.onStateChange("Public");
            expect(comp.reloadToggleView).toBeFalsy();
            comp.notify.subscribe((value: string) => value = "Public");
            fixture.detectChanges();
            de.triggerEventHandler('notify', true);
            comp.onStateChange("Personal");
            expect(comp.reloadToggleView).toBeFalsy();
            comp.notify.subscribe((value: string) => value = "Queued");
            fixture.detectChanges();
            comp.onStateChange("Queued");
            expect(comp.reloadToggleView).toBeFalsy();
            de.triggerEventHandler('notify', true);
     
    });
    it('search event should be notified to main component',() => {
        
            fixture.detectChanges();
            de = fixture.debugElement.query(By.css('followup-search'));
            comp.searchNotify.subscribe((value: string) => value = "test search");
            fixture.detectChanges();
            comp.onSearchNotify("test search");
            de.triggerEventHandler('searchNotify', true);
        
    });

    it('filter event should be notified to main component', () => {

       
            fixture.detectChanges();
            var filter = { "whichFilter": 2, "filterValue": 1 };
            comp.filterNotify.subscribe((value: any) => value = filter);
            comp.onChange(0, 2);
            expect(comp.selectedStatus).toBe(0);
            comp.onChange(0, 3);
            expect(comp.selectedType).toBe(0);
    });

    it('clear search event should be notified to main component', () => {
        
            fixture.detectChanges();
            de = fixture.debugElement.query(By.css('followup-search'));
            comp.clearSearchNotify.subscribe((value: boolean) => value = true);
            comp.onClearSearchNotify(true);
            de.triggerEventHandler('clearSearchNotify', true);
       
    });

    it('all filters should be set to default',() => {

        
            fixture.detectChanges();
            comp.setDefaultFilterValues();
            expect(comp.selectedLabel).toContain("All");
            expect(comp.selectedStatus).toBe(AppConstant.ALL);
            expect(comp.selectedType).toBe(AppConstant.ALL);
            expect(comp.reloadToggleView).toBeTruthy();
      

    });
    it('notification for default filters should be send', () => {

      
            fixture.detectChanges();
            comp.sendNotificationForDefaultFilters();
     

    });
    it('search box should be empty',() => {

       
            fixture.detectChanges();
            comp.emptySearchBox();
            expect(comp['followUpListSearchComponent']._isSearchBoxEmpty).toBeTruthy();
     

    });
    it('correct label values should be set', () => {
            fixture.detectChanges();
            comp.onLabelChange('No Label', '#ffffff', 1);
            expect(comp.selectedLabel).toContain("No Label");
            expect(comp.selectedLabelColor).toContain("#ffffff");
       

    });
    it('create new followup event should be notified', () => {
            fixture.detectChanges();
            comp.onCreateNewNotify(true);
      
    });
    it('on toggle notify event should be called', () => {
        fixture.detectChanges();
        comp.onNotify(true);
        expect(comp.reloadToggleView).toBe(false);
    });
    it('active followup types should get', () => {
        fixture.detectChanges();
        comp.activeFUTypes = [];
        comp.updateActiveFUTypes();
        expect(comp.activeFUTypes.length).toBe(4);
        comp.configurationData.FollowUpTypes = undefined;
        comp.updateActiveFUTypes();
    });
    it('calendar events should be handled properly', () => {
        fixture.detectChanges();
        comp.calendarEventsHandler(null);
        var currentDate = new Date();
        var value = { "picker": { "chosenLabel": "Today", "endDate": { "_d": new Date() }, "startDate": { "_d": new Date() } } }
        comp.applyDateRange(value, 1);
        expect(comp.dueDateValue).toContain("Today");
        var value1 = { "picker": { "chosenLabel": AppConstant.CUSTOME_RANGE_KEY, "endDate": { "_d": new Date(), format(string) { return new Date().getFullYear(); } }, "startDate": { "_d": new Date(), format(string) { return new Date().getFullYear(); } } } }
        comp.applyDateRange(value1, 1);
        expect(comp.dueDateValue).toContain("Custom Range");
        var value2 = { "picker": { "chosenLabel": "All", "endDate": { "_d": new Date() }, "startDate": { "_d": new Date() } } }
        comp.applyDateRange(value2, 1);
        expect(comp.dueDateValue).toContain("All");
        var value4 = { "picker": { "chosenLabel": "Overdue", "endDate": { "_d": new Date() }, "startDate": { "_d": new Date() } } }
        comp.applyDateRange(value4, 1);
        expect(comp.dueDateValue).toContain("Overdue");
        var value3 = { "picker": { "chosenLabel": "Custom", "endDate": { "_d": new Date(), format(string) { return new Date().getFullYear(); } }, "startDate": { "_d": new Date(), format(string) { return new Date().getFullYear(); } } } }
        comp.applyDateRange(value3, 1);
    });

});

