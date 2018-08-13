//import { FollowUpService } from './../followups/shared/followup.service';

//import {
//    TestBed,
//    getTestBed,
//    async,
//    inject
//} from '@angular/core/testing';
//import {
//    Headers, BaseRequestOptions,
//    Response, HttpModule, Http, XHRBackend, RequestMethod
//} from '@angular/http';

//import { ResponseOptions } from '@angular/http';
//import { MockBackend, MockConnection } from '@angular/http/testing';
//import { FollowupsApis } from '../followups/followup-models/followups-apis';
//import { FollowupRes } from '../followups/followup-models/followup-res';
//import { FollowUpComment } from '../followups/followup-models/followup-comment';
//import { Customer } from '../followups/followup-models/customer';
//import { FollowUpInsert } from '../followups/followup-models/followup-insert';
//import { FollowUpModel } from '../followups/followup-models/followup-model';
//describe('Blog Service', () => {
//    let mockBackend: MockBackend;
//    beforeEach(async(() => {
//        TestBed.configureTestingModule({
//            providers: [
//              FollowUpService,
//                MockBackend,
//                BaseRequestOptions,
//                FollowupsApis,
//                {
//                    provide: Http,
//                    deps: [MockBackend, BaseRequestOptions],
//                    useFactory:
//                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
//                        return new Http(backend, defaultOptions);
//                    }
//                }
//            ],
//            imports: [
//                HttpModule
//            ]
//        });
//        mockBackend = getTestBed().get(MockBackend);
//    }));

//    it('should get followups',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    TotalRecords: 1,
//                                    isPersonal: true,
//                                    FollowUpList: [{
//                                        FollowUpID: "f42bbf40-0b65-40b4-ac46-93bacf12664c",
//                                        FollowUpStatus: 1,
//                                        FollowUpType: 1,
//                                        FollowUpSubject: "Issue with coverage",
//                                        FollowUpDueDate: "2017-05-18T15:09:48.83",
//                                        CustomerName: "Julius Hammod",
//                                        FollowUpCreationDate: "2017-05-18T15:09:48.83",
//                                        FollowUpLabel: 1,
//                                        FollowUpChannel: "Fax",
//                                        FollowUpLastModifiedDate: "2017-05-18T15:09:48.83",
//                                        FollowUpCompleteDate: null,
//                                        FollowUpLastModifyUser: "Clubb ",
//                                        FirstComment: "Test Comment 1",
//                                        LastComment: "Test Comment 2",
//                                        TotalComment: "1",
//                                        ContactID: "318047",
//                                        IsPersonal: true,
//                                        Owner: "Sunil",
//                                        Comment: null
//                                    }],

//                                }]
//                        }
//                        )));
//                });

//            followupModalService.getFollowUps(false, 0, 25, 0, 0, 0, "eDUE_DATE", "ASC", "", new Date().toUTCString(), new Date().toUTCString(), false, "2").subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//            followupModalService.getFollowUps(false, 0, 25, 0, 0, 0, "eDUE_DATE", "ASC", "Test", new Date().toUTCString(), new Date().toUTCString(), false, "2").subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));

//    it('comments of the following followup id should be recieved',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Comments: [{
//                                        CommentDesc: "Test string",
//                                        CommentDate: "Test string",
//                                        CommentUser: "Test string"
//                                    }],

//                                }]
//                        }
//                        )));
//                });

//            followupModalService.getFollowupComment("123").subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));
//    it('should get resource config information',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Message: "Resource config information"

//                                }]
//                        }
//                        )));
//                });

//            followupModalService.getResourceConfig().subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));
//    it('should get resource config information',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Status: false,
//                                    Message: "string",
//                                    data: [
//                                        {
//                                            UserID: "Test User",
//                                            FollowUpChannel: "Fax",
//                                            FollowUpLastModifiedDate: new Date().toUTCString(),
//                                            FollowUpCompleteDate: new Date().toUTCString(),
//                                            FollowUpLastModifyUser: "Test User",
//                                            TotalComment: 0,
//                                            Comment: null,
//                                            Customer: {
//                                                ContactId: "123",
//                                                CustomerName: "Test Name",
//                                                CustomerAddress: "Test Address",
//                                                CustomerMailId: "abc@gmail.com",
//                                                CustomerNumber: "9999999999"
//                                            },
//                                            FollowUpID: "1234",
//                                            FollowUpStatus: "Complete",
//                                            FollowUpType: "Test Type",
//                                            FollowUpLabel: "No label",
//                                            IsPersonal: false,
//                                            ContactID: "123",
//                                            Owner: "Test owner",
//                                            CustomerName: "Test Name",
//                                            FollowUpCreationDate: new Date().toUTCString(),
//                                            FollowUpDueDate: new Date().toUTCString(),
//                                            FollowUpSubject: "Test subject",
//                                            SkillAddress: "Skill 1",
//                                            IsQueued: false
//                                        }
//                                    ]

//                                }]
//                        }
//                        )));
//                });
//            let comment: FollowUpComment[] = [];
//            let followupcomment = "";
//            let customer = new Customer("12", "Armstrongb", "Armstrongbstreet1", "9030411298",null);
//            let insertFollowUp = new FollowUpInsert(this.userId, 0, 0, customer,
//                1, -1, 1, false, "Jed Bartlett",
//                new Date().toUTCString(), "", comment, "--Select Field--",null,null);
//            followupModalService.saveFollowUp(insertFollowUp).subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));

//    it('should get UI params',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Message: "UI params"

//                                }]
//                        }
//                        )));
//                });
//            followupModalService.getUIParams("en").subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));

//    it('should get Follow up details',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Status: false,
//                                    Message: "string",
//                                    data: [
//                                        {
//                                            UserID: "Test User",
//                                            FollowUpChannel: "Fax",
//                                            FollowUpLastModifiedDate: new Date().toUTCString(),
//                                            FollowUpCompleteDate: new Date().toUTCString(),
//                                            FollowUpLastModifyUser: "Test User",
//                                            TotalComment: 0,
//                                            Comment: null,
//                                            Customer: {
//                                                ContactId: "123",
//                                                CustomerName: "Test Name",
//                                                CustomerAddress: "Test Address",
//                                                CustomerMailId: "abc@gmail.com",
//                                                CustomerNumber: "9999999999"
//                                            },
//                                            FollowUpID: "1234",
//                                            FollowUpStatus: "Complete",
//                                            FollowUpType: "Test Type",
//                                            FollowUpLabel: "No label",
//                                            IsPersonal: false,
//                                            ContactID: "123",
//                                            Owner: "Test owner",
//                                            CustomerName: "Test Name",
//                                            FollowUpCreationDate: new Date().toUTCString(),
//                                            FollowUpDueDate: new Date().toUTCString(),
//                                            FollowUpSubject: "Test subject",
//                                            SkillAddress: "Skill 1",
//                                            IsQueued: false
//                                        }
//                                    ]

//                                }]
//                        }
//                        )));
//                });
//            followupModalService.getFollowupDetail("123", "12", false).subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));


//    it('should get Follow up details',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Status: false,
//                                    Message: "string",
//                                    data: [
//                                        {
//                                            UserID: "Test User",
//                                            FollowUpChannel: "Fax",
//                                            FollowUpLastModifiedDate: new Date().toUTCString(),
//                                            FollowUpCompleteDate: new Date().toUTCString(),
//                                            FollowUpLastModifyUser: "Test User",
//                                            TotalComment: 0,
//                                            Comment: null,
//                                            Customer: {
//                                                ContactId: "123",
//                                                CustomerName: "Test Name",
//                                                CustomerAddress: "Test Address",
//                                                CustomerMailId: "abc@gmail.com",
//                                                CustomerNumber: "9999999999"
//                                            },
//                                            FollowUpID: "1234",
//                                            FollowUpStatus: "Complete",
//                                            FollowUpType: "Test Type",
//                                            FollowUpLabel: "No label",
//                                            IsPersonal: false,
//                                            ContactID: "123",
//                                            Owner: "Test owner",
//                                            CustomerName: "Test Name",
//                                            FollowUpCreationDate: new Date().toUTCString(),
//                                            FollowUpDueDate: new Date().toUTCString(),
//                                            FollowUpSubject: "Test subject",
//                                            SkillAddress: "Skill 1",
//                                            IsQueued: false
//                                        }
//                                    ]

//                                }]
//                        }
//                        )));
//                });
//            let commentAdd: FollowUpComment = new FollowUpComment("Test string", new Date().toUTCString(), "Test user");
//            let comment: FollowUpComment[] = [];
//            comment.push(commentAdd);
//            let followupcomment = "";
//            let customer = new Customer("12", "Armstrongb", "Armstrongbstreet1", "9030411298",null);
//            let followupitem = new FollowUpModel("123", "123", 0, 0, customer,
//                1, 1, 1, false, "Jed Bartlett",
//                new Date().toUTCString(), "Test Subject", comment, "--Select Field--",null);
//            followupModalService.reqUpdateFollowUp(followupitem).subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));


//    it('should set edit mode for follow up item true',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Status: false,
//                                    Message: "string",
//                                    data: [
//                                        {
//                                            UserID: "Test User",
//                                            FollowUpChannel: "Fax",
//                                            FollowUpLastModifiedDate: new Date().toUTCString(),
//                                            FollowUpCompleteDate: new Date().toUTCString(),
//                                            FollowUpLastModifyUser: "Test User",
//                                            TotalComment: 0,
//                                            Comment: null,
//                                            Customer: {
//                                                ContactId: "123",
//                                                CustomerName: "Test Name",
//                                                CustomerAddress: "Test Address",
//                                                CustomerMailId: "abc@gmail.com",
//                                                CustomerNumber: "9999999999"
//                                            },
//                                            FollowUpID: "1234",
//                                            FollowUpStatus: "Complete",
//                                            FollowUpType: "Test Type",
//                                            FollowUpLabel: "No label",
//                                            IsPersonal: false,
//                                            ContactID: "123",
//                                            Owner: "Test owner",
//                                            CustomerName: "Test Name",
//                                            FollowUpCreationDate: new Date().toUTCString(),
//                                            FollowUpDueDate: new Date().toUTCString(),
//                                            FollowUpSubject: "Test subject",
//                                            SkillAddress: "Skill 1",
//                                            IsQueued: false
//                                        }
//                                    ]

//                                }]
//                        }
//                        )));
//                });
//            followupModalService.reqSetFollowUpEditMode("123", "12", true).subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));

//    it('should set edit mode for follow up item true',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Status: false,
//                                    Message: "string",
//                                    data: [
//                                        {
//                                            UserID: "Test User",
//                                            FollowUpChannel: "Fax",
//                                            FollowUpLastModifiedDate: new Date().toUTCString(),
//                                            FollowUpCompleteDate: new Date().toUTCString(),
//                                            FollowUpLastModifyUser: "Test User",
//                                            TotalComment: 0,
//                                            Comment: null,
//                                            Customer: {
//                                                ContactId: "123",
//                                                CustomerName: "Test Name",
//                                                CustomerAddress: "Test Address",
//                                                CustomerMailId: "abc@gmail.com",
//                                                CustomerNumber: "9999999999"
//                                            },
//                                            FollowUpID: "1234",
//                                            FollowUpStatus: "Complete",
//                                            FollowUpType: "Test Type",
//                                            FollowUpLabel: "No label",
//                                            IsPersonal: false,
//                                            ContactID: "123",
//                                            Owner: "Test owner",
//                                            CustomerName: "Test Name",
//                                            FollowUpCreationDate: new Date().toUTCString(),
//                                            FollowUpDueDate: new Date().toUTCString(),
//                                            FollowUpSubject: "Test subject",
//                                            SkillAddress: "Skill 1",
//                                            IsQueued: false
//                                        }
//                                    ]

//                                }]
//                        }
//                        )));
//                });
//            followupModalService.reqRefreshFollowUpEditMode("123", "12").subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));

//    it("user id should be returned ", async(inject([FollowUpService], (followupModalService) => {
//        followupModalService.userid = "2";
//        expect(followupModalService.getUserID()).toContain("2");

//    })));


//    it('should set edit mode for follow up item true',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Status: false,
//                                    Message: "string",
//                                    data: [
//                                        {
//                                            Message: "Skill queued"
//                                        }
//                                    ]

//                                }]
//                        }
//                        )));
//                });
//            followupModalService.queueAnyTask("123", "Test Skill", "502", "302", "123").subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));

//    it('should return skills',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Status: false,
//                                    Message: "string",
//                                    data: [
//                                        "Skill 1,Skill 2,Skill 3,Skill 4"
//                                    ]

//                                }]
//                        }
//                        )));
//                });
//            followupModalService.getListofSkills().subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));

//    it('should return configuration of particular user',
//      async(inject([FollowUpService], (followupModalService) => {
//            mockBackend.connections.subscribe(
//                (connection: MockConnection) => {
//                    connection.mockRespond(new Response(
//                        new ResponseOptions({
//                            body: [
//                                {
//                                    Status: false,
//                                    Message: "string",
//                                    data: [
//                                        {
//                                            Labels: [
//                                                {
//                                                    LabelID: 1,
//                                                    Description: "#ffffff",
//                                                    LabelName: "No Label"
//                                                },
//                                                {
//                                                    LabelID: 2,
//                                                    Description: "#7ae7bf",
//                                                    LabelName: "Mint"
//                                                },
//                                                {
//                                                    LabelID: 3,
//                                                    Description: "#fbd75b",
//                                                    LabelName: "Yellow"
//                                                },
//                                                {
//                                                    LabelID: 4,
//                                                    Description: "#ffb878",
//                                                    LabelName: "Orange"
//                                                },
//                                                {
//                                                    LabelID: 5,
//                                                    Description: "#dbadff",
//                                                    LabelName: "Pink"
//                                                },
//                                                {
//                                                    LabelID: 6,
//                                                    Description: "#8f7ce2",
//                                                    LabelName: "Purple"
//                                                },
//                                                {
//                                                    LabelID: 7,
//                                                    Description: "#46d6db",
//                                                    LabelName: "Teal"
//                                                }
//                                            ],
//                                            Status: [
//                                                {
//                                                    StatusID: 1,
//                                                    Description: "New"
//                                                },
//                                                {
//                                                    StatusID: 2,
//                                                    Description: "InProgress"
//                                                },
//                                                {
//                                                    StatusID: 3,
//                                                    Description: "Complete"
//                                                }
//                                            ],
//                                            Types: [
//                                                {
//                                                    TypeID: 1,
//                                                    Description: "Billing"
//                                                },
//                                                {
//                                                    TypeID: 3,
//                                                    Description: "Sales"
//                                                },
//                                                {
//                                                    TypeID: 4,
//                                                    Description: "Shipping"
//                                                },
//                                                {
//                                                    TypeID: 5,
//                                                    Description: "Delivery"
//                                                },
//                                                {
//                                                    TypeID: 6,
//                                                    Description: "Operations"
//                                                },
//                                                {
//                                                    TypeID: 7,
//                                                    Description: "Marketing"
//                                                },
//                                                {
//                                                    TypeID: 8,
//                                                    Description: "PreSales"
//                                                },
//                                                {
//                                                    TypeID: 9,
//                                                    Description: "Development"
//                                                },
//                                                {
//                                                    TypeID: 10,
//                                                    Description: "CustomerSupport"
//                                                }
//                                            ]
//                                        }
//                                    ]

//                                }]
//                        }
//                        )));
//                });
//            followupModalService.getConfiguration("2").subscribe(
//                (data) => {
//                    expect(data.length).toBe(1);
//                });
//        })));

//});
