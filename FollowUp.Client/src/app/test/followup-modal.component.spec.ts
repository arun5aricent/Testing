import { FollowUpService } from './../followups/shared/followup.service';
import { FollowupCommentRes } from '../followups/followup-models/followup-comment-res';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FollowupModalComponent } from '../followups/followup-detail/followup-modal.component';
import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, Component, KeyValueDiffers } from '@angular/core';
import { FollowupRes } from '../followups/followup-models/followup-res';
import { LinkyModule } from 'angular-linky';
import { MomentModule } from 'angular2-moment';
import { Daterangepicker, DaterangepickerConfig, DaterangePickerComponent } from 'ng2-daterangepicker';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { Slide } from '../followups/carousel/slide.component';
import { Carousel } from '../followups/carousel/carousel.component';
import { FollowupConfirmationComponent } from '../followups/followup-confirmation/followup-confirmation.component';
import { FollowupDetailRes } from '../followups/followup-models/followup-detail-res';
import { FollowupDetail } from '../followups/followup-models/followup-detail';
import { FollowUpModel } from '../followups/followup-models/followup-model';
import { FollowUpFilter } from '../followups/followup-models/followup-filters';
import { Followup } from '../followups/followup-models/followup';
import { FollowupUser } from '../followups/followup-models/followup-user';
import { Customer } from '../followups/followup-models/customer';
import { FollowUpInsert } from '../followups/followup-models/followup-insert';
import { FollowupsApis } from '../followups/followup-models/followups-apis';
import { AsyncLoaderComponent } from '../followups/util/util.asyncloader';
import { AppConstant } from '../followups/util/util.appconstant';
import { TrusteURLPipe } from '../followups/associated-task/trustUrl.pipe';
import { TrustedHTMLPipe } from '../followups/associated-task/trustedHTML.pipe';
import { FormatDatePipe } from '../followups/associated-task/formatDate.pipe';
import { CommentDateFormatPipe } from '../followups/util/util.dateformat-pipe';
import { CustomPaginationComponent } from '../followups/custom-pagination/followup.custompagination.component';
import { ClickStopPropagationDirective } from '../followups/util/util.stopPropogation.directive';
import { CustomMaxLengthPipe } from '../followups/util/util.customMaxLength.pipe';
import { TaskFollowUpDetails } from '../followups/followup-models/followup-taskdetail';
import "./finesse-environment.js";
import { CustomAutofocusDirective } from '../followups/followup-models/customAutofocus.directive';
import { AssociatedTasksComponent } from '../followups/associated-task/associated-tasks.component';
import { CustomIdentifierDirective } from './../followups/followup-models/customIdentifier.directive';
import { UserFollowUpTypes } from './../followups/followup-models/followup-user-types';
import { FollowUpNotification } from './../followups/followup-models/followup-notification';
import { TaskChannelMap } from '../followups/followup-models/task-channel-map';
describe('FollowupModalComponent (templateUrl)', () => {

    let comp: FollowupModalComponent;
    let fixture: ComponentFixture<FollowupModalComponent>;
    let de;
    let el: HTMLElement;
    let followUpService: FollowUpService;
    let spyOnGetFollowUpDetail;
    let spyOnGetFollowUps;
    let spyonrReqSetFollowUpEditMode;
    let spyOnSaveFollowUp;
    let spyOnReqUpdateFollowUp;
    let spyOnqueueAnyTask;
    let spyOnGetFollowupComment;
    let spyOnreqRefreshFollowUpEditMode;
    let spyOngGetListofSkills;

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
              {
                "NotificationType": "eCompleteDate",
                "NotificationValue": null,
                "NotificationStatus": 0
              },
              {
                "NotificationType": "eCustomeDate",
                "NotificationValue": "2018-08-14T04:00:00+00:00",
                "NotificationStatus": 0
              },
              {
                "NotificationType": "eDueDate",
                "NotificationValue": "2018-08-15T09:20:00+00:00",
                "NotificationStatus": 0
              }
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

    let commentRes: FollowupCommentRes = {
        "Comments": [{
            "CommentDesc": "Test Comment",
            "CommentDate": "2017-05-18T15:09:48.83",
            "CommentUser": "Jed"
        }],
    }
    let errortestQuote = {
        "Status": true,
        "Message": "No error message",
        "data": {
            "FollowUp": {
                "UserID": 330,
                "FollowUpChannel": 4,
                "FollowUpCompleteDate": null,
                "TotalComment": 1,
                "Comment": [{
                    "CommentDesc": "Test Comment",
                    "CommentDate": "2017-05-18T15:09:48.83",
                    "CommentUser": "Jed"
                }],
                "Customer": {
                    "ContactID": "123",
                    "CustomerName": "Test Name",
                    "CustomerAddress": "Test Address",
                    "CustomerMailId": "abc@gmail.com",
                    "CustomerNumber": "9999999999"
                },
                "TaskDetail": {
                    "FollowUpId": 34,
                    "TaskId": "0b1b1a16-15b4-4585-9f6f-49667c894240",
                    "SubInteractionId": 4
                },
                "FollowUpID": "1234",
                "FollowUpStatus": 1,
                "FollowUpType": 4,
                "FollowUpLabel": 2,
                "IsPersonal": false,
                "ContactID": null,
                "Owner": "Super LN26X028",
                "CustomerName": null,
                "FollowUpCreationDate": new Date().toUTCString(),
                "FollowUpDueDate": new Date().toUTCString(),
                "FollowUpSubject": "asdasdsad",
                "FollowUpLastModifiedDate": "0001-01-01T00:00:00+00:00",
                "FollowUpLastModifyUser": "330",
                "Notification": null,
                "OwnerUserID": 0
            },
        },

    };
    let testQuote = {
        "Status": false,
        "Message": "Record updated successfully.",
        "data": {
            "FollowUp": {
                "UserID": 330,
                "FollowUpChannel": 4,
                "FollowUpCompleteDate": null,
                "TotalComment": 1,
                "Comment": [{
                    "CommentDesc": "Test Comment",
                    "CommentDate": "2017-05-18T15:09:48.83",
                    "CommentUser": "Jed"
                }],
                "Customer": {
                    "ContactID": "123",
                    "CustomerName": "Test Name",
                    "CustomerAddress": "Test Address",
                    "CustomerMailId": "abc@gmail.com",
                    "CustomerNumber": "9999999999"
                },
                "TaskDetail": {
                    "FollowUpId": 34,
                    "TaskId": "0b1b1a16-15b4-4585-9f6f-49667c894240",
                    "SubInteractionId": 4
                },
                "FollowUpID": "1234",
                "FollowUpStatus": 1,
                "FollowUpType": 4,
                "FollowUpLabel": 2,
                "IsPersonal": false,
                "ContactID": null,
                "Owner": "Super LN26X028",
                "CustomerName": null,
                "FollowUpCreationDate": new Date().toUTCString(),
                "FollowUpDueDate": new Date().toUTCString(),
                "FollowUpSubject": "asdasdsad",
                "FollowUpLastModifiedDate": "0001-01-01T00:00:00+00:00",
                "FollowUpLastModifyUser": "330",
                "Notification": [],
                "OwnerUserID": 0
            },
        }
    }
    let testQuote1: FollowupRes =
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
                      {
                        "NotificationType": "eCompleteDate",
                        "NotificationValue": null,
                        "NotificationStatus": 0
                      },
                      {
                        "NotificationType": "eCustomeDate",
                        "NotificationValue": "2018-08-14T04:00:00+00:00",
                        "NotificationStatus": 0
                      },
                      {
                        "NotificationType": "eDueDate",
                        "NotificationValue": "2018-08-15T09:20:00+00:00",
                        "NotificationStatus": 0
                      }
                    ],
                    "OwnerUserID": 299
                }
            ]
        };

    let followupFilter: FollowUpFilter = {
        "isPersonal": 0,
        "offset": 0,
        "recordsPerPage": 25,
        "label": 0,
        "status": 0,
        "type": 0,
        "sortingColumn": "eDue_Date",
        "sortingOrder": "ASC",
        "textSearch": "string",
        "startDueDate": new Date().toUTCString(),
        "endDueDate": new Date().toUTCString(),
        "userID": 2,
        "isNotify":true
    }

    let messageObject: Object = {
        "Message": "test Message"
    }
    let customerInfo = {
        "CustomerName": "",
        "CustomerSourceAddress": "",
        "CustomerDestAddress": "",
        "CustomerNumber": null,
        "ContactId": ""
  }

  let testDraftData = {
    "FollowUpDetails": {
      "FollowUpSubject": "",
      "FollowUpComment": "",
      "IsPersonal": true,
      "IsOpen": false,
      "AgentId": 330,
      "Owner": "Super LN26X029",
      "FollowUpDueDate": "Fri, 10 Aug 2018 11:23:07 GMT",
      "FollowUpType": -1,
      "FollowUpLabel": 1,
      "TaskDetail": {
        "FollowUpId": 0,
        "TaskId": "DraftTestId",
        "SubInteractionId": "1",
        "ChannelName": "",
        "ChannelIcon": ""
      },
      "ChannelType": 4,
      "CustomerInfo": {
        "CustomerDestAddress": "",
        "ContactId": "",
        "CustomerName": "",
        "CustomerSourceAddress": "",
        "CustomerNumber": ""
      },
      "Notifications": [

          {
              "NotificationType": "eCompleteDate",
              "NotificationValue": null,
              "NotificationStatus": 0
          },
          {
              "NotificationType": "eCustomeDate",
              "NotificationValue": "2018-08-14T04:00:00+00:00",
              "NotificationStatus": 0
          },
          {
              "NotificationType": "eDueDate",
              "NotificationValue": "2018-08-15T09:20:00+00:00",
              "NotificationStatus": 0
          }
      ],
      "customNotificationDate": "Fri, 10 Aug 2018 11:23:07 GMT"
    },
    "FollowUpId": "DraftTestId0",
    "TimeStamp": "Fri, 10 Aug 2018 11:23:07 GMT"
  }
    let listOfSkills = "Skill1, Skill2";
    var originalTimeout;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                HttpModule,
                FormsModule,
                LinkyModule,
                MomentModule,
                Daterangepicker,
                ModalModule.forRoot()
            ],
            declarations: [
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
                ClickStopPropagationDirective,
                CustomMaxLengthPipe
            ], // declare the test component
            providers: [FollowUpService, FollowupsApis, DaterangepickerConfig]
        })
            .compileComponents() // compile template and css
    }));
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 2500000;
        fixture = TestBed.createComponent(FollowupModalComponent);
        comp = fixture.componentInstance;
        comp.configurationData = configData;
        comp.taskRequestData = { "FollowUpId": 0, "TaskId": "044e186b-ae44-4c37-8997-80f270faf1e8", "SubInteractionId": 2, "ChannelName": "", "ChannelIcon": "" };
        comp.customer = customerInfo;
        comp.appliedFilters = { "isPersonal": -1, "offset": 0, "recordsPerPage": 25, "label": -1, "status": -1, "type": -1, "sortingColumn": "eDUE_DATE", "sortingOrder": "DESC", "textSearch": "", "startDueDate": "-1", "endDueDate": "-1", "isNotify": false, "userID": 330 };
        sessionStorage.setItem(AppConstant.FOLLOWUP_KEY, "123");
        followUpService = fixture.debugElement.injector.get(FollowUpService);
        spyOnGetFollowUpDetail = spyOn(followUpService, 'getFollowupDetail')
            .and.returnValue(Observable.of(followupDetailRes));
        spyOnSaveFollowUp = spyOn(followUpService, 'saveFollowUpFromModal')
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
            Observable.of(testQuote),
            Observable.of(testQuote));
        spyOnGetFollowUps = spyOn(followUpService, 'getFollowUps')
            .and.returnValue(Observable.of(testQuote1));
        spyonrReqSetFollowUpEditMode = spyOn(followUpService, 'reqSetFollowUpEditMode')
            .and.returnValue(Observable.of(messageObject));
        fixture.detectChanges();
        spyOnqueueAnyTask = spyOn(followUpService, 'queueAnyTask')
            .and.returnValue(Observable.of(messageObject));
        spyOnReqUpdateFollowUp = spyOn(followUpService, 'reqUpdateFollowUp')
            .and.returnValue(Observable.of(testQuote));
        spyOnreqRefreshFollowUpEditMode = spyOn(followUpService, 'reqRefreshFollowUpEditMode')
            .and.returnValue(Observable.of(testQuote));
        spyOngGetListofSkills = spyOn(followUpService, 'getListofSkills')
           .and.returnValue(Observable.of(listOfSkills));
    });

    afterEach(function () {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('new followup should be initialised', async(() => {

        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            comp.initializeNewFollowUp(true);
            expect(comp['insertFollowUp']).toBeDefined();
            comp.showDateRangePickerCalled("Test event");
        });

    }));
    it('correct value should be changed', async(() => {

        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            comp.onChange("Test string", "subject");
            expect(comp.followupSubject).toBe("Test string");
            comp.onChange(1, "type");
            expect(comp.followUpType).toBe(1);
            comp.onChange("Test string", "owner");
            expect(comp.agentName).toBe("Test string");
            comp.onChange(1, "channel");
            expect(comp.followupChannel).toBe(1);
            comp.onChange("Test string", "contactAddress");
            expect(comp.contactAdress).toBe("Test string");
            comp.onChange("Test string", "contactID");
            expect(comp.contactId).toBe("Test string");
            comp.onChange("Test string", "customerName");
            expect(comp.customerName).toBe("Test string");
            comp.onChange("Test string", "destinationAddress");
            expect(comp["insertFollowUp"].Customer.CustomerSourceAddress).toBe("Test string");
            comp.onChange("Test string", "phoneNumber");
            expect(comp.contactNumber).toBe("Test string");

            //Check for special case of comment
            comp.isFollowupDetailChanged = true;
            comp.onChange("", AppConstant.COMMENT);
            expect(comp.isFollowupDetailChanged).toBeTruthy();
            comp.onChange("    ", AppConstant.COMMENT);
            expect(comp.isFollowupDetailChanged).toBeTruthy();
            comp.onChange("   Test String ", AppConstant.COMMENT);
            expect(comp.isFollowupDetailChanged).toBeFalsy();
        });

    }));

    it('date should be converted correctly', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var dateString = "2017-05-18T15:09:48.83";
            var now = new Date(dateString);
            expect(comp.dateConverter(dateString).toLocaleString()).toBe(now.toLocaleString());
        });

    }));

    it('selected date should be updated correctly', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var now = new Date();
            var value = { "picker": { "startDate": { "_d": now } } }
            comp.isNewFollowUp = false;
            comp["singleSelect"](value);
            expect(comp.followupDueDate).toBe(new Date(now).toUTCString());
            comp.isNewFollowUp = true;
            comp["singleSelect"](value);
            expect(comp["insertFollowUp"].FollowUpDueDate).toBe(new Date(now).toUTCString());
        });

    }));

    it('correct label value should be reflected', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            comp.followupDetail = followupDetailRes.data;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            comp.onLabelChange(1);
            expect(comp.selectedLabelKey).toBe(1);
            comp.isNewFollowUp = true;
            comp.onLabelChange(2);
            expect(comp["insertFollowUp"].FollowUpLabel).toBe(2);
            comp.isNewFollowUp = false;
            comp.initializeNewFollowUp(false);
            comp["followUpEditDetails"] = comp["followUpLocalDetails"];
            comp.onLabelChange(2);
            comp.calendarEventsHandler(true);
        });

    }));
    it('on clicked previous correct details should be fetched', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.followupIds = [];
            comp.isInEditmode = false;
            comp.followupIds = ["1234"];
            comp.onSliderNotify(0);
            comp.onClickedPrev(0);
            expect(comp.followupStatus).toBe(2);
            comp['_isHide'] = true;
            comp.followUpType = 0;
            comp.onClickedPrev(-1);
            expect(comp.followUpType).toBe(0);
            comp.currPageNumber = 1;
            comp.onClickedPrev(0);
            comp.currPageNumber = 3;
            comp.onClickedPrev(-1);
        });

    }));

    it('page should change to correct index', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.followupIds = [];
            comp.isInEditmode = false;
            comp.followupIds = ["1234"];
            comp.maxPage = 5;
            comp.currPageNumber = 1;
            expect(comp.currPageNumber).toBe(1);
        });

    }));

    it('on clicked next correct details should be fetched', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.followupIds = [];
            comp.isInEditmode = false;
            comp.followupIds = ["1234"];
            comp.onClickedNext(0);
            expect(comp.followupStatus).toBe(2);
            comp.followupDetail = undefined;
            comp.onClickedNext(-1);
            expect(comp.followupDetail).toBeUndefined();
            comp.followupDetail = undefined;
            comp.onClickedNext(24);
            expect(comp.followupDetail).toBeUndefined();
            comp.followupDetail = undefined;
            comp.followupIds = ["1234", "12345"];
            comp.onClickedNext(0);
            expect(comp.followupDetail.FollowUpStatus).toBe(2);
            comp.currPageNumber = 20;
            comp.onClickedNext(1);
            comp.currPageNumber = -1;
            comp.onClickedNext(2)
        });

    }));

    it('page should change to correct index', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.followupIds = [];
            comp.isInEditmode = false;
            comp.followupIds = ["1234"];
            comp.maxPage = 5;
            comp.currPageNumber = 5;
            expect(comp.currPageNumber).toBe(5);
        });

    }));

    it('new followup should be shown', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var testJson = FollowUpModel.getFollowUpModelJson();
            var followupIds = [];
            followupIds = ["1234"];
            comp.currentIndex = 0;
            comp.isNewFollowUp = true;
            comp.show(0, followupFilter, followupIds, 1, false);
            expect(comp.selectedLabelKey).toBe(2);
            comp.isNewFollowUp = false;
            comp.show(0, followupFilter, followupIds, 1, false);
            expect(comp.followupDetail.FollowUpStatus).toBe(2);
        });

    }));

    it('selected followup should be shown',()=> {
        
            comp.configurationData = configData;
            fixture.detectChanges();
            var followupIds = [];
            followupIds = ["1234"];
            comp.isNewFollowUp = false;
            comp.show(0, followupFilter, followupIds, 1, false);
            expect(comp.followupDetail.FollowUpStatus).toBe(2);
            comp.followupDetail = undefined;
            comp.show(-1, followupFilter, followupIds, 1, true);
            expect(comp.followupDetail).toBeUndefined();
            comp.followupDetail = undefined;
            comp.show(24, followupFilter, followupIds, 1, true);
            expect(comp.followupDetail).toBeUndefined();
        

    });


    it('on modal shown carousel should go to desired index', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.onModalShown(1);
        });

    }));

    it('details should not be initialised if response is undefined', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.followupDetail = undefined;
            comp.initModel();
            expect(comp.followupDetail).toBeUndefined();
            comp.followupDetail = followupDetailRes.data;
            comp.initModel();
            comp.followupDetail.IsQueued = true;
            comp.initModel();
            expect(comp.selectedSkill).toBe("Test String");
        });

    }));
    it('skills should be set to defualt in case it is not queued', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var followupIds = [];
            followupIds = ["1234"];
            comp.isNewFollowUp = false;
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followupDetail.IsQueued = false;
            comp.initModel();
            fixture.detectChanges();
            expect(comp.selectedSkill).toBe("Not Queued");
        });

    }));

    it('skills should be set to selected skill  in case it is queued', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var followupIds = [];
            followupIds = ["1234"];
            comp.isNewFollowUp = false;
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followupDetail.IsQueued = true;
            comp.initModel()
            fixture.detectChanges();
            expect(comp.selectedSkill).toBe("Test String");
        });

    }));

    it('child modal should be hidden', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var followupIds = [];
            followupIds = ["1234"];
            comp.isNewFollowUp = false;
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.hide()
            expect(comp.childModal.isShown).toBeFalsy();
            comp.show(0, followupFilter, followupIds, 1, true);
            comp.hide()
            expect(comp.childModal.isShown).toBeFalsy();
        });

    }));

    it('lock should be released', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var followupIds = [];
            followupIds = ["1234"];
            comp.isNewFollowUp = false;
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.isInEditmode = false;
            comp.releaseLock()
            expect(comp.isInEditmode).toBeFalsy();
            expect(spyonrReqSetFollowUpEditMode).toHaveBeenCalledTimes(0);
            comp.isInEditmode = true;
            comp.releaseLock()
            expect(comp.isInEditmode).toBeTruthy();
            expect(spyonrReqSetFollowUpEditMode).toHaveBeenCalled();
        });

    }));


    it('confimration modal should be shown on skill selected only', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followUpType = -1;
            comp.saveFollowUp();
            comp.followUpType = 1;
            comp.isNewFollowUp = true;
            comp.initializeNewFollowUp(false);
            comp["insertFollowUp"].FollowUpType = 1;
            comp.followupSubject = "Test subject";
            var currentdate = new Date();
            var testDate = new Date().setDate(currentdate.getDate() + 3);
            comp.followupDueDate = new Date(testDate).toUTCString();
            comp.saveFollowUp();
            comp.selectedSkill = "Test Skill";
            comp.saveFollowUp();
            comp.isNewFollowUp = false;
            comp.followupDetail.IsQueued = true;
            comp.saveFollowUp();
            comp.followupDetail.IsQueued = false;
            comp.selectedSkill = "Not queued";
            comp.saveFollowUp();
            comp.selectedSkill = "TestSkill";
            comp.saveFollowUp();
        });

    }));

    it('follow up should be created accurately', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var followupIds = ["1234"];
            comp.taskRequestData = { "FollowUpId": 0, "TaskId": "044e186b-ae44-4c37-8997-80f270faf1e7", "SubInteractionId": 2, "ChannelName": "", "ChannelIcon": "" };
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.initializeNewFollowUp(false);
            comp.followupDetail = followupDetailRes.data;
            comp.isNewFollowUp = true;
            comp.createFollowUp();
            comp["insertFollowUp"].FollowUpLabel = 1;
            fixture.detectChanges();
            comp.createFollowUp();
            expect(comp["insertFollowUp"].FollowUpLabel).toBe(1);
            comp.followupcomment = "Test comment";
            fixture.detectChanges();
            comp.createFollowUp();
            comp["insertFollowUp"].FollowUpType = 1;
            comp.followupDetail = followupDetailRes.data;
            comp.followupDetail.Customer = followupDetailRes.data.Customer;
            fixture.detectChanges();
            comp.createFollowUp();
            fixture.detectChanges();
            comp.createFollowUp();
        });

    }));

    it('new follow up should be set accurately', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.setIsNewFollowUp(true);
            //comp.calendarEventsHandler(null);
            expect(comp.isNewFollowUp).toBeTruthy();
        });

    }));

    it('edit properties should be set accurately', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            comp.initializeNewFollowUp(false);
            comp["followUpEditDetails"] = comp["followUpLocalDetails"];
            comp.childModal.show();
            fixture.detectChanges();
            comp.initializeEditProperties(true, true);
            expect(comp.isInEditmode).toBeTruthy();
            expect(comp.isNewFollowUp).toBeTruthy();
            fixture.detectChanges();
            comp.isInEditmode = false;
            comp.isNewFollowUp = true;
            fixture.detectChanges();
            comp.initializeEditProperties(false, false);
            comp.isInEditmode = true;
            fixture.detectChanges();
            comp.initializeEditProperties(true, true);
        });

    }));

    it('pesronal status should be toggle accurately', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.isNewFollowUp = false;
            comp.isInEditmode = true;
            comp.followupDetail.IsPersonal = false;
            comp.togglePersonalStatus();
            fixture.detectChanges();
            expect(comp.followupDetail.IsPersonal).toBeTruthy();
            comp.isInEditmode = false;
            comp.followupDetail.IsPersonal = false;
            comp.togglePersonalStatus();
            comp.isNewFollowUp = true;
            comp["insertFollowUp"].IsPersonal = true;
            comp.togglePersonalStatus();
            fixture.detectChanges();
            expect(comp["insertFollowUp"].IsPersonal).toBeFalsy();
        });

    }));

    it('follow up with correct status should be updated', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.isNewFollowUp = false;
            comp.isInEditmode = true;
            comp.followupcomment = "test comment";
            comp.followupDetail.FollowUpStatus = 1;
            comp.updateFollowup();
            expect(comp.followupStatus).toBe(2);
        });

    }));

    it('followup details should be fetched appropriately', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            spyOnGetFollowUpDetail.and.returnValue(Observable.of(errortestQuote));
            de = fixture.debugElement.query(By.css('carousel'));
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.isInEditmode = false;
            comp.getActualFollowUpDetails("test id", "test id", false, "enableEdit", 0);
            expect(comp.isInEditmode).toBeFalsy();
            comp.getActualFollowUpDetails("test id", "test id", false, "refresh", 0);
            comp.getActualFollowUpDetails("test id", "test id", false, "testmethod", 0);
            de.triggerEventHandler('editModeEnable', true);
        });

    }));

    it('on page change details should be fetched correctly', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.followupIds = [];
            comp.currPageNumber = 2;
            comp.maxPage = 3;
            comp.appliedFilters = followupFilter;
            comp.isPageFromNext = true;
            comp.onPageChange();
            expect(comp.followupIds.length).toBeCloseTo(1);
        });

    }));

    it('modal should be hidden', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.closeFollowUp(false);
            expect(comp.childModal.isShown).toBeFalsy();
        });

    }));

    it('follow up should not be marked complete', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followUpType = -1;
            fixture.detectChanges();
            comp.completeFollowUp();
            expect(comp.showTypeRequiredWarning).toBeFalsy();
        });

    }));
    it('follow up should not be marked complete', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followUpType = 1;
            comp.followupSubject = " ";
            comp.completeFollowUp();
            expect(comp.showSubjectRequiredWarning).toBeTruthy();
        });

    }));

    it('follow up should not be marked complete', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followUpType = 1;
            comp.followupSubject = "test";
            comp.followupDetail = followupDetailRes.data;
            comp.followupDetail.IsQueued = false;
            comp.followupDetail.FollowUpStatus = 2;
            fixture.detectChanges();
            comp.completeFollowUp();
            expect(comp.followupDetail.FollowUpStatus).toBe(3);
        });

    }));

    it('follow up should be marked complete with comment', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followUpType = 1;
            comp.followupSubject = "Test Subject";
            comp.followupcomment = "Test comment";
            fixture.detectChanges();
            comp.completeFollowUp();
            expect(comp.followupStatus).toBe(3);

        });

    }));

    it('follow up should be marked complete without comment', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followUpType = 1;
            comp.followupSubject = "Test Subject";
            comp.followupcomment = "";
            fixture.detectChanges();
            comp.completeFollowUp();
            expect(comp.followupStatus).toBe(3);

        });

    }));

    it('on refresh lock should be released', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.cleaupTask();
            var taskChannelMap = TaskChannelMap.getInstance().generateMap();
            var details = TaskChannelMap.getInstance().getChannelMap();
        });

    }));

    it('on saving only comment child modla should not hide', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.isSaveOnly = true;
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followupcomment = "Test comment";
            comp.saveComment();
            expect(comp.childModal.isShown).toBeTruthy();
            comp.followupSubject = "";
            comp.saveComment();
            expect(comp.childModal.isShown).toBeTruthy();
        });

    }));

    it('comments should be fetched appropriately', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            spyOnGetFollowupComment = spyOn(followUpService, 'getFollowupComment')
                .and.returnValue(Observable.of(commentRes));
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.isSaveOnly = true;
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.callGetCommentApi("Test id");
            expect(comp.followupDetail.Comment.length).toBeGreaterThanOrEqual(1);
        });

    }));

    it('comments date should be converted appropriately', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var current = new Date().toUTCString();
            var now = new Date(current);
            var millis = now.getTime() - (now.getTimezoneOffset() * 60000);
            var expected = new Date().setTime(millis);
            comp.commentDateConverter(current);
            expect(comp.commentDateConverter(current).getFullYear()).toBe(new Date(current).getFullYear());
        });

    }));

    it('correct skill should be updated', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.onChangeSkill("Skill 1", "skillfield");
            expect(comp.selectedSkill).toBe("Skill 1");
            comp.onChangeSkill("Not queued", "skillfield");
            expect(comp.selectedSkill).toBe("Not queued");
        });

    }));

    it('on click on selecting due date warning should be set to false', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.popUpDueDate();
            expect(comp.showDueDateInvalidWarning).toBeFalsy();
        });

    }));

    it('all details should not be valid', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.isSaveOnly = true;
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followupSubject = " ";
            expect(comp.isAllDetailsValid()).toBeFalsy();
        });

    }));

    it('all details should not be valid', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.isSaveOnly = true;
            comp.isNewFollowUp = true;
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followupSubject = " ";
            expect(comp.isAllDetailsValid()).toBeFalsy();
        });

    }));

    it('all details should not be valid', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followupDueDate = "2010-05-18T15:09:48.83";
            comp.isSaveOnly = true;
            comp.isNewFollowUp = true;
            expect(comp.isAllDetailsValid()).toBeFalsy();
        });

    }));

    it('all details should not be valid', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            var followupIds = ["1234"];
            comp.isNewFollowUp = false;
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.followupDueDate = "2010-05-18T15:09:48.83";
            comp.isSaveOnly = false;
            comp.isDueDateChanged = true;
            fixture.detectChanges();
            expect(comp.isAllDetailsValid()).toBeFalsy();
        });

    }));

    it('skill should be queued', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.followupDetail = followupDetailRes.data;
            comp.followupDetail.FollowUpStatus = 1;
            comp.selectedSkill = "test skill";
            comp.queueAnyTaskSkill(comp.followupDetail);
            expect(comp.isRequesting).toBeFalsy();
        });

    }));

    it('skill should be queued', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.initializeNewFollowUp(false);
            comp.followupDetail = followupDetailRes.data;
            comp.isNewFollowUp = true;
            comp.confirmQueueTask(true);
            comp.isNewFollowUp = false;
            comp['setFollowUpComplete'] = true;
            comp.confirmQueueTask(true);
            comp['setFollowUpComplete'] = false;
            comp.confirmQueueTask(true);
        });

    }));

    it('confirmation modal should be hidden', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.hideConfirmationDialog();
            expect(comp.confirmationModal.confirmationModal.isShown).toBeFalsy();
        });
    }));

    it('should return correct value of isFollowupDetailChanged', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.isFollowupDetailChanged = false;
            expect(comp.btnToggleSave()).toBeFalsy();
        });
    }));

    it('should return correct followup type', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.configurationData = undefined;
            comp.getFollowupType(0);
            comp.configurationData = configData;
            expect(comp.getFollowupType(configData.UserFollowUpTypes[1].FollowUpTypeId)).toBe(configData.UserFollowUpTypes[1].Name);
        });
    }));

    it('should do poll', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var followupIds = [];
            followupIds = ["1234"];
            comp.isNewFollowUp = false;
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.isInEditmode = true;
            comp.doPoll();
            expect(spyOnreqRefreshFollowUpEditMode).toHaveBeenCalled();
        });
    }));
    it("user follow up type should be created correctly", () => {
        fixture.detectChanges();
        var userType = new UserFollowUpTypes(220, 1, "Test");
        expect(userType.FollowUpTypeId).toBe(1);
    })
    it("followup notification should be created correctly", () => {
        fixture.detectChanges();
        var notificationTest = new FollowUpNotification("220", "Test", 1);
        expect(notificationTest.NotificationStatus).toBe(1);
    })
    it("user follow up type should be created correctly", () => {
        fixture.detectChanges();
        comp["commentEnter"]({});
        comp["hasKnowledgeBaseArticle"] = true;
        comp["commentEnter"]({});
        var event1 = { "srcElement": { "parentElement": { querySelector(temp) { return false } } } }
        comp["showInsertButton"] = false;
        comp["commentLeave"](event1);
        comp["showInsertButton"] = true;
        comp["commentLeave"](event1);
        comp["insertHover"]({});
        comp["knowledgeBaseArticleSelected"](comp, "Test", { "title": "test", "content": "test" });
        comp["resetKnowledgeBaseInsert"](comp);
        comp["html2text"]("<div>Test string</div>");
        comp.followupcomment = "Test string";
        comp["hasKnowledgeBaseArticle"] = false;
        comp["insertKnowledgeBaseArticle"]();
        comp["hasKnowledgeBaseArticle"] = true;
        comp["insertKnowledgeBaseArticle"]();
        comp.taskId = "123";
        var testE = comp.taskId;
    })
    it('on clicking cancel followup modal should hide', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.cancelFollowUp(0);
            comp.cancelFollowUp(1);
            expect(comp.childModal.isShown).toBeFalsy();
        });
    }));
    it('edit mode should be set', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            var followupIds = ["1234", "044e186b-ae44-4c37-8997-80f270faf1e81"];
            comp.show(0, followupFilter, followupIds, 1, false);
            comp.setEditMode(true, null)
            comp.isInEditmode = true;
            expect(comp.isInEditmode).toBeTruthy();
            expect(spyOnGetFollowUpDetail).toHaveBeenCalled();
            comp.currentIndex = 1;
            comp.setEditMode(true, null);
        });

    }));
    it('hide custom daterangepicker event called', async(() => {
        fixture.whenStable().then(() => {
            comp.configurationData = configData;
            fixture.detectChanges();
            comp.hideCustomDateRangePickerCalled(0);
            expect(comp["isCustomDateRangePickerVisible"]).toBeFalsy();
        });
  }));

  it("followup synchornization should be performed correctly", () => {
    comp.configurationData = configData;
      fixture.detectChanges();
      comp.initializeNewFollowUp(false);
      comp.userId = "330";
      comp.activeTaskInteractionId = "DraftTestId";
      localStorage.setItem("DraftTestId", JSON.stringify(testDraftData));
      comp.synchronizeLocalStorageForNewMode(true);
      expect(comp.selectedLabelKey).toBe(1);
    comp.followupDetail = followupDetailRes.data;
    comp.followupDetail.FollowUpID = "DraftTestId";
    comp.followupDetail.FollowUpLastModifiedDate = testDraftData.TimeStamp;
      comp.synchronizeLocalStorageForEditMode();
    expect(comp.isDraftFollowUp).toBeTruthy();
    comp.followupDetail.FollowUpLastModifiedDate = new Date().toUTCString();
    comp.synchronizeLocalStorageForEditMode();
    localStorage.setItem("fID", JSON.stringify(testDraftData));
    comp.userId = "331";
    comp.synchronizeLocalStorageForEditMode();
    localStorage.removeItem("fID");
    comp.isInEditmode = true;
    comp.synchronizeLocalStorageForEditMode();
  })
  it("click next", () => {
    comp.configurationData = configData;
    fixture.detectChanges();
    comp.currPageNumber = 1;
    comp.maxPage = 2;
    comp.followupIds = ["1"];
      comp.onClickedNext(1);
      expect(comp.isPageFromNext).toBeTruthy();
  })
});

