import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FollowUpStatusComponent } from '../followups/followup-status/followup-status.component';
import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, Component } from '@angular/core';
import { FollowupRes } from '../followups/followup-models/followup-res';
import { Followup } from '../followups/followup-models/followup';
describe('FollowUpStatusComponent (templateUrl)', () => {

    let comp: FollowUpStatusComponent;
    let fixture: ComponentFixture<FollowUpStatusComponent>;
    let de;
    let testData: Followup = {
        "FollowUpID": "15",
        "FollowUpStatus": 2,
        "FollowUpType": 1,
        "FollowUpLabel": 4,
        "IsPersonal": false,
        "ContactID": "",
        "Owner": "Agent LN26X028",
        "FollowUpChannel": 3,
        "FollowUpCompleteDate": "2018-02-19T02:52:21.6818852-05:00",
        "FirstComment": "firstComment;",
        "LastComment": "lastComment;",
        "TotalComment": "2",
        "Comments": [],
        "SkillAddress": "test string",
        "CustomerName": "",
        "FollowUpCreationDate": "2018-02-19T02:52:21.6818852-05:00",
        "FollowUpDueDate": "2018-03-03T13:28:00+00:00",
        "FollowUpSubject": "Add agent follow up",
        "FollowUpLastModifiedDate": "2018-02-28T08:29:21.6548239-05:00",
        "FollowUpLastModifyUser": "Super LN26X028",
        "Notification": [

        ],
        "OwnerUserID": 299
    }
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
    let el: HTMLElement;
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                HttpModule,
                FormsModule
            ],
            declarations: [
                FollowUpStatusComponent,
            ], // declare the test component

        })
            .compileComponents() // compile template and css
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(FollowUpStatusComponent);
        comp = fixture.componentInstance;
        comp.datum = testData;
        comp.UIParams = {};
        comp.configurationData = configData;
        fixture.detectChanges();
    });



    it('should show due date is not near', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(comp.isUrgent()).toBeFalsy();
        });

    }));
    it('should show due date is not near', async(() => {

        fixture.whenStable().then(() => {
            testData.FollowUpDueDate=new Date().toDateString();
            comp.datum=testData;
            fixture.detectChanges();
            expect(comp.isUrgent()).toBeTruthy();
        });

    }));
    
    it('should show due date is not near', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            comp.datum=testData;
            comp.datum.FollowUpLabel=1
            expect(comp.getSelectedLabel()).toContain("LabelNoLabel");
            comp.datum.FollowUpLabel= 2
            expect(comp.getSelectedLabel()).toContain("LabelMint");
            comp.datum.FollowUpLabel=3
            expect(comp.getSelectedLabel()).toContain("LabelYellow");
            comp.datum.FollowUpLabel=4
            expect(comp.getSelectedLabel()).toContain("LabelOrange");
        });

    }));

    it('correct label color should be returned', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            comp.datum = testData;
            comp.datum.FollowUpLabel = 1
            expect(comp.getSelectedLabelColor()).toContain("#ffffff");
            comp.datum.FollowUpLabel = 2
            expect(comp.getSelectedLabelColor()).toContain("#7ae7bf");
            comp.datum.FollowUpLabel = 3
            expect(comp.getSelectedLabelColor()).toContain("#fbd75b");
            comp.datum.FollowUpLabel = 4
            expect(comp.getSelectedLabelColor()).toContain("#ffb878");
        });

    }));
});

