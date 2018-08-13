import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppConstant } from '../util/util.appconstant';
import { MediaRelationTypeEnum } from '../followup-models/media-relation-type-enum';
import { TaskChannelMap } from '../followup-models/task-channel-map';

declare var upstream;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'associatedTask',
    templateUrl: `./associated-tasks.component.html`,
    styleUrls: ['./associated-tasks.component.css']
})
export class AssociatedTasksComponent {
    public static TAG = 'AssociatedTasksModal';

    @Input() public UIParams: any;
    @ViewChild("associatedTaskModal") public taskModalDirective: ModalDirective;
    @Output() public hideAssociatedTaskModalNotify: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public fetchMediaDetialNotify: EventEmitter<any> = new EventEmitter<any>();
    
    public selectedTaskDetails;
    public selectedTaskComments: any;
    public associatedTaskIcon:string = "";
    public associatedTaskCustomerBanner:string = "";
    public associatedTaskAgentName;
    public taskForPopup;
    public selectedTaskMedia;
    public userId:any;
    public isTaskMediaLoading: boolean = false;
    public selectedTaskMediaError : string = "";
    public isTaskDetailLoading: boolean = false;
    public popout_task_HtmlData : string = "";
    public paperClipLink:string;
    public isTaskCompleted : boolean = false;
    public localization = upstream.gadget.locale.InteractionActivity;
    public channelMap: Map<number, Map<number, string>> = null;

    constructor(private appRef: ChangeDetectorRef) {
    
    }

     /** close associated task modal and set values to default **/
    closeAssociatedTaskModal() {
        this.isTaskDetailLoading = false;
        this.isTaskMediaLoading = false;
        this.taskModalDirective.hide();
        //Arrow function to point correct this
        setTimeout(() => {
            this.hideAssociatedTaskModalNotify.emit(true);
            this.refreshDOM();
        }, 250);
        this.refreshDOM();
    }

     /** show associated task modal **/
    show() {
        this.taskModalDirective.show();
    }

     /** method to get mediaEpcId **/
    mediaEpcIdFromEpcLink = function (epcLink) {
        var strArray = [];
        return (!!epcLink) ? epcLink.split(AppConstant.STRING_COLON)[AppConstant.ZERO_INDEX] : AppConstant.EMPTY_STRING;
    }

     /** get icon based on channel and subchannel **/
    getIconPerChannel = function (channelType, channelSubType) {
        var icon = "";
        if (this.channelMap == null) {
            this.channelMap = TaskChannelMap.getInstance().getChannelMap();
        }
        if (this.channelMap.has(channelType)) {
            if (this.channelMap.get(channelType).has(channelSubType)) {
                icon = this.channelMap.get(channelType).get(channelSubType);
            } else {
                icon = this.channelMap.get(channelType).get(-1);
            }
        } else {
            icon = this.channelMap.get(-1).get(-1);
        }
        return icon;
    }

     /** set associated task details fetched**/
    setAssociatedTaskDetails(taskData) {
        upstream.Logger.info(AssociatedTasksComponent.TAG, "associatedtask is" + JSON.stringify(taskData));
        this.taskForPopup = taskData;
    }

     /**set userID **/
    setUserId(userId) {
        upstream.Logger.info(AssociatedTasksComponent.TAG, "User==> in setuserid "+userId);
        this.userId = userId;
        this.refreshDOM();
    }

    /**set modal realted data to default **/
    resetModalData() {
        this.selectedTaskDetails = undefined;
        this.selectedTaskMedia = undefined;
        this.associatedTaskCustomerBanner = "";
        this.selectedTaskMediaError = "";
        this.popout_task_HtmlData = "";
    }

    /**get paper clip image**/
    getPaperClipLink() {
        return upstream.gadget.Config.baseUri + AppConstant.PAPER_CLIP_IMAGE_SCHEMA;
    }

    /**method to verfiy whether the task has media or not **/
    showTaskNoMediaContent() {
        return this.isTaskMediaLoading ? false : ((this.selectedTaskMedia && (this.selectedTaskMedia.length <= AppConstant.ZERO_LENGTH || this.selectedTaskMediaError !== AppConstant.EMPTY_SINGLE_QUOTE)) ? true : false);
    };

    /**method to get required CSS clas for chat **/
    getCSSClassForChat(typeOfChat) {
        typeOfChat = typeOfChat ? typeOfChat.toLowerCase() : AppConstant.EMPTY_STRING;
        if (typeOfChat === AppConstant.CHAT_TYPE_CUSTOMER || typeOfChat === AppConstant.CHAT_TYPE_CUSTOMER_ATTACHMENT)
            return AppConstant.CHAT_CSS_SMS_RECEIVE;
        else if (typeOfChat === AppConstant.CHAT_TYPE_AGENT || typeOfChat === AppConstant.CHAT_TYPE_AGENT_ATTACHMENT)
            return AppConstant.CHAT_CSS_SMS_SEND;
        else if (typeOfChat === AppConstant.CHAT_TYPE_OTHER_AGENT_CONSULT)
            return AppConstant.CHAT_CSS_SMS_OTHER_AGENT_RECEIVE;
        else if (typeOfChat === AppConstant.CHAT_TYPE_OTHER_AGENT_SEND || typeOfChat === AppConstant.CHAT_TYPE_OTHER_AGENT_SEND_ATTACHMENT)
            return AppConstant.CHAT_CSS_SMS_OTHER_AGENT_SEND;
        else
            return AppConstant.CHAT_CSS_SMS_CONCIERGE;
    }

    /**method to set task data received **/
    taskDataReceived(data) {
        upstream.Logger.info(AssociatedTasksComponent.TAG, "fetchTaskRequestEventcalled acknowledgment received "+JSON.stringify(data));
        this.associatedTaskCustomerBanner = data.customerBanner;
        this.selectedTaskDetails = data.selectedTaskDetails;
        this.selectedTaskComments = data.selectedTaskComments;

        this.popout_task_HtmlData = data.popOutHtmlData;
        this.refreshDOM();
        if (!this.taskModalDirective.isShown) {
            setTimeout(() => {
                this.isTaskDetailLoading = false;
                this.taskModalDirective.show();
                this.refreshDOM();
            }, 300);
            this.refreshDOM();
        } else {
            this.isTaskDetailLoading = false
            this.refreshDOM();
        }
        
    }

     /**method to set media data received **/
    mediaDataReceived(data) {
        upstream.Logger.info(AssociatedTasksComponent.TAG, "fetchMediaRequestEventcalled acknowledgment received "+JSON.stringify(data));
        this.selectedTaskMedia = data.selectedTaskMedia;
        this.selectedTaskMediaError = data.selectedTaskMediaError;
        this.refreshDOM();
        this.isTaskMediaLoading = false;
        if (!this.taskModalDirective.isShown) {
            setTimeout(() => {
                this.isTaskMediaLoading = false;
                this.stopLoaders();
                if (this.selectedTaskMediaError == "") {
                    this.addTargetBlank();
                }
                this.taskModalDirective.show();
                this.refreshDOM();
            }, 300);
        } else {
            this.isTaskMediaLoading = false;
            this.refreshDOM();
        }
        
    }

     /**method to start loaders and set few task details **/
    startLoaders() {
        this.isTaskMediaLoading = true;
        this.isTaskDetailLoading = true;
        this.resetModalData();
        if (this.isTaskCompleted) {
            this.associatedTaskIcon = this.getIconPerChannel(this.taskForPopup.ChannelType, this.taskForPopup.ChannelSubType);
            this.associatedTaskAgentName = this.taskForPopup.DisplayName;
        } else {
            this.associatedTaskIcon = this.getIconPerChannel(this.taskForPopup.Channel, this.taskForPopup.ChannelSubType);
            this.associatedTaskAgentName = this.taskForPopup.AgentName;
        }
        // this.associatedTaskModal.show();
    }


     /**method to encode url **/
    urlencode(url) {
        return encodeURI(url).replace(AppConstant.HASHTAG, AppConstant.PER_TWENTY_THREE);
    }

     /**method to add blank target for all a tags **/
    addTargetBlank() {
        var taskMediaSection = document.querySelectorAll('#taskMediaSection article a, #interactionMediaSection article a');
        var length = taskMediaSection.length
        for (var index = 0; index < length; index++) {
            taskMediaSection.item(index).setAttribute('target', '_blank');
        }
    }

     /**method to set task complete status **/
    isCompleted(value) {
        this.isTaskCompleted = value;
        this.refreshDOM();
    }

     /** method to get email label name
       * Original = 0,
       * Reply = 1,
       * Forward = 2,
       * Additional = 3
       * Resend  = 4
       * AutoReply = 5
       * Apply translations when they become available
     **/
    getEmailLabelName = function (mediaRelationType) {
        var labelName = "";
        var mediaRelationEnumType = <MediaRelationTypeEnum>mediaRelationType;
        switch (mediaRelationEnumType) {
            case MediaRelationTypeEnum.Original:
                labelName = this.localization.OriginalEmail;
                break;
            case MediaRelationTypeEnum.Reply:
                labelName = this.localization.AgentReply;
                break;
            case MediaRelationTypeEnum.Forward:
                labelName = this.localization.AgentForward;
                break;
            case MediaRelationTypeEnum.Additional:
                labelName = this.localization.AgentInitiated;
                break;
            case MediaRelationTypeEnum.Resend:
                labelName = this.localization.AgentResend;
                break;
            case MediaRelationTypeEnum.AutoReply:
                labelName = this.localization.AutoReply;
                break;
        }
        return labelName;
    }

     /**method to get emial type image **/
    getEmailTypeImage = function (mediaRelationType) {
        var imageName = "";
        var mediaRelationEnumType = <MediaRelationTypeEnum>mediaRelationType;
        switch (mediaRelationEnumType) {
            case MediaRelationTypeEnum.Original:
                imageName = AppConstant.IMAGE_TYPE_EMAIL;
                break;
            case MediaRelationTypeEnum.Reply:
                imageName = AppConstant.IMAGE_TYPE_MAIL_REPLY;
                break;
            case MediaRelationTypeEnum.Forward:
                imageName = AppConstant.IMAGE_TYPE_MAIL_FORWARD;
                break;
            case MediaRelationTypeEnum.Additional:
                imageName = AppConstant.IMAGE_TYPE_EMAIL_OUTBOUND;
                break;
            case MediaRelationTypeEnum.Resend:
                imageName = AppConstant.IMAGE_TYPE_MAIL_RESEND;
                break;
            case MediaRelationTypeEnum.AutoReply:
                imageName = AppConstant.IMAGE_TYPE_MAIL_AUTOREPLY;
                break;
	        case MediaRelationTypeEnum.BulkReply:
		        imageName = AppConstant.IMAGE_TYPE_MAIL_BULKREPLY;
		        break;
        }
        return imageName;
    }

     /**method to get transcrip message **/
    getTranscriptMessage = function (transcriptStatus, sentEmailAddress) {
        var message = "";
        if (transcriptStatus) {
            if (sentEmailAddress) {
                if (transcriptStatus.toLocaleLowerCase() === AppConstant.SENT)
                    message = this.localization.TranscriptSentTo + AppConstant.BLANK_SPACE + sentEmailAddress;
                else
                    message = this.localization.TranscriptWillBeSentTo + AppConstant.BLANK_SPACE + sentEmailAddress;
            }
            else {
                message = this.localization.TranscriptNotSentDueToMissingEmailAddress;
            }
        }
        return message;
    }

    private refreshDOM() {
        upstream.Logger.info(AssociatedTasksComponent.TAG, "Associated ngAfterContentChecked ");
        if (!this.appRef['destroyed']) {
            this.appRef.detectChanges()
        }
    }

    stopLoaders() {
        setTimeout(() => {
            if (this.taskModalDirective.isShown) {
                this.isTaskDetailLoading = false;
                this.isTaskMediaLoading = false;
                this.refreshDOM();
            }
        }, 900);

    }

}
