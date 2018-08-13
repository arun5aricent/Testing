import { CustomIdentifierDirective } from './../followups/followup-models/customIdentifier.directive';
import { AppConstant } from '../followups/util/util.appconstant';
import { Slide } from '../followups/carousel/slide.component';
import { FollowupListSearchComponent } from '../followups/followup-search/followup-listsearch.component';
import { FollowUpListHeaderComponent } from '../followups/followup-listheader/followup-listheader.component';
import { FollowupListComponent } from '../followups/followup-list/followup-list.component';
import { FollowupsApis } from '../followups/followup-models/followups-apis';
import { FollowUpStatusComponent } from '../followups/followup-status/followup-status.component';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FollowUpService } from '../followups/shared/followup.service';
import { FollowupListToggleComponent } from '../followups/followup-toggle/followup-listtoggle.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, Component } from '@angular/core';
import { Followup} from '../followups/followup-models/followup';
import { FollowUpListNotificationBannerComponent } from '../followups/followup-notification/followup-notification-banner.component';
import { FollowupRes } from '../followups/followup-models/followup-res';
import { LinkyModule } from 'angular-linky';
import { MomentModule } from 'angular2-moment';
import { Daterangepicker, DaterangepickerConfig } from 'ng2-daterangepicker';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { AsyncLoaderComponent } from '../followups/util/util.asyncloader';
import { FollowupConfirmationComponent } from '../followups/followup-confirmation/followup-confirmation.component';
import { PagerService } from '../followups/followup-models/pager.service';
import { FollowupModalComponent } from '../followups/followup-detail/followup-modal.component';
import { Carousel } from '../followups/carousel/carousel.component';
import "./finesse-environment.js";
import { CustomAutofocusDirective } from '../followups/followup-models/customAutofocus.directive';
import { AssociatedTasksComponent } from '../followups/associated-task/associated-tasks.component';
import { TrusteURLPipe } from '../followups/associated-task/trustUrl.pipe';
import { TrustedHTMLPipe } from '../followups/associated-task/trustedHTML.pipe';
import { FormatDatePipe } from '../followups/associated-task/formatDate.pipe';
import { CommentDateFormatPipe } from '../followups/util/util.dateformat-pipe';
import { CustomPaginationComponent } from '../followups/custom-pagination/followup.custompagination.component';
import { ClickStopPropagationDirective } from '../followups/util/util.stopPropogation.directive';
import { CustomMaxLengthPipe } from '../followups/util/util.customMaxLength.pipe';
import { TaskFollowUpDetails } from '../followups/followup-models/followup-taskdetail';

describe('FollowuplistComponent (templateUrl)', () => {

    let comp: FollowupListComponent;
    let fixture: ComponentFixture<FollowupListComponent>;
    let de: DebugElement[];
    let desingle: DebugElement;
    let el: HTMLElement;
    let followUpService: FollowUpService;
    let spyOnGetFollowUps;
    let spyOnGetUIParams;
    let spyOnGetConfiguration;
    let spyOngetSimpleSearch;
    let spyOnGetAssociatedTaskDetails;
    let spyOnGetFollowupDetail;
    let spyOnDeleteInteraction;
    let spyOnUpdateCustomerInfo;

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

    let testQuote: FollowupRes =
        {
            "TotalRecords": 1,
            "isPersonal": false,
            "FollowUpList": [
                {
                    "FollowUpID": "15",
                    "FollowUpStatus": 2,
                    "FollowUpType": 1,
                    "FollowUpLabel": 4,
                    "IsPersonal": false,
                    "ContactID": "",
                    "Owner": "Agent LN26X028",
                    "FollowUpChannel": 3,
                    "FollowUpCompleteDate": "2018-02-19T02:52:21.6818852-05:00",
                    "FirstComment":"firstComment;",
                    "LastComment" :"lastComment;",
                    "TotalComment": "2",
                    "Comments": [],
                    "SkillAddress":"test string",
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
            ]
        }
    let errortestQuote: FollowupRes =
        {
            "TotalRecords": 10,
            "isPersonal": false,
            "FollowUpList": []
        };


    let followUpItem: Followup = {
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

    let searchTestQuote: FollowupRes =
        {
            "TotalRecords": 0,
            "isPersonal": true,
            "FollowUpList": [],

        };

    let taskResponseData = {
        "TaskId": "044e186b-ae44-4c37-8997-80f270faf1e8",
        "ChannelType": 4,
        "ChannelSubType": 150,
        "ContactReason": "",
        "ContactReasonDetail": "",
        "AcceptTime": "2018-02-14T12:52:04+00:00",
        "Interaction": "{\"SubInteractionId\":2,\"viewModelId\":\"\",\"ActiveTab\":true,\"ExternalId\":\"\",\"Comment\":\"\"}",
        "TaskStatus": "ACTIVE",
        "ChannelName": "Email",
        "ChannelIcon": "ui-icon-email-small"
    }

    let followupDetailRes = {
        "Status": false,
        "Message": "Record updated successfully.",
        "data": {
            "UserID": "299",
            "FollowUpChannel": 4,
            "FollowUpCompleteDate": null,
            "TotalComment": 0,
            "Comment": [

            ],
            "Customer": {
                "CustomerName": "",
                "CustomerSourceAddress": "",
                "CustomerDestAddress": "",
                "CustomerNumber": null,
                "ContactId": ""
            },
            "TaskDetail": {
                "FollowUpId": 15,
                "TaskId": "12c6c890-e0d6-11e7-abfe-4dd9ab39ece7",
                "SubInteractionId": 2,
                "ChannelName": "Email",
                "ChannelIcon": "Mail"
            },
            "Notifications": [

            ],
            "FollowUpID": "15",
            "FollowUpStatus": 2,
            "FollowUpType": 1,
            "FollowUpLabel": 4,
            "IsPersonal": false,
            "ContactID": "",
            "Owner": "Agent LN26X028",
            "CustomerName": "",
            "FollowUpCreationDate": "2018-02-19T02:52:21.6818852-05:00",
            "FollowUpDueDate": "2018-03-03T13:28:00+00:00",
            "FollowUpSubject": "Add agent follow up",
            "FollowUpLastModifiedDate": "2018-02-28T08:29:21.6548239-05:00",
            "FollowUpLastModifyUser": "Super LN26X028",
            "Notification": null,
            "OwnerUserID": 299,
            "SkillAddress": "Test String",
            "IsQueued": false
        }
    }

    let followupDetailResLocked = {
        "Status": true,
        "Message": "Record updated successfully.",
        "data": {
            "UserID": "299",
            "FollowUpChannel": 4,
            "FollowUpCompleteDate": null,
            "TotalComment": 0,
            "Comment": [

            ],
            "Customer": {
                "CustomerName": "",
                "CustomerSourceAddress": "",
                "CustomerDestAddress": "",
                "CustomerNumber": null,
                "ContactId": ""
            },
            "TaskDetail": {
                "FollowUpId": 15,
                "TaskId": "12c6c890-e0d6-11e7-abfe-4dd9ab39ece7",
                "SubInteractionId": 2,
                "ChannelName": "Email",
                "ChannelIcon": "Mail"
            },
            "Notifications": [

            ],
            "FollowUpID": "15",
            "FollowUpStatus": 2,
            "FollowUpType": 1,
            "FollowUpLabel": 4,
            "IsPersonal": false,
            "ContactID": "",
            "Owner": "Agent LN26X028",
            "CustomerName": "",
            "FollowUpCreationDate": "2018-02-19T02:52:21.6818852-05:00",
            "FollowUpDueDate": "2018-03-03T13:28:00+00:00",
            "FollowUpSubject": "Add agent follow up",
            "FollowUpLastModifiedDate": "2018-02-28T08:29:21.6548239-05:00",
            "FollowUpLastModifyUser": "Super LN26X028",
            "Notification": null,
            "OwnerUserID": 299,
            "SkillAddress": "Test String",
            "IsQueued": false
        }
    }

    let associatedTaskDetail = {
        "customerBanner": "1234-SudhanshuGupta",
        "selectedTaskDetails": [
            {
                "key": "Accepted",
                "value": "ThuFeb82018, 5: 36AM"
            },
            {
                "key": "AgentDuration",
                "value": "41d00: 41: 12"
            },
            {
                "key": "AgentName",
                "value": "SuperLN26X028"
            },
            {
                "key": "Channel",
                "value": "EmailOutbound"
            },
            {
                "key": "ContactAddress",
                "value": ""
            },
            {
                "key": "ContactID",
                "value": "1234"
            },
            {
                "key": "ContactName",
                "value": "SudhanshuGupta"
            },
            {
                "key": "ContactReason",
                "value": "GeneralInquiry"
            },
            {
                "key": "ContactStartTime",
                "value": "ThuFeb82018, 5: 36AM"
            },
            {
                "key": "ContactType",
                "value": "Other"
            },
            {
                "key": "CriticalSLATime",
                "value": ""
            },
            {
                "key": "DestinationAddress",
                "value": "sudhanshu2.gupta@aricent.com"
            },
            {
                "key": "ElapsedTime"
            },
            {
                "key": "FollowUp",
                "value": "Yes"
            },
            {
                "key": "PhoneNumber",
                "value": "0123456789"
            },
            {
                "key": "Skill",
                "value": ""
            },
            {
                "key": "SLATargetTime",
                "value": ""
            },
            {
                "key": "Status",
                "value": "Parked"
            }
        ],
        "selectedTaskComments": {
            "key": "Comments",
            "value": ""
        },
        "popOutHtmlData": ""
    }

    let associatedTaskMedia = {
        "selectedTaskMedia": [

        ],
        "selectedTaskMediaError": "",
        "isTaskMediaLoading": false
    }

    let createFollowUpPublic = {
        "taskId": "044e186b-ae44-4c37-8997-80f270faf1e8",
        "SubInteractionId": "2",
        "isActive": "ACTIVE",
        "channeltype": 4,
        "CustomerInfo": {
            "ContactId": "",
            "CustomerName": "",
            "CustomerSourceAddress": "sudhanshu.upstream@gmail.com",
            "CustomerDestAddress": "sudhanshu.upstream@gmail.com",
            "CustomerNumber": ""
        },
        "type": "public"
    }
    let createFollowUpPersonal = {
        "taskId": "044e186b-ae44-4c37-8997-80f270faf1e8",
        "SubInteractionId": "2",
        "isActive": "ACTIVE",
        "channeltype": 4,
        "CustomerInfo": {
            "ContactId": "",
            "CustomerName": "",
            "CustomerSourceAddress": "sudhanshu.upstream@gmail.com",
            "CustomerDestAddress": "sudhanshu.upstream@gmail.com",
            "CustomerNumber": ""
        },
        "type": "personal"
    }

    let viewFollowUpData = "{\"FollowUpId\":\"18\",\"taskId\":\"0b1b1a16-15b4-4585-9f6f-49667c894240\",\"interaction\":3}";
    let deleteInteractionResponse = { "Status": true, "Message": "Record deleted successfully", "data": "{\"FollowUpId1\":\"16\",\"FollowUpId3\":\"17\"}" };
    var originalTimeout;
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                NgxPaginationModule,
                CommonModule,
                HttpModule,
                FormsModule,
                LinkyModule,
                MomentModule,
                Daterangepicker,
                ModalModule.forRoot()
            ],
            declarations: [
                FollowupListComponent,
                FollowUpListHeaderComponent,
                FollowupListToggleComponent,
                FollowupListSearchComponent,
                FollowUpListNotificationBannerComponent,
                FollowUpStatusComponent,
                AsyncLoaderComponent,
                FollowupModalComponent,
                Slide,
                Carousel,
                FollowupConfirmationComponent,
                CustomAutofocusDirective,
                CustomIdentifierDirective,
                AssociatedTasksComponent,
                TrusteURLPipe,
                TrustedHTMLPipe,
                FormatDatePipe,
                CommentDateFormatPipe,
                CustomPaginationComponent,
                ClickStopPropagationDirective,
                CustomMaxLengthPipe
            ], // declare the test component
            providers: [FollowUpService, PagerService, FollowupsApis, DaterangepickerConfig]
        })
            .compileComponents();  // compile template and css

    }));
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 2500000;
        fixture = TestBed.createComponent(FollowupListComponent);
        comp = fixture.componentInstance;
        followUpService = fixture.debugElement.injector.get(FollowUpService);
        spyOnGetFollowUps = spyOn(followUpService, 'getFollowUps')
            .and.returnValues(Observable.of(testQuote),
            Observable.throw({ status: 404 }),
            Observable.of(false),
            Observable.of(testQuote),
            Observable.of(testQuote),
            Observable.of(testQuote),
            Observable.of(testQuote),
            Observable.of(testQuote),
            Observable.of(testQuote),
            Observable.of(testQuote),
            Observable.of(errortestQuote),
            Observable.of(testQuote));
        spyOnGetConfiguration = spyOn(followUpService, 'getConfiguration').and.returnValues(Observable.of(configData),
            Observable.of(false),
            Observable.throw({ status: 404 }),
            Observable.of(configData),
            Observable.of(configData),
            Observable.of(configData),
            Observable.of(configData)
        );
        spyOnGetAssociatedTaskDetails = spyOn(followUpService, 'getAssociatedTaskDetails').and.returnValue(Observable.of(taskResponseData));
        spyOnGetFollowupDetail = spyOn(followUpService, 'getFollowupDetail').and.returnValue(Observable.of(followupDetailRes));
        spyOnDeleteInteraction = spyOn(followUpService, 'deleteFollowup').and.returnValues(Observable.of(followupDetailRes),
            Observable.throw({ status: 404 }),
            Observable.of(followupDetailRes),
            Observable.of(followupDetailRes),
            Observable.of(followupDetailRes),
            Observable.of(followupDetailRes),
            Observable.of(followupDetailRes)
        );
        spyOnUpdateCustomerInfo = spyOn(followUpService, 'UpdateCustomerInfo').and.returnValues(Observable.throw({ status: 404 }), Observable.of({}));
        
        fixture.detectChanges();
    });
    afterEach(function () {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it('should change sorting of correct column', () => {
        fixture.detectChanges();
        comp.changeSorting("eDUE_DATE");
        expect(comp.sortingColumn).toContain("eDUE_DATE");
        expect(comp.sortingOrder).toContain("ASC");
        expect(comp.sortingReverse).toBeFalsy();
        comp.changeSorting("eDUE_DATE");
        expect(comp.sortingColumn).toContain("eDUE_DATE");
        expect(comp.sortingOrder).toContain("DESC");
        expect(comp.sortingReverse).toBeTruthy();
        comp.changeSorting("eID");
        expect(comp.sortingColumn).toContain("eID");
        expect(comp.sortingOrder).toContain("DESC");
        expect(comp.sortingReverse).toBeTruthy();
        comp.changeSorting("eID");
        expect(comp.sortingColumn).toContain("eID");
        expect(comp.sortingOrder).toContain("ASC");
        expect(comp.sortingReverse).toBeFalsy();
    });
    

    it('should return correct filter order', () => {
        fixture.detectChanges();
        let testFilter = { "whichFilter": 1, "filterValue": 1 };
        fixture.detectChanges();
        comp.onFilterNotify(testFilter);
        expect(comp.label).toBe(1);
        testFilter = { "whichFilter": 2, "filterValue": 1 };
        comp.onFilterNotify(testFilter);
        expect(comp.status).toBe(1);
        testFilter = { "whichFilter": 3, "filterValue": 1 };
        comp.onFilterNotify(testFilter);
        expect(comp.type).toBe(1);
    });
    it("should return values based on search criteria", () => {
        fixture.detectChanges();
        comp.onSearchNotify("testString");
        expect(comp.data.length).toBeLessThanOrEqual(1);
    })
    it("should display defualt values when search criteria is cleared", () => {
        fixture.detectChanges();
        comp.onClearSearchNotify(true);
        expect(comp.data.length).toBeGreaterThan(0);
    })

    it("should display records of clicked page", () => {
        fixture.detectChanges();
        comp.recordsPerPage = 25;
        comp.pageChange(4);
        expect(comp.offset).toBe(75);
        comp.pageChange(1); 
    })

    it("should show notification", () => {
        fixture.detectChanges();
        comp.showNotification("Test Message", "Notification Type");
        expect(comp.isNotificationVisible).toBeTruthy;
    })
    it("should close notification", () => {
        fixture.detectChanges();
        comp.onNotificationCancel();
        expect(comp.isNotificationVisible).toBeFalsy();
    })
    it("should notifiy to show personal message", () => {
        fixture.detectChanges();
        var filter = { "selectedState": 1, "isQueued": false };
        comp.onNotify(filter);
        expect(comp.isQueued).toBeFalsy();
        expect(comp.selectedState).toBe(1);
    })
    it("offset should be sent to 0 on due date range change", () => {
        fixture.detectChanges();
        let testDueDateRange = { "startDate": "2017-05-18T15:09:48.83", "endDate": "2017-05-18T15:09:48.83" }
        comp.onDueDateRangechangeNotify(true);
        expect(comp.offset).toBeLessThanOrEqual(0);
    })
    it("offset should be sent to 0 on negative page number pass", () => {
        fixture.detectChanges();
        comp.recordsPerPage = 25;
        comp.pageChange(-1);
        expect(comp.offset).toBeLessThanOrEqual(0);
    })
    it("offset should be sent to 0 on refresh click", () => {
        fixture.detectChanges();
        comp.onRefreshClick("Test event","Test data");
        expect(comp.offset).toBeLessThanOrEqual(0);
    })
    it("followup id should be set before opening follow up", () => {
        comp.childModal.configurationData = configData;
        var taskData = { "FollowUpId": 0, "TaskId": "044e186b-ae44-4c37-8997-80f270faf1e8", "SubInteractionId": "2", "ChannelName": "", "ChannelIcon": "" };
        comp.childModal.setTaskDetails(taskData)
        fixture.detectChanges();
        comp.setEditMode(true, 0, true);
        comp.onEditModeSetNotify(null);
        comp.onCreateNewFollowUpNotify(false);
        expect(comp.followupIds.length).toBeGreaterThanOrEqual(0);
    })

    //it("customer info should be updated correctly", () => {
    //    comp.childModal.configurationData = configData;
    //    var taskData = { "FollowUpId": 0, "TaskId": "044e186b-ae44-4c37-8997-80f270faf1e8", "SubInteractionId": "2", "ChannelName": "", "ChannelIcon": "" };
    //    var customerData = { "taskId":"044e186b-ae44-4c37-8997-80f270faf1e8","customer"}
    //    expect(comp.followupIds.length).toBeGreaterThanOrEqual(0);
    //})
    
    it("isUrgentMethod should return false", () => {
        fixture.detectChanges();
        let now = new Date()
        let now1 = new Date().setDate(now.getDate() + 3);
        followUpItem.FollowUpDueDate = new Date(now1).toUTCString();
        expect(comp.isUrgent(followUpItem)).toBeFalsy();
    })
    it("on modal hide currpage method should be called", () => {
        fixture.detectChanges();
        comp.currPage = 1;
        comp.configurationData = configData;
        comp.onModalViewhide()
        expect(comp.offset).toBeLessThanOrEqual(0);
    })
    it("on pagechange items of that page should be displayed", () => {
        fixture.detectChanges();
        comp.configurationData = configData;
        comp.onPageChange(4);
        expect(comp.currPage).toBeCloseTo(4);
    })
    it("user should not be allowed to open follow up when it is locked ", () => {
        fixture.detectChanges();
        comp.onEditModeEnable(followupDetailResLocked);
        expect(comp.isNotificationVisible).toBeTruthy();
        comp.isNotificationVisible = true;
        comp.onEditModeEnable(followupDetailRes);
        expect(comp.isNotificationVisible).toBeFalsy();
        comp.isNotificationVisible = false;
        comp.onEditModeEnable(followupDetailRes);
        expect(comp.isNotificationVisible).toBeFalsy();
    })
    
    it("followup itme should be opened in view mode ", () => {
        fixture.detectChanges();
        var event = { "target": { "id": "view" } }
        comp.onFollowUpListItemClick(event, 0);
        expect(comp.followupIds.length).toBeGreaterThanOrEqual(0);
    })
    it("followup itme should be opened in edit mode ", () => {
        fixture.detectChanges();
        var event = { "target": { "id": "editButton" } }
        comp.onFollowUpListItemClick(event, 0);
        expect(comp.followupIds.length).toBeGreaterThanOrEqual(0);
    })
    it("correct number of days should be displayed ", () => {
        fixture.detectChanges();
        expect(comp.numDaysBetween(new Date(), new Date())).toBeGreaterThanOrEqual(0);
    })

    it("when id is locked on refresh it should be opened", () => {
        sessionStorage.setItem(AppConstant.FOLLOWUP_KEY, "123");
        fixture.detectChanges();
        comp.followupApiRequest();
        comp.followupApiRequest();
        comp.followupApiRequest();
        comp.followupApiRequest();
        comp.followupApiRequest();
        comp.followupApiRequest();
        comp.followupApiRequest();
        comp.followupApiRequest();
        comp.followupApiRequest();
        var event = { "type": "click" }
        comp.openFollowUpInEditMode(event, 0);
    })
    it("error message should be notified ", () => {
        fixture.detectChanges();
        var event = { "message": "Test Message", "type": "Test Type" }
        comp.onErrorMessageNotify(event);
        expect(comp.isNotificationVisible).toBeTruthy();
    })

    it("if user already loadedthen nothing should happen ", () => {
        fixture.detectChanges();
        comp.isUserLoaded = true;
        comp.ngOnInit();
    })
    it("handshake with interaction capture should happen ", () => {
        fixture.detectChanges();
        comp["handShakeWithInteractionCapture"]();
    
    })
    it("on gadget tab activate  ", () => {
        fixture.detectChanges();
        comp["gadgetTabActivated"]();
    })
    it("fetch task details acknowledgment  ", () => {
        fixture.detectChanges();
        comp.onFetchInteractionDetailsAck("Test string", associatedTaskDetail);
    })
    it("fetch task details acknowledgment  ", () => {
        fixture.detectChanges();
        comp.onFetchMediaAck("Test string", associatedTaskMedia);
    })
    it("on fetch media error", () => {
        fixture.detectChanges();
        comp.onFetchMediaError("Test string", associatedTaskMedia);
    })
    it("modal should open while creating new public FollowUp", () => {
        fixture.detectChanges();
        comp.recievedEvent("Test string", createFollowUpPublic);
        var expectedTaskDetail = new TaskFollowUpDetails(0, "044e186b-ae44-4c37-8997-80f270faf1e8", 2, "", "");
        expect(comp.taskDetail.TaskId).toBe(expectedTaskDetail.TaskId);
    })
    it("modal should open while creating new personal FollowUp", () => {
        fixture.detectChanges();
        comp.userId = "299";
        comp.recievedEvent("Test string", createFollowUpPersonal);
        
        var expectedTaskDetail = new TaskFollowUpDetails(0, "044e186b-ae44-4c37-8997-80f270faf1e8", 2, "", "");
        expect(comp.taskDetail.TaskId).toBe(expectedTaskDetail.TaskId);
        comp.userId = "300";
        comp.recievedEvent("Test string", createFollowUpPersonal);
        var expectedTaskDetail = new TaskFollowUpDetails(0, "044e186b-ae44-4c37-8997-80f270faf1e8", 2, "", "");
        expect(comp.taskDetail.TaskId).toBe(expectedTaskDetail.TaskId);
    })
    it("modal should openwhen view button is clicked", () => {
        fixture.detectChanges();
        comp.childModal.configurationData = configData;
        comp.onInteractionChanged("Test String", "Test string");
        comp.viewFollowUp("Test string", viewFollowUpData);
        comp.onInteractionChanged("Test String", "Test string");
        expect(comp.childModal.isOpenedFromActiveTask).toBeTruthy();
    })
    it("on toggling notification button list should be updated", () => {
        fixture.detectChanges();
        comp.onNotification(true);
        expect(comp.isNotify).toBeTruthy();
        comp.onNotification(false);
        expect(comp.isNotify).toBeFalsy();
    })
    it("on selecting overdue daterange filter status filter should become All-Active", () => {
        fixture.detectChanges();
        let testDueDateRange = { "startDate": "2017-05-18T15:09:48.83", "endDate": "2017-05-18T15:09:48.83", "status": 1 };
        comp.onOverDueDateChangeNotify(testDueDateRange);
        expect(comp.status).toBe(1);
    })
    it("on page change by pagination correct page number should be updated", () => {
        fixture.detectChanges();
        comp.onPageChangeByPagination(1);
        expect(comp.currPage).toBe(1);
        comp.totalNumberOfRecords = 60;
        comp.onPageChangeByPagination(1);
        expect(comp.currPage).toBe(1);
        comp.onPageChangeByPagination(2);
        expect(comp.currPage).toBe(2);
    })
    it("correct events should be published", () => {
        fixture.detectChanges();
        comp.onFetchMediaDetialNotify(1);
        comp.onFetchInteractionMediaDetailNotify(21);
    })
    it("show carousel event should create correct array list", () => {
        fixture.detectChanges();
        comp.childModal.configurationData = configData;
        comp.userId = "300";
        var taskRequestData = new TaskFollowUpDetails(0, "044e186b-ae44-4c37-8997-80f270faf1e8", 2, "", "");
        comp.childModal.taskRequestData = taskRequestData;
        var corouselList = { "TaskId": "044e186b-ae44-4c37-8997-80f270faf1e8", "FollowUpIdList": [0, 0, 0, -1, "33"] };
        comp.onShowCarouselEvent("Test String", corouselList);
        expect(comp.followupIds.length).toBe(2);
        comp.taskCompleted("Test String", "Test String");
    })
    it("interaction should be deleted correctly", () => {
        fixture.detectChanges();
        var deletionData = { "FollowUpId": "18", "Index": "4", "taskId": "0b1b1a16-15b4-4585-9f6f-49667c894240" };
        comp.deleteSubInteraction("Test String", deletionData);
        comp.deleteSubInteraction("Test String", deletionData);
    })
    it("modal should be closed on recieving this event", () => {
        comp.closeFollowUpModal("string test", "string test");
        fixture.detectChanges();
        comp.recievedEvent("Test string", createFollowUpPublic);
        comp.childModal.childModal.show();
        comp.closeFollowUpModal("string test", "string test");
    })
    it("modal should be closed on recieving this event", () => {
        comp.closeFollowUpModal("string test", "string test");
        fixture.detectChanges();
        comp.recievedEvent("Test string", createFollowUpPublic);
        comp.childModal.childModal.show();
        comp.closeFollowUpModal("string test", "string test");
    })
    it("modal should be closed on recieving this event", () => {
        fixture.detectChanges();
        var testData = { "taskId":"test task id", "customer":"test string" };
        comp.updateFollowUpCustInfo("Test string", testData);
        comp.updateFollowUpCustInfo("Test string", testData);
    })
    it("confoguration should be fetched correctly", () => {
        fixture.detectChanges();
        comp.getConfiguration("330");
        expect(comp.configurationData.FollowUpTypes.length).toBe(configData.FollowUpTypes.length);
        comp.getConfiguration("330");
        comp.getConfiguration("330");
    })
    it("pager service should run correctly", () => {
        fixture.detectChanges();
        var pagerService = new PagerService();
        var pager = pagerService.getPager(200, 1, 10);
        pager = pagerService.getPager(20, 1, 10);
        pager = pagerService.getPager(200, 8, 10);
        pager = pagerService.getPager(200, 18, 10);
        var pageRange = pagerService.getPageRange(1, 4);
    })
    
});
