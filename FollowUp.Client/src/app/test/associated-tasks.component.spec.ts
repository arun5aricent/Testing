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
import { MediaRelationTypeEnum } from '../followups/followup-models/media-relation-type-enum';
describe('AssociatedTasksComponent (templateUrl)', () => {

    let comp: AssociatedTasksComponent;
    let fixture: ComponentFixture<AssociatedTasksComponent>;
    let de;
    let followUpService: FollowUpService;
    var originalTimeout;
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

  let taskforPopUp = {
    "TaskId": "044e186b-ae44-4c37-8997-80f270faf1e8",
    "ChannelType": 4,
    "ChannelSubType": 150,
    "ContactReason": "",
    "ContactReasonDetail": "",
    "AcceptTime": "2018-02-14T12:52:04+00:00",
    "Interaction": "{\"SubInteractionId\":2,\"viewModelId\":\"\",\"ActiveTab\":true,\"ExternalId\":\"\",\"Comment\":\"\"}",
    "TaskStatus": "ACTIVE",
    "ChannelName": "Email",
    "ChannelIcon": "ui-icon-email-small",
    "DisplayName": "Test Name",
    "AgentName": "Test name",
    "Channel": "Test"
  }
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
                FollowupModalComponent,
                TrusteURLPipe,
                TrustedHTMLPipe,
                FormatDatePipe,
                AssociatedTasksComponent,
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
        fixture = TestBed.createComponent(AssociatedTasksComponent);
        comp = fixture.componentInstance;
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('associated task modal should be shown', () => {
        fixture.detectChanges();
        comp.show()
        expect(comp.taskModalDirective.isShown).toBeTruthy();
        comp.taskModalDirective.hide();
    });

    it('correct media link id should be fetched', () => {
        expect(comp.mediaEpcIdFromEpcLink("Test1:Test2")).toBe("Test1");
        expect(comp.mediaEpcIdFromEpcLink(null)).toBe("");
    });

    it('correct icon should be retrieved', () => {
        comp.channelMap = null;
        var result = comp.getIconPerChannel(4, 150);
        expect(result).toBe("email");
        result = comp.getIconPerChannel(4, 157)
        expect(result).toBe("email");
        result = comp.getIconPerChannel(150, 157);
        expect(result).toBe("channel-anytask");
    });

  it('associated task details should be set correctly', () => {
    comp.setAssociatedTaskDetails("Test Data")
    expect(comp.taskForPopup).toBe("Test Data");
  });
  it('modal data should be reset correctly', () => {
    comp.resetModalData();
    expect(comp.associatedTaskCustomerBanner).toBe("");
    expect(comp.selectedTaskMediaError).toBe("");
  });
  it('required paper link url should be fetched', () => {
    var result = "test path uri/static/internal/common/img/paperclip.png";
    expect(comp.getPaperClipLink()).toBe(result);
  });
  it('correct CSS class for chat icon should be shown', () => {
    var result = comp.getCSSClassForChat("customer");
    expect(result).toBe("ihModalSMSReceive");
    result = comp.getCSSClassForChat("customer.attachment");
    expect(result).toBe("ihModalSMSReceive");
    result = comp.getCSSClassForChat("agent");
    expect(result).toBe("ihModalSMSSend");
    result = comp.getCSSClassForChat("agent.attachment");
    expect(result).toBe("ihModalSMSSend");
    result = comp.getCSSClassForChat("otheragentconsult");
    expect(result).toBe("ihModalSMSOtherAgentReceive");
    result = comp.getCSSClassForChat("otheragentsend");
    expect(result).toBe("ihModalSMSOtherAgentSend");
    result = comp.getCSSClassForChat("otheragentsend.attachment");
    expect(result).toBe("ihModalSMSOtherAgentSend");
result = comp.getCSSClassForChat("default");
      expect(result).toBe("ihModalSMSConcierge");
    });

    it('correct task data should be set', () => {
        fixture.detectChanges();
        comp.taskModalDirective.hide();
        comp.taskDataReceived(associatedTaskDetail);
      expect(comp.associatedTaskCustomerBanner).toBe(associatedTaskDetail.customerBanner);
      
  });
  it('correct task data should be set', () => {
    fixture.detectChanges();
    comp.taskModalDirective.show();
    comp.taskDataReceived(associatedTaskDetail);
    expect(comp.associatedTaskCustomerBanner).toBe(associatedTaskDetail.customerBanner);

  });
  it('correct task media should be set', () => {
    fixture.detectChanges();
    comp.taskModalDirective.hide();
    comp.mediaDataReceived(associatedTaskMedia);
    expect(comp.selectedTaskMediaError).toBe(associatedTaskMedia.selectedTaskMediaError);

  });
  it('correct task media should be set', () => {
    fixture.detectChanges();
    comp.taskModalDirective.show();
    comp.mediaDataReceived(associatedTaskMedia);
    expect(comp.selectedTaskMediaError).toBe(associatedTaskMedia.selectedTaskMediaError);

  });

  it('async loaders should start correctly', () => {
    comp.taskForPopup = taskforPopUp;
    comp.isTaskCompleted = false;
    comp.startLoaders();
    expect(comp.isTaskMediaLoading).toBeTruthy();
    comp.isTaskCompleted = true;
    comp.startLoaders();
    expect(comp.isTaskMediaLoading).toBeTruthy();
  });

  it('url should be encoded correctly', () => {
    let testUrl = "https://google.com";
    expect(comp.urlencode(testUrl)).toBe(testUrl);
    testUrl = "https://google.com?#";
    let expectedUrl = "https://google.com?%23";
    expect(comp.urlencode(testUrl)).toBe(expectedUrl);
  });
  it('completed value should be set correctly', () => {
    comp.isCompleted(true);
    expect(comp.isTaskCompleted).toBeTruthy();
    comp.isCompleted(false);
    expect(comp.isTaskCompleted).toBeFalsy();
  });
  it('correct email label name should be fetched', () => {
    expect(comp.getEmailLabelName(MediaRelationTypeEnum.Original)).toBe("Email");
    expect(comp.getEmailLabelName(MediaRelationTypeEnum.Reply)).toBe("Reply");
    expect(comp.getEmailLabelName(MediaRelationTypeEnum.Forward)).toBe("Forward");
    expect(comp.getEmailLabelName(MediaRelationTypeEnum.Additional)).toBe("Initiated");
    expect(comp.getEmailLabelName(MediaRelationTypeEnum.Resend)).toBe("Resend");
    expect(comp.getEmailLabelName(MediaRelationTypeEnum.AutoReply)).toBe("AutoReply");
  });
  it('correct email type image should be fetched', () => {
    expect(comp.getEmailTypeImage(MediaRelationTypeEnum.Original)).toBe("uwf-email");
    expect(comp.getEmailTypeImage(MediaRelationTypeEnum.Reply)).toBe("uwf-mail-reply");
    expect(comp.getEmailTypeImage(MediaRelationTypeEnum.Forward)).toBe("uwf-mail-forward");
    expect(comp.getEmailTypeImage(MediaRelationTypeEnum.Additional)).toBe("uwf-email-outbound");
    expect(comp.getEmailTypeImage(MediaRelationTypeEnum.Resend)).toBe("uwf-mail-resend");
    expect(comp.getEmailTypeImage(MediaRelationTypeEnum.AutoReply)).toBe("uwf-mail-replyooo");
    expect(comp.getEmailTypeImage(MediaRelationTypeEnum.BulkReply)).toBe("uwf-mail-replyallbulk");
  });
  it('correct transcript message should be received', () => {
    expect(comp.getTranscriptMessage("Test", "")).toBe("will not be sent");
    expect(comp.getTranscriptMessage("Test", "123")).toBe("will be sent to 123");
    expect(comp.getTranscriptMessage("sent", "123")).toBe("SentTo 123");
    expect(comp.getTranscriptMessage("", "123")).toBe("");
  });


});

