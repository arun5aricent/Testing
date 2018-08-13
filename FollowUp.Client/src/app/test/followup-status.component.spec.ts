//import { Observable } from 'rxjs/Observable';
//import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
//import { CommonModule } from '@angular/common';
//import { FollowUpStatusComponent } from '../followups/followup-status/followup-status.component';
//import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
//import { By, BrowserModule } from '@angular/platform-browser';
//import { DebugElement, NgModule, Component } from '@angular/core';
//import { FollowupRes } from '../followups/followup-models/followup-res';
//import { Followup } from '../followups/followup-models/followup';
//describe('FollowUpStatusComponent (templateUrl)', () => {

//    let comp: FollowUpStatusComponent;
//    let fixture: ComponentFixture<FollowUpStatusComponent>;
//    let de;
//    let testData: Followup = {
//        "FollowUpID": "f42bbf40-0b65-40b4-ac46-93bacf12664c",
//        "FollowUpStatus": 1,
//        "FollowUpType": 1,
//        "FollowUpSubject": "Issue with coverage",
//        "FollowUpDueDate": "2017-05-18T15:09:48.83",
//        "CustomerName": "Julius Hammod",
//        "FollowUpCreationDate": "2017-05-18T15:09:48.83",
//        "FollowUpLabel": 1,
//        "FollowUpChannel": "Fax",
//        "FollowUpLastModifiedDate": "2017-05-18T15:09:48.83",
//        "FollowUpCompleteDate": null,
//        "FollowUpLastModifyUser": "Clubb ",
//        "FirstComment": "Test Comment 1",
//        "LastComment": "Test Comment 2",
//        "TotalComment": "1",
//        "ContactID": "318047",
//        "IsPersonal": true,
//        "Owner": "Sunil",
//        "Comments": [{
//            "CommentDesc": "Test Comment",
//            "CommentDate": "3017-05-18T15:09:48.83",
//            "CommentUser": "Jed"
//        }],
//        "SkillAddress": "Skill 1"
//    }
//    let configData = {
//        "Labels": [
//            {
//                "LabelID": 1,
//                "Description": "#ffffff",
//                "LabelName": "No Label"
//            },
//            {
//                "LabelID": 2,
//                "Description": "#7ae7bf",
//                "LabelName": "Mint"
//            },
//            {
//                "LabelID": 3,
//                "Description": "#fbd75b",
//                "LabelName": "Yellow"
//            },
//            {
//                "LabelID": 4,
//                "Description": "#ffb878",
//                "LabelName": "Orange"
//            },
//            {
//                "LabelID": 5,
//                "Description": "#dbadff",
//                "LabelName": "Pink"
//            },
//            {
//                "LabelID": 6,
//                "Description": "#8f7ce2",
//                "LabelName": "Purple"
//            },
//            {
//                "LabelID": 7,
//                "Description": "#46d6db",
//                "LabelName": "Teal"
//            }
//        ],
//        "Status": [
//            {
//                "StatusID": 1,
//                "Description": "New"
//            },
//            {
//                "StatusID": 2,
//                "Description": "InProgress"
//            },
//            {
//                "StatusID": 3,
//                "Description": "Complete"
//            }
//        ],
//        "Types": [
//            {
//                "TypeID": 1,
//                "Description": "Billing"
//            },
//            {
//                "TypeID": 3,
//                "Description": "Sales"
//            },
//            {
//                "TypeID": 4,
//                "Description": "Shipping"
//            }
//        ]
//    }
//    let el: HTMLElement;
//    beforeEach(() => {

//        TestBed.configureTestingModule({
//            imports: [
//                CommonModule,
//                HttpModule,
//                FormsModule
//            ],
//            declarations: [
//                FollowUpStatusComponent,
//            ], // declare the test component

//        })
//            .compileComponents() // compile template and css
//    });
//    beforeEach(() => {
//        fixture = TestBed.createComponent(FollowUpStatusComponent);
//        comp = fixture.componentInstance;
//        comp.configurationData = configData;
//        comp.datum = testData;
//        fixture.detectChanges();
//    });



//    it('should show due date is not near', async(() => {

//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            var testDate = new Date().setDate(new Date().getDate() + 9);
//            comp.datum.FollowUpDueDate = new Date(testDate).toUTCString();
//            expect(comp.isUrgent()).toBeFalsy();
//        });

//    }));
//    it('should show due date is not near', async(() => {

//        fixture.whenStable().then(() => {
//            testData.FollowUpDueDate = new Date().toDateString();
//            comp.datum = testData;
//            fixture.detectChanges();
//            expect(comp.isUrgent()).toBeTruthy();
//        });
//    }));

//    it('should provide correct difference betweeen the two dates', async(() => {

//        fixture.whenStable().then(() => {
//            testData.FollowUpDueDate = new Date().toDateString();
//            expect(comp.numDaysBetween(new Date(), new Date())).toBe(0);

//        });
//    }));

//    it('should provide correct label name to be displayed', async(() => {

//        fixture.whenStable().then(() => {
//            expect(comp.getSelectedLabel()).toBe("No Label");

//        });
//    }));

//    it('should provide correct label color to be displayed', async(() => {

//        fixture.whenStable().then(() => {
//            expect(comp.getSelectedLabelColor()).toBe("#ffffff");
//        });
//    }));
//});

