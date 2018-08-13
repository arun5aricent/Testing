//import { Slide } from '../followups/carousel/slide.component';
//import { FollowupListSearchComponent } from '../followups/followup-search/followup-listsearch.component';
//import { FollowUpListHeaderComponent } from '../followups/followup-listheader/followup-listheader.component';
//import { FollowupListComponent } from '../followups/followup-list/followup-list.component';
//import { FollowupsApis } from '../followups/followup-models/followups-apis';
//import { FollowUpStatusComponent } from '../followups/followup-status/followup-status.component';
//import { Observable } from 'rxjs/Observable';
//import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
//import { CommonModule } from '@angular/common';
//import { FollowUpService } from '../followups/shared/followup.service';
//import { FollowupListToggleComponent } from '../followups/followup-toggle/followup-listtoggle.component';
//import { NgxPaginationModule } from 'ngx-pagination';
//import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
//import { By, BrowserModule } from '@angular/platform-browser';
//import { DebugElement, NgModule, Component } from '@angular/core';
//import { Followup,UIParameter } from '../followups/followup-models/followup';
//import { FollowUpListNotificationBannerComponent } from '../followups/followup-notification/followup-notification-banner.component';
//import {FollowupRes} from '../followups/followup-models/followup-res';
//import { LinkyModule } from 'angular-linky';
//import {MomentModule} from 'angular2-moment';
//import { Daterangepicker,DaterangepickerConfig} from 'ng2-daterangepicker';
//import { ModalDirective,ModalModule } from 'ngx-bootstrap';
//import { AsyncLoaderComponent } from '../followups/util/util.asyncloader';
//import { FollowupConfirmationComponent } from '../followups/followup-confirmation/followup-confirmation.component';
//import { PagerService } from '../followups/followup-models/pager.service';
//import { FollowupModalComponent } from '../followups/followup-detail/followup-modal.component';
//import { Carousel } from '../followups/carousel/carousel.component';

//describe('FollowuplistComponent (templateUrl)', () => {

//    let comp: FollowupListComponent;
//    let fixture: ComponentFixture<FollowupListComponent>;
//    let de: DebugElement[];
//    let desingle:DebugElement;
//    let el: HTMLElement;
//    let followUpService: FollowUpService;
//    let spyOnGetFollowUps;
//    let spyOnGetUIParams
//    let spyOngetSimpleSearch;
//    let statusColumnIndex=0;
//    let dueDateColumnIndex=1;
//    let typeColumnIndex=2;
//    let customerNameColumnIndex=3;
//    let idColumnIndex=4;
//    let ownerColumnIndex=5;
//    let creationDateColumnIndex=6;
//    let subjectColumnIndex=7;

//    let resourceConfi={
//        "status": [
//        {
//            "status": "All"
//        },
//        {
//            "status": "New"
//        },
//        {
//            "status": "InProgress"
//        },
//        {
//            "status": "Complete"
//        }  
//    ],
//    "type": [   
//                {
//                "type": "All"
//                },
//                {
//                "type": "Billing"
//                },
//                {
//                "type": "Support"
//                },
//                {
//                "type": "Sales"
//                },
//                {
//                "type": "Shipping"
//                },
//                {
//                "type": "Delivery"
//                },
//                {
//                "type": "Operations"
//                },
//                {
//                "type": "Marketing"
//                },
//                {
//                "type": "PreSales"
//                },
//                {
//                "type": "Development"
//                },
//                {
//                "type": "CustomerSupport"
//                }
//    ],
//    "typeForUser":[
//                {
//                "type": "Billing"
//                },
//                {
//                "type": "Support"
//                },
//                {
//                "type": "Sales"
//                },
//                {
//                "type": "Shipping"
//                },
//                {
//                "type": "Delivery"
//                },
//                {
//                "type": "Operations"
//                },
//                {
//                "type": "Marketing"
//                },
//                {
//                "type": "PreSales"
//                },
//                {
//                "type": "Development"
//                },
//                {
//                "type": "CustomerSupport"
//                }
//    ],
//     "skills":[
//                {
//                "skill": "Not queued"
//                },
//                {
//                "skill": "Skill 1"
//                },
//                {
//                "skill": "Skill 2"
//                },
//                {
//                "skill": "Skill 3"
//                },
//                {
//                "skill": "Skill 4"
//                }
//    ],
//    "followupHeader": [
//        {
//            "personal": "Personal",
//            "search": "Search",
//            "label": "Label",
//            "status": "Status",
//            "type": "Type",
//            "new_followup": "Follow-Up",
//            "new_personal_followup": "Personal Follow-Up"
//        }
//    ],
//    "followupListHeader": [
//        {
//            "status": "Status",
//            "type": "Type",
//            "id": "Customer ID",
//            "owner_name":"Owner Name",
//            "customer_name": "Customer Name",
//            "created": "Created Date",
//            "due": "Due Date",
//            "subject": "Subject",
//            "action": "Actions"
//        }
//    ],

//    "FollowuplistConfig":{
//        "totalNumberOfRecordPerPage" : 10
//    },
    
//    "DefaultValue":{
//        "default":"--Select Field--"
//    },

//    "label": [
//        {
//            "all": "All",
//            "no_label":"NoLabel",
//            "teal": "46d6db",
//            "mint": "7ae7bf",
//            "yellow": "fbd75b",
//            "orange":"ffb878",
//            "pink": "dbadff",
//            "purple": "8f7ce2"
//        }
//    ],
//    "Languages": [
//        {
//            "Language": "English"
//        },
//        {    "Language": "Spanish"
//        },
//        {   "Language": "French"
//        },
//        {    "Language": "Italian"
//        },
//        {    "Language":"Portuguese"
//        }
//    ],
//    "labelName":[
//        {
//            "labelName": "All"
//        },
//        {    "labelName": "No Label"
//        },
//        {   "labelName": "Teal"
//        },
//        {   "labelName": "Mint"
//        },
//        {    "labelName": "Yellow"
//        },
//        {    "labelName":"Orange"
//        },
//        {    "labelName":"Pink"
//        },
//        {    "labelName":"Purple"
//        }
//    ]
//    };
//    let testQuote:FollowupRes =
//        {"TotalRecords":1,
//         "isPersonal" : true,
//         "FollowUpList": [{
//           "FollowUpID": "f42bbf40-0b65-40b4-ac46-93bacf12664c",
//           "FollowUpStatus": 0,
//           "FollowUpType": 0,
//           "FollowUpSubject": "Issue with coverage",
//           "FollowUpDueDate": "2017-05-18T15:09:48.83",
//           "CustomerName": "Julius Hammod",
//           "FollowUpCreationDate": "2017-05-18T15:09:48.83",
//           "FollowUpLabel": 0,
//           "FollowUpChannel": 0,
//           "FollowUpLastModifiedDate": "2017-05-18T15:09:48.83",
//           "FollowUpCompleteDate": null,
//           "FollowUpLastModifyUser": "Clubb ",
//           "FirstComment": "Test Comment 1",
//           "LastComment": "Test Comment 2",
//           "TotalComment": "1",
//           "ContactID": "318047",
//           "IsPersonal": true,
//           "Owner": "Sunil",
//           "Comments": [
//             {
//               "CommentDesc": "Test Comment",
//               "CommentDate": "2017-05-18T15:09:48.83",
//               "CommentUser": "Jed"
//             }
//           ],
//           "SkillAddress": "blah",
//           "Notification": null
//         }],
        
//    };
//    let errortestQuote:FollowupRes =
//        {"TotalRecords":1,
//         "isPersonal" : true,
//        "FollowUpList":[{
//            "FollowUpID": "f42bbf40-0b65-40b4-ac46-93bacf12664c",
//            "FollowUpStatus": 0,
//            "FollowUpType": 0,
//            "FollowUpSubject": "Issue with coverage",
//            "FollowUpDueDate": "2017-05-18T15:09:48.83",
//			"CustomerName": "Julius Hammod",
//			"FollowUpCreationDate": "2017-05-18T15:09:48.83",
//			"FollowUpLabel" : 0,
//			"FollowUpChannel": 0,
//            "FollowUpLastModifiedDate": "2017-05-18T15:09:48.83",
//            "FollowUpCompleteDate": null,
//            "FollowUpLastModifyUser": "Clubb ",
//			"FirstComment": "Test Comment 1",
//            "LastComment": "Test Comment 2",
//            "TotalComment": "1",
//            "ContactID": "318047",
//            "IsPersonal":true,
//			"Owner":"Sunil",
//            "Comments":[{
//                "CommentDesc":"Test Comment",
//                "CommentDate":"2017-05-18T15:09:48.83",
//                "CommentUser":"Jed"
//      }],
//            "SkillAddress": "blah",
//            "Notification":null
//        }],
        
//    };


//    let followUpItem:Followup={
//            "FollowUpID": "f42bbf40-0b65-40b4-ac46-93bacf12664c",
//            "FollowUpStatus": 0,
//            "FollowUpType": 0,
//            "FollowUpSubject": "Issue with coverage",
//            "FollowUpDueDate": "2017-05-18T15:09:48.83",
//			"CustomerName": "Julius Hammod",
//			"FollowUpCreationDate": "2017-05-18T15:09:48.83",
//			"FollowUpLabel" : 0,
//			"FollowUpChannel": 0,
//            "FollowUpLastModifiedDate": "2017-05-18T15:09:48.83",
//            "FollowUpCompleteDate": null,
//            "FollowUpLastModifyUser": "Clubb ",
//			"FirstComment": "Test Comment 1",
//            "LastComment": "Test Comment 2",
//            "TotalComment": "1",
//            "ContactID": "318047",
//            "IsPersonal":true,
//			"Owner":"Sunil",
//            "Comments":[{
//                "CommentDesc":"Test Comment",
//                "CommentDate":"3017-05-18T15:09:48.83",
//                "CommentUser":"Jed"
//      }],
//            "SkillAddress": "blah",
//            "Notification":null
//        }
//    //let testUIParam:UIParameter={
//    //  'SkillQueue': 'You have selected',
//    //  'ContactID': "Contact ID",
//    //  'ContactAdd': "Contact Address",
//    //  'NoCommentNote': "Use the above interface to add first follow-up note",
//    //  'Cancel': "Cancel",
//    //  'Personal': "Personal",
//    //  'SaveAdd': "Save & Add",
//    //  'OwnerName': "Owner Name",
//    //  'NoComment': '',
//    //  'ContReason': "Contact Reason / Details",
//    //  'ContactName': "Contact Name",
//    //  'Showing': "Showing",
//    //  'Followups': "Follow Ups",
//    //  'Status': "Status",
//    //  'Search': "Search",
//    //  'Skills': "Skills",
//    //  'Accepted': "Accepted",
//    //  'CreatedDate': "Created Date",
//    //  'DueDateRange': '',
//    //  'Contact': "Contact",
//    //  'AgentName': "Agent Name",
//    //  'ErrorComplete': '',
//    //  'PickAction': 'Unable to pick the action item',
//    //  'CustomerName': "Customer Name",
//    //  'DestAdd': "Destination Address",
//    //  'Channel': "Channel",
//    //  'AssociateTask': "Associated Tasks",
//    //  'Followup': "Follow Up",
//    //  'ErrorFetchComment': '',
//    //  'Created': "Created",
//    //  'OK': 'OK',
//    //  'Of': "of",
//    //  'ErrorQueue': '',
//    //  'New': "New",
//    //  'Close': "Close",
//    //  'Notes': "notes",
//    //  'Label': "Label",
//    //  'Queue': "Queue",
//    //  'Phone': "Phone Number",
//    //  'DueDate': "Due Date",
//    //  'Actions': "Actions",
//    //  'ErrorFetchup': '',
//    //  'Complete': "Complete",
//    //  'NoRecord': "No record found",
//    //  'ErrorUpdate': '',
//    //  'ErrorConnect': '',
//    //  'Expired': '',
//    //  'ErrorEdit': '',
//    //  'ErrorAddComment': '',
//    //  'ErrorCreate': '',
//    //   'Records': "records",
//    //  'SubjectLine': "Enter Subject here",
//    //  'CommentNote': "Enter Follow-up note here",
//    //  'QuickSearch': "Quick Search",
//    //  'ErrorRefresh': '',
//    //  'SaveClose': "Save & Close",
//    //  'SaveQueue': '',
//    //  'Attention': '',
//    //  'CustomerID': "Customer ID",
//    //  'Edit': "Edit",
//    //  'Next': "Next",
//    //  'View': '',
//    //  'Type': "Type",
//    //  'Prev': "Prev",
//    //  'Subject': "Subject",
//    //  "State": "State",
//    //  "QueuedTo": "Queued To",
//    //  "LastModifiedDate": "Last Modified",
//    //  "LockedErrorMessage": " This FollowUp is currently locked for editing by &#x23;",
//    //  "Back": "Back",
//    //  "Reminder": "Reminder",
//    //  "On_Due_Date": "Due Date",
//    //  "On_Completion": "Completion",
//    //  "On_Custom_Date": "Custom",
//    //  "Due_Date_Notification": "Due Date Notification",
//    //  "Complete_Notification": "Completion Notification",
//    //  "Custom_Date_Notification": "Custom Date Notification",
//    //  "Notify_Me": "Notfiy Me",
//    //  "Custom_Date_Validation": "Please select date for Custom Notification",
//    //  "Notification": "Notification"   
//    //}
//    //let searchTestQuote:FollowupRes =
//    //    {"TotalRecords":0,
//    //     "isPersonal" : true,
//    //    "FollowUpList":[],
        
//    //};
//    //beforeEach(async(() => {
        
//    //    TestBed.configureTestingModule({
//    //        imports: [
//    //            NgxPaginationModule,
//    //            CommonModule,
//    //            HttpModule,
//    //            FormsModule,
//    //            LinkyModule,
//    //            MomentModule,
//    //            Daterangepicker,
//    //            ModalModule.forRoot()
//    //        ],
//    //        declarations: [
//    //            FollowupListComponent,
//    //            FollowUpListHeaderComponent,
//    //            FollowupListToggleComponent,
//    //            FollowupListSearchComponent,
//    //            FollowUpListNotificationBannerComponent,
//    //            FollowUpStatusComponent,
//    //            AsyncLoaderComponent,
//    //FollowupModalComponent,
//    //Slide,
//    //Carousel,
//    //FollowupConfirmationComponent
//    //        ], // declare the test component
//    //        providers: [FollowUpService,FollowupsApis,PagerService,DaterangepickerConfig]
//    //    })
//    //        .compileComponents();  // compile template and css
            
//    //}));
//    //beforeEach(() => {
//    //    fixture = TestBed.createComponent(FollowupListComponent);
//    //    comp = fixture.componentInstance;
//    //    comp.childModal.resourceConfigData=resourceConfi;
//    //    followUpService = fixture.debugElement.injector.get(FollowUpService);
//    //    spyOnGetUIParams = spyOn(followUpService,'getUIParams').and.returnValue(Observable.of(any));
//    //    spyOnGetFollowUps = spyOn(followUpService, 'getFollowUps')
//    //        .and.returnValue(Observable.of(testQuote));
//    //    fixture.detectChanges(); 
   
//    //});

//    //it('should change sorting of correct column',()=>{
//    //       fixture.detectChanges();
//    //       comp.changeSorting("eID");
//    //       expect(comp.sorting.column).toContain("eID");
//    //       expect(comp.sorting.descending).toBeFalsy();
//    //       comp.changeSorting("eCUSTOMER_NAME");
//    //       expect(comp.sorting.column).toContain("eCUSTOMER_NAME");
//    //       expect(comp.sorting.descending).toBeFalsy();
//    //       comp.changeSorting("eTYPE");
//    //       expect(comp.sorting.column).toContain("eTYPE");
//    //       expect(comp.sorting.descending).toBeFalsy();
//    //       comp.changeSorting("eLAST_MODIFIED_USER");
//    //       expect(comp.sorting.column).toContain("eLAST_MODIFIED_USER");
//    //       expect(comp.sorting.descending).toBeFalsy();
//    //       comp.sorting.column="eTYPE";
//    //       comp.changeSorting("eTYPE");
//    //       expect(comp.sorting.descending).toBeTruthy();
//    //       comp.changeSorting("eTYPE");
//    //       expect(comp.sorting.descending).toBeFalsy();
//    //       comp.changeSorting("eOWNER");
//    //       expect(comp.sorting.descending).toBeFalsy();
//    //       comp.changeSorting("eDUE_DATE");
//    //       expect(comp.sorting.column).toContain("eDUE_DATE");
//    //       expect(comp.sorting.descending).toBeFalsy();
//    //});
//    //it('should return correct sorting order',()=>{
//    //       fixture.detectChanges();
//    //       expect(comp.selectedClass("eID")).toContain("sort-default");
//    //       comp.sorting.column="eID";
//    //       expect(comp.selectedClass("eID")).toContain("sort-false");
//    //       comp.sorting.descending="true";
//    //       expect(comp.selectedClass("eID")).toContain("sort-true");
//    //       expect(comp.selectedClass("eDUE_DATE")).toContain("sort-true");
//    //});
    

//    it('should display details of follow up', () => {
//            de = fixture.debugElement.queryAll(By.css('td'));
//            comp.data = testQuote.FollowUpList;
//            fixture.detectChanges(); 
//            expect(de[idColumnIndex].nativeElement.textContent).toContain(testQuote.FollowUpList[0].ContactID);
//            expect(de[ownerColumnIndex].nativeElement.textContent).toContain(testQuote.FollowUpList[0].Owner);
//            expect(de[customerNameColumnIndex].nativeElement.textContent).toContain(testQuote.FollowUpList[0].CustomerName);
//            expect(de[typeColumnIndex].nativeElement.textContent).toContain(testQuote.FollowUpList[0].FollowUpType);
//            expect(de[creationDateColumnIndex].nativeElement.textContent).toContain("Thu May 18 2017");
//            expect(de[dueDateColumnIndex].nativeElement.textContent).toContain("Thu May 18 2017");
//            expect(de[subjectColumnIndex].nativeElement.textContent).toContain(testQuote.FollowUpList[0].FollowUpSubject);
//    });

//    it('should return correct filter order',()=>{
//           fixture.detectChanges();
//           let testFilter={"whichFilter":1,"filterValue":"All"};
//           comp.onFilterNotify(testFilter);
//           expect(comp.label).toContain("All");
//           testFilter={"whichFilter":2,"filterValue":"All"};
//           comp.onFilterNotify(testFilter);
//           expect(comp.status).toContain("All");
//           testFilter={"whichFilter":3,"filterValue":"All"};
//           comp.onFilterNotify(testFilter);
//           expect(comp.type).toContain("All");
//    });
//    it("should return values based on search criteria",()=>{
//         fixture.detectChanges();
//         comp.onSearchNotify("testString");
//         expect(comp.data.length).toBeLessThanOrEqual(1);
//    })
//    it("should display defualt values when search criteria is cleared",()=>{
//         fixture.detectChanges();
//         comp.onClearSearchNotify(true);
//         expect(comp.data.length).toBeGreaterThan(0);
//    })

//    it("should display records of clicked page",()=>{
//         fixture.detectChanges();
//         comp.recordsPerPage=25;
//         comp.pageChange(4);
//         expect(comp.offset).toBe(75);
//         comp.searchMode=true;
//         comp.pageChange(5);
//         expect(comp.offset).toBe(100);
//    })

//    it("should show notification",()=>{
//         fixture.detectChanges();
//         comp.showNotification("Test Message","Notification Type");
//         expect(comp.isNotificationVisible).toBeTruthy;
//    })
//    it("should close notification",()=>{
//         fixture.detectChanges();
//         comp.onNotificationCancel();
//         expect(comp.isNotificationVisible).toBeFalsy();
//    })
//    it("should notifiy to show personal message",()=>{
//         fixture.detectChanges();
//         comp.onNotify(true);
//         expect(comp.isUserLoaded ).toBeTruthy();
//    })
//    it("offset should be sent to 0 on due date range change",()=>{
//         fixture.detectChanges();
//         let testDueDateRange={"startDate":"2017-05-18T15:09:48.83","endDate":"2017-05-18T15:09:48.83"}
//         comp.onDueDateRangechangeNotify(true);
//         expect(comp.offset ).toBeLessThanOrEqual(0);
//    })
//    it("offset should be sent to 0 on negative page number pass",()=>{
//         fixture.detectChanges();
//         comp.recordsPerPage=25;
//         comp.pageChange(-1);
//         expect(comp.offset ).toBeLessThanOrEqual(0);
//    })
//    it("offset should be sent to 0 on refresh click",()=>{
//         fixture.detectChanges();
//         comp.onRefreshClick(null,null);
//         expect(comp.offset ).toBeLessThanOrEqual(0);
//    })
//    it("followup id should be set before opening follow up",()=>{
//         fixture.detectChanges();
//         comp.setEditMode(true,0,true);
//         comp.onEditModeSetNotify(null);
//         comp.onCreateNewFollowUpNotify(false);
//         expect(comp.followupIds.length).toBeGreaterThanOrEqual(0);
//    })
//    it("correct record found message should be shown",()=>{
//         fixture.detectChanges();
//         comp.currPage=1;
//         expect(comp.getRecordsFoundMessage(123)).toContain('1');
//         expect(comp.getRecordsFoundMessage(12)).toContain('12');
//         comp.currPage=2;
//         expect(comp.getRecordsFoundMessage(45)).toContain('45');
//    })

//    it("isUrgentMethod should return false",()=>{
//        fixture.detectChanges();
//        let now= new Date()
//        let now1 = new Date().setDate(now.getDate() + 3);
//        followUpItem.FollowUpDueDate= new Date(now1).toUTCString();
//        expect(comp.isUrgent(followUpItem)).toBeFalsy();
//    })
//    it("on modal hide currpage method should be called",()=>{
//        fixture.detectChanges();
//        comp.currPage=1;
//        comp.onModalViewhide()
//        expect(comp.offset).toBeLessThanOrEqual(0);
//    })
//    it("on pagechange items of that page should be displayed",()=>{
//        fixture.detectChanges();
//        comp.onPageChange(4);
//        expect(comp.currPage).toBeCloseTo(4);
//    })
//    it("user should not be allowed to open follow up when it is locked ",()=>{
//        fixture.detectChanges();
//        comp.onEditModeEnable(null);
//        expect(comp.isNotificationVisible).toBeTruthy();
//    })
//    it("user should be allowed to open follow up when it is not locked ",()=>{
//        fixture.detectChanges();
//        comp.isNotificationVisible=true;
//        comp.onEditModeEnable(null);
//        expect(comp.isNotificationVisible).toBeFalsy();
//    })
//    it("followup itme should be opened in view mode ",()=>{
//        fixture.detectChanges();
//        var event={"target":{"id":"view"}}
//        comp.onFollowUpListItemClick(event,0);
//        expect(comp.followupIds.length).toBeGreaterThanOrEqual(0);
//    })
//    it("followup itme should be opened in edit mode ",()=>{
//        fixture.detectChanges();
//        var event={"target":{"id":"editButton"}}
//        comp.onFollowUpListItemClick(event,0);
//        expect(comp.followupIds.length).toBeGreaterThanOrEqual(0);
//    })
//    it("correct number of days should be displayed ",()=>{
//        fixture.detectChanges();
//        expect(comp.numDaysBetween(new Date(),new Date())).toBeGreaterThanOrEqual(0);
//    })
//});
