import { UserFollowUpTypes } from './../followup-models/followup-user-types';
import { FollowUpService } from '../shared/followup.service';
import { FollowupConfirmationComponent } from '../followup-confirmation/followup-confirmation.component';
import { Carousel } from './../carousel/carousel.component';
import { FollowupConfiguration } from '../followup-models/followup-configuration';
import { Customer } from '../followup-models/customer';
import { FollowUpInsert } from '../followup-models/followup-insert';
import {
	 ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit,
     Output, ViewChild, ChangeDetectionStrategy
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Slide } from '../Carousel/slide.component';
import { DaterangePickerComponent, DaterangepickerConfig } from 'ng2-daterangepicker';
import { FollowUpComment } from '../followup-models/followup-comment';
import { FollowupDetailRes } from '../followup-models/followup-detail-res';
import { FollowupCreateRes } from '../followup-models/followup-create-res';

import { FollowupDetail } from '../followup-models/followup-detail';
import { FollowUpModel } from '../followup-models/followup-model';
import { FollowUpFilter } from '../followup-models/followup-filters';
import { Followup } from '../followup-models/followup';
import { FollowupRes } from '../followup-models/followup-res';
import { TaskFollowUpDetails } from '../followup-models/followup-taskdetail'
import { AppConstant } from '../util/util.appconstant';
import { FollowUpEditDetails } from '../followup-models/followup-editDetails';
import { FollowUpLocalDetails } from '../followup-models/followup-localDetails';

import { AssociatedTasksComponent } from '../associated-task/associated-tasks.component';
import { TaskChannelMap } from '../followup-models/task-channel-map';
import { FollowUpNotification } from '../followup-models/followup-notification';
import { DateTimeUtil } from '../util/util.dateTime';
import Timer = NodeJS.Timer;
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import 'moment/locale/it';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/pt';
import 'moment/locale/fr';
declare var upstream: any;
declare var gadgets: any;


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'common',
    templateUrl: `./followup-modal.component.html`,
    styleUrls: ['./followup-modal.component.css'],
    host: { 'window:beforeunload': 'cleaupTask' }
})
export class FollowupModalComponent implements OnInit, OnDestroy {
    public isFollowupDetailChanged: boolean = true;
    private static TAG = 'FollowUpModal';
    @Input() public currPageNumber: number;
    @ViewChild('commentBox') public commentBox: ElementRef;
    @Input() public UIParams: any;
    @ViewChild('childModal') public childModal: ModalDirective;
    @ViewChild('confirmationModal') public confirmationModal: FollowupConfirmationComponent;
    @ViewChild('associatedTaskModal') public associatedTaskModal: AssociatedTasksComponent;
    @ViewChild('btnCompFollowUp') public completeFollowUpButton;
    @Input() public followupItems: Followup[];
    @Input() public slides: Followup[] = [];
    public configurationData: FollowupConfiguration;
    public editFollowUpUserTypes: UserFollowUpTypes[];
    public isInEditmode: boolean = true;
    @Output() public pageChange: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() public editModeEnable: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() public errorMessageNotify: EventEmitter<any> = new EventEmitter<any>();
    @Output() public fetchMediaDetialNotify: EventEmitter<any> = new EventEmitter<any>();
    @Output() public fetchInteractionMediaDetailNotify: EventEmitter<any> = new EventEmitter<any>();
    @Output() public dueDateChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() public modalShown: EventEmitter<Boolean> = new EventEmitter<Boolean>();

    public localization = upstream.gadget.locale;
    public selectTagWidth = AppConstant.DEFAULT_SELECT_TAG_SIZE;
    public isOpenedFromActiveTask = false;
    public isNewFollowUp: boolean = false;
    public singleDate: any; // to save selected date
    private insertFollowUp: FollowUpInsert;
    public errorMessage: any;
    public activeSlide: boolean;
    public comments: Array<FollowUpComment> = [];
    public updatecomments: Array<FollowUpComment> = [];
    public selectedLabelKey: number;
    public followupDetailRes: FollowupDetailRes;
    public followupDetail: FollowupDetail;
    public appliedFilters: FollowUpFilter;
    public followupIds: Array<string> = [];
    public isPageFromNext: boolean;
    public offset: number;
    public followupSubject: string = AppConstant.BLANK_STRING;
    public followUpType: number = -1;
    public agentName: string;
    public followupChannel: number;
    public contactAdress: string;
    public contactId: string;
    public customerName: string;
    public contactNumber: string;
    public userId: string;
    public followupDueDate: string;
    public isPersonal: boolean;
    public totalComment: number = 1;
    public customer: Customer;
    public followupStatus: number;
    public followupcomment: string;
    public maxPage: number;
    public isSaveOnly: boolean = false;
    public showTypeRequiredWarning: boolean = false;
    public showSubjectRequiredWarning: boolean = false;
    public showDueDateInvalidWarning = false;
    public showCustomDateInvalidWarning = false;
    private interval: number = 30 * 60 * 1000;
    private currentInterval: any;
    public currentIndex: number;
    public selectedSkill: string = AppConstant.DEFAULT_VAL_N_QUEUE;
    public saveAndUpdateButtonName: string;
    public queueButtonName: string = AppConstant.DEFAULT_VAL_QUEUE;
    public isDueDateChanged: boolean = false;
    public isNewPersonal = false;
    public isHideModal = true;
    public isAssociatedTask = false;
    @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;
    public isRequesting: boolean;
    private _isHide: boolean;
    private setFollowUpComplete: boolean = false;
    private listOfSkills: Array<string> = [];

    private followUpEditDetails: FollowUpEditDetails;
    private followUpLocalDetails: FollowUpEditDetails;
    public _taskId: string;
	private hasKnowledgeBaseArticle = false;
	private showInsertButton = false;
	private insertButtonTimeout: Timer;
	private articleTitle = "";
	private articleTooltip = "";
	private articleContent = "";
    
    public activeTaskInteractionId: string;
    public isDraftFollowUp: boolean = false;
    @ViewChild(AppConstant.CAROUSEL_CMPT_ID) public carouselComponent: Carousel;
    public selectedSlide: Slide; 
    public hub = gadgets.Hub;
    public taskRequestData: TaskFollowUpDetails;
    public channelType: number;
    public associatedTaskDetails;
    public followUpNotification: Array<FollowUpNotification> = [];
    public customNotificationDate: string;
    public currentdate = new Date();
    public customRangeSelectedString: string = AppConstant.DFAULT_CUSTOM_DATE_SELECTED_STRING;
    public totalNumberOfRecords: number;
    public activeIndex: number;
    public modalFooterMessage: string;
    private isCustomNotificationChecked: boolean = false;
    private isCustomDateRangePickerVisible: boolean = false;
    private isChecked: boolean = true;
    public currentSlideIndex: number;
    public notificationLabelLength = AppConstant.NOTIFICATION_LABEL_MAX_LENGTH;
    private sub: Subscription;
    public singlePicker ;

    public customDateOptions;

    constructor(private _followupService: FollowUpService,
        private daterangepickerOptions: DaterangepickerConfig, private ref: ChangeDetectorRef) {
        
        this.daterangepickerOptions.settings = {
            locale: { format: AppConstant.DATE_FORMAT },
            alwaysShowCalendars: false,
        };
        this.daterangepickerOptions.skipCSS = true;
        this.singleDate = Date.now();
	
        let me: FollowupModalComponent = this;
	    this.hub.subscribe("com.upstreamworks.events.knowledgeBaseArticle", (topic, data) => {
            me.knowledgeBaseArticleSelected(me, topic, data);
            if (!this.ref['destroyed']) {
                me.ref.detectChanges();
            }
	    });
	    this.hub.subscribe("com.upstreamworks.events.knowledgeBaseArticleInserted", (topic, data) => {
            me.resetKnowledgeBaseInsert(me);
            if (!this.ref['destroyed']) {
                me.ref.detectChanges();
            }
        });
        moment.locale(gadgets.Prefs().getLang());

        if (!this.UIParams)
            this.UIParams = upstream.gadget.locale.FollowUpGadget;

        let customRanges: any[] = [];
        //update showDateRangePickerCalled() method whenever first range for custom notification is changed
        customRanges[this.UIParams.Tomorrow] = [new Date().setDate(this.currentdate.getDate() + AppConstant.TOMORROW), new Date().setDate(this.currentdate.getDate() + AppConstant.TOMORROW)];
        customRanges[this.UIParams.In3Days] = [new Date().setDate(this.currentdate.getDate() + AppConstant.IN_3_DAYS), new Date().setDate(this.currentdate.getDate() + AppConstant.IN_3_DAYS)];
        customRanges[this.UIParams.In1Week] = [new Date().setDate(this.currentdate.getDate() + AppConstant.IN_1_WEEK), new Date().setDate(this.currentdate.getDate() + AppConstant.IN_1_WEEK)];

        this.customDateOptions = {
            singleDatePicker: true,
            showDropdowns: true,
            timeZone: null,
            timePicker: false,
            minDate: new Date(),
            autoApply: true,
            ranges: customRanges,
            opens: AppConstant.DATE_PICKER_IN_RIGHT,
            locale: {
                format: 'YYYY-MM-DD',
                customRangeLabel: this.UIParams.Custom,
                applyLabel: this.UIParams.Apply,
                cancelLabel: this.UIParams.Cancel
            }
        };
        this.singlePicker = {
            singleDatePicker: true,
            timePicker: true,
            minDate: new Date(),
            opens: AppConstant.DATE_PICKER_IN_RIGHT,
            startDate: new Date(new Date().setDate(this.currentdate.getDate() + AppConstant.IN_1_WEEK)),
            endDate: new Date(new Date().setDate(this.currentdate.getDate() + AppConstant.IN_1_WEEK)),
            locale: {
                format: 'YYYY-MM-DD',
                applyLabel: this.UIParams.Apply,
                cancelLabel: this.UIParams.Cancel
            }
        };
    }
	
	private commentEnter(event: any) {
		if (this.hasKnowledgeBaseArticle) {
			clearTimeout(this.insertButtonTimeout);
			this.articleTooltip = this.localization.Common.InsertArticleTitle + " " + this.articleTitle;
            this.showInsertButton = true;
            this.refreshDOM();
		}
	}
	
	private commentLeave(event: any) {
		let commentBox = event.srcElement;
		if (this.showInsertButton && !commentBox.parentElement.querySelector(":focus")) {
			let me = this;
			me.insertButtonTimeout = setTimeout(() => {
				me.showInsertButton = false;
				this.refreshDOM();
			}, 400);
		}
	}
	
	private insertHover(event: any) {
		clearTimeout(this.insertButtonTimeout);
	}
	
	private knowledgeBaseArticleSelected(me: FollowupModalComponent, topic: any, data: any) {
		me.hasKnowledgeBaseArticle = true;
		me.articleTitle = data.title;
        me.articleContent = data.content;
        this.refreshDOM();
	}
	
	private resetKnowledgeBaseInsert(me: FollowupModalComponent) {
		me.hasKnowledgeBaseArticle = false;
		me.showInsertButton = false;
		me.articleTitle = "";
        me.articleContent = "";
        this.refreshDOM();
	}
	
	private html2text(html) {
		let tag = document.createElement('div');
		tag.innerHTML = html;
		return tag.innerText;
	}
	
	private insertKnowledgeBaseArticle() {
		if (!this.hasKnowledgeBaseArticle) {
			return;
		}
		
		let commentBox = this.commentBox.nativeElement;
		let caretPos = commentBox.selectionStart;
		let textAreaTxt = this.followupcomment;
		let htmlFreeText = this.html2text(this.articleContent);
		
		this.followupcomment = textAreaTxt.substring(0, caretPos) + htmlFreeText + textAreaTxt.substring(caretPos);
		
		this.hub.publish("com.upstreamworks.events.knowledgeBaseArticleInserted", this.articleTitle);
		
		this.onChange(this.followupcomment, AppConstant.COMMENT);
		
		this.resetKnowledgeBaseInsert(this);
		
		this.refreshDOM();;
	}
	
    ngOnInit() {
        this.getSkills();
        this.configurationData = new FollowupConfiguration();
        this.isRequesting = true;
        this.selectedSkill = AppConstant.DEFAULT_SKILL;
        this.refreshDOM();
    }

    set taskId(value: string) {
        this._taskId = value
    }

    get taskId(): string {
        return this._taskId;
    }

    /**
     * Method to initialize details for new followup
     * @param isFromDraft :check wheter this method is invoked for draft or not
     */
    initializeNewFollowUp(isFromDraft) {
        upstream.Logger.info(FollowupModalComponent.TAG, "initializeNewFollowUp ");
        var comment: FollowUpComment[] = [];
        this.followupcomment = AppConstant.BLANK_STRING;
        this.followupSubject = AppConstant.BLANK_STRING;
        this.followupDueDate = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
        this.customNotificationDate = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
        this.customRangeSelectedString = this.UIParams.OtherDate;
        this.isCustomNotificationChecked = false;
        this.isCustomDateRangePickerVisible = false;
        this.followUpNotification = [];
        if (this.picker != undefined) {
            this.picker.datePicker.setStartDate(new Date());
            this.picker.datePicker.setEndDate(new Date());
        }
        this.insertFollowUp = new FollowUpInsert(this.userId, this.channelType, 0, this.customer,
            this.configurationData.Status[0].StatusID, AppConstant.DEFAULT_ID, AppConstant.DEFAULT_LABEL, this.isNewPersonal, this.agentName,
            DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING), AppConstant.BLANK_STRING, comment, AppConstant.DEFAULT_SKILL, this.taskRequestData, this.followUpNotification);
        this.setWarningsToDefault();
        this.selectedSkill = AppConstant.DEFAULT_SKILL;
        this.selectedLabelKey = AppConstant.DEFAULT_LABEL;
        this.activeTaskInteractionId = localStorage.getItem("activeTaskInteraction");
        this.refreshDOM();
        this.synchronizeLocalStorageForNewMode(isFromDraft);
    }

    /**
     * check whether there are details in local storage if not enter details for draft FollowUp in local storage
     * @param isFromDraft : is called for draft
     */
    synchronizeLocalStorageForNewMode(isFromDraft) {
        this.followUpLocalDetails = JSON.parse(localStorage.getItem(this.activeTaskInteractionId));
        if (this.activeTaskInteractionId != null && localStorage.getItem(this.activeTaskInteractionId) != null
            && this.followUpLocalDetails.FollowUpDetails.AgentId == this.userId) {
            upstream.Logger.info("New Mode -> key found synchronization begin from storage to details", localStorage.getItem(this.activeTaskInteractionId));
            this.followupSubject = this.followUpLocalDetails.FollowUpDetails.FollowUpSubject;
            this.insertFollowUp.FollowUpSubject = this.followUpLocalDetails.FollowUpDetails.FollowUpSubject;
            this.insertFollowUp.FollowUpDueDate = this.followUpLocalDetails.FollowUpDetails.FollowUpDueDate;
            this.insertFollowUp.FollowUpType = this.followUpLocalDetails.FollowUpDetails.FollowUpType;
            this.selectedLabelKey = this.followUpLocalDetails.FollowUpDetails.FollowUpLabel;
            this.followupcomment = this.followUpLocalDetails.FollowUpDetails.FollowUpComment;
            this.insertFollowUp.IsPersonal = this.followUpLocalDetails.FollowUpDetails.IsPersonal;
            this.insertFollowUp.FollowUpChannel = this.followUpLocalDetails.FollowUpDetails.ChannelType;
            this.followUpLocalDetails.FollowUpDetails.TaskDetail = this.taskRequestData ? this.taskRequestData : this.followUpLocalDetails.FollowUpDetails.TaskDetail;
            this.insertFollowUp.Owner = this.followUpLocalDetails.FollowUpDetails.Owner;
            this.insertFollowUp.TaskDetail = this.taskRequestData ? this.taskRequestData : this.followUpLocalDetails.FollowUpDetails.TaskDetail;
            this.followUpLocalDetails.FollowUpDetails.IsOpen = true;
            this.followUpLocalDetails.FollowUpDetails.CustomerInfo = this.customer;
            this.followUpNotification = this.followUpLocalDetails.FollowUpDetails.Notifications;
            if (this.followUpNotification.length > 0) {
                if (this.followUpNotification.find(x => x.NotificationType == AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE) != undefined) {
                    this.customNotificationDate = this.followUpLocalDetails.FollowUpDetails.customNotificationDate;
                    this.customRangeSelectedString = moment(DateTimeUtil.getDateInLocalFormat(this.customNotificationDate)).format("MM/DD/YYYY");
                    this.isCustomNotificationChecked = true;
                }
            }
            this.isDraftFollowUp = true;
            
        } else if (!isFromDraft) {
             upstream.Logger.info(FollowupModalComponent.TAG, "New Mode -> key not found synchronization begin from details to storage");
            this.followUpLocalDetails = new FollowUpEditDetails();
            this.followUpLocalDetails.FollowUpDetails = new FollowUpLocalDetails();
            this.followUpLocalDetails.FollowUpId = this.activeTaskInteractionId;
            this.followUpLocalDetails.FollowUpDetails.FollowUpSubject = this.followupSubject;
            this.followUpLocalDetails.FollowUpDetails.FollowUpDueDate = this.insertFollowUp.FollowUpDueDate;
            this.followUpLocalDetails.FollowUpDetails.FollowUpType = this.insertFollowUp.FollowUpType;
            this.followUpLocalDetails.FollowUpDetails.FollowUpLabel = this.selectedLabelKey;
            this.followUpLocalDetails.FollowUpDetails.FollowUpComment = this.followupcomment;
            this.followUpLocalDetails.FollowUpDetails.IsPersonal = this.insertFollowUp.IsPersonal;
            this.followUpLocalDetails.FollowUpDetails.TaskDetail = this.insertFollowUp.TaskDetail;
            this.followUpLocalDetails.FollowUpDetails.ChannelType = this.insertFollowUp.FollowUpChannel;
            this.followUpLocalDetails.FollowUpDetails.IsOpen = true;
            this.followUpLocalDetails.FollowUpDetails.Owner = this.insertFollowUp.Owner;
            this.followUpLocalDetails.TimeStamp = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
            this.followUpLocalDetails.FollowUpDetails.AgentId = this.userId;
            this.followUpLocalDetails.FollowUpDetails.CustomerInfo = this.customer;
            this.followUpLocalDetails.FollowUpDetails.Notifications = this.followUpNotification;
            this.followUpLocalDetails.FollowUpDetails.customNotificationDate = this.customNotificationDate;
            this.isDraftFollowUp = false;
            this.saveDraftData(this.activeTaskInteractionId, JSON.stringify(this.followUpLocalDetails), "synchronize else");
        }
        this.getAssociatedTaskDetails(this.insertFollowUp.TaskDetail, AppConstant.SYNCHRONIZE_NEW);
        this.updateEditFollowUpTypeList(false, this.insertFollowUp.FollowUpType);
        this.updateCheckBoxStatusForNotifications();
        this.refreshDOM();
    }

    onSliderNotify(index: number) {
        upstream.Logger.info("in callback index == > " + index);
    }

    /**
     * Callback method for carousel prev button click
     * @param index : previous FollowUp index
     */
    onClickedPrev(index: number) {
        this.isRequesting = true;
        if (index == 0 && this.currPageNumber == 1) {
            upstream.Logger.info(FollowupModalComponent.TAG, " onClickedPrev on last page "+index);
            this.fetchFollowupDetail(0, AppConstant.CLICK_PREV);
            this.carouselComponent.updateFirstVal(true);
            this.currentSlideIndex = index;
        } else if (index < 0 && this.currPageNumber > 1) {
            upstream.Logger.info(FollowupModalComponent.TAG, " onClickedPrev move to prev page " + this.currPageNumber);
            this.isPageFromNext = false;
            this.currPageNumber = this.currPageNumber - 1;
            this.onPageChange();
            this.currentSlideIndex = 24;
        } else {
            if (index < 0) {
                this.isRequesting = false;
                this.currentSlideIndex = 0;
                this.refreshDOM();
                return;
            }
            upstream.Logger.info(FollowupModalComponent.TAG, " onClickedPrev update page "+index);
            this.fetchFollowupDetail(index, AppConstant.CLICK_PREV);
            this.currentSlideIndex = index;
        } 
        this.refreshDOM();
    }

    
    /**
     * Callback method for carousel next button click
     * @param index : next FollowUp index
     */
    onClickedNext(index: number) {
        this.isRequesting = true;
        var len = this.followupIds.length;
        if (index == (len - 1)) {
            if (this.currPageNumber == this.maxPage) {
                upstream.Logger.info(FollowupModalComponent.TAG, "onClickedNext on Last page " + (this.currPageNumber == this.maxPage));
                this.carouselComponent.updateLastVal(true);
                this.fetchFollowupDetail(index, AppConstant.CLICK_NEXT);
                this.currentSlideIndex = index;
            } else {
                this.fetchFollowupDetail(index, AppConstant.CLICK_NEXT);
                this.currentSlideIndex = index;
            }
        }else if (index == len && this.currPageNumber < this.maxPage) {
            this.isPageFromNext = true;
            this.currPageNumber = this.currPageNumber + 1;
            this.onPageChange();
            upstream.Logger.info(FollowupModalComponent.TAG, this.maxPage + " onClickedNext move to next page " + this.currPageNumber);
            this.currentSlideIndex = 0;
        } else {
            if (index > (len-1)) {
                this.isRequesting = false;
                this.currentSlideIndex = (len - 1);
                this.refreshDOM();
                return;
            }
            upstream.Logger.info(FollowupModalComponent.TAG, "move to next page caraousel's slide " + index);
            this.followUpType = AppConstant.DEFAULT_ID;
            this.followupSubject = "";
            this.fetchFollowupDetail(index, AppConstant.CLICK_NEXT);
            this.currentSlideIndex = index;
        }

        this.refreshDOM();
    }

    /**
     * Method to handle modal show method
     * @param index :index of FollowUP that needs to be shown
     * @param appliedFilters : current filters applied before this method ws called
     * @param followupIds :all FollowUp ids
     * @param totalNumberOfRecords : Total number of records
     * @param isEditMode: is FollowUp opened in edit mode
     */
    show(index: number, appliedFilters: FollowUpFilter, followupIds: Array<string>, totalNumberOfRecords: number, isEditMode: boolean) {
        this.isFollowupDetailChanged = true;
        this.totalNumberOfRecords = totalNumberOfRecords;
        if (this.childModal.isShown) {
            upstream.Logger.info(FollowupModalComponent.TAG, "Modal show method modal visible hence hiding it");
            this.hideAssociatedTaskModal();
            this.broadcastFollowUpEditModeEvent(false, false, AppConstant.NO_ACTIVE_FOLLOWUP);
            this.childModal.hide();
            this.scrollToDashboardHeader();
        }
        upstream.Logger.debug(FollowupModalComponent.TAG, index + " position slide start showing");
        this._isHide = false;
        this.isInEditmode = isEditMode;
        this.currentIndex = index;

        this.maxPage = Math.ceil(totalNumberOfRecords / AppConstant.ONE_PAGE_ITEMS);
        upstream.Logger.debug(FollowupModalComponent.TAG, "maxpage " + this.maxPage);
        this.appliedFilters = appliedFilters;
        this.followupIds = followupIds;
        this.saveAndUpdateButtonName = this.UIParams.SaveClose;
        this.refreshDOM();;
        if (!this.isNewFollowUp) {
            if ((index + 1) <= AppConstant.TOTAL_PAGE_ITEMS) {
                if (this.followupIds[(index + 1)] == null && this.currPageNumber == this.maxPage) {
                    this.carouselComponent.updateLastVal(true);
                } else {
                    if (this.carouselComponent != null)
                        this.carouselComponent.updateLastVal(false);
                }
            }
            if (index == 0 && this.currPageNumber == 1) {
                this.carouselComponent.updateFirstVal(true);
            } else {
                this.carouselComponent.updateFirstVal(false);
            }

            this.fetchFollowupDetail(index, AppConstant.SHOW_MODAL);

            if (isEditMode) {
                this.pollingTimer();
                sessionStorage.setItem(AppConstant.FOLLOWUP_KEY, this.followupIds[this.currentIndex]);
            }
        } else {
            this.initializeNewFollowUp(false);
            this.isNewFollowUp = true;
            setTimeout(() => {
                if (this.childModal != undefined)
                    this.childModal.show();

                this.refreshDOM();
            }, 100);
            this.setSelectTagWidth();
            this.refreshDOM();
            this.modalShown.emit(true);
        }
    }

    /**
     * Method to show modal for carousel for first time
     * @param index : index of slide
     */
    onModalShown(index: number) {
        upstream.Logger.info(FollowupModalComponent.TAG, this.isNewFollowUp + " onModalShown ScrollTo : " + index);
        this.childModal.show();
        this.setSelectTagWidth();
        if (index >= 0) {
            this.currentSlideIndex = index;
            this.carouselComponent.scrollTo(this.currentSlideIndex);
        }
        this.modalShown.emit(true);
    }

    /**
     * initialize details regarding the fetched followup
     */
    initModel() {
        if (this.followupDetail == undefined) {
            upstream.Logger.info(FollowupModalComponent.TAG, "sorry! got undefined followupDetail");
            return;
        }

        this.isRequesting = false;
        var currentFollowup = this.followupDetail;
        upstream.Logger.info(FollowupModalComponent.TAG, "Follow up id" + this.followupDetail.FollowUpID);
        this.followupSubject = currentFollowup.FollowUpSubject;
        this.followUpType = currentFollowup.FollowUpType;
        this.agentName = currentFollowup.Owner;
        this.followupChannel = currentFollowup.FollowUpChannel;
        this.contactAdress = currentFollowup.Customer.CustomerSourceAddress;
        this.contactId = currentFollowup.ContactID;
        this.customerName = currentFollowup.CustomerName;
        this.contactNumber = currentFollowup.Customer.CustomerNumber;
        this.followupDueDate = DateTimeUtil.getDateStringInUTCFormat(currentFollowup.FollowUpDueDate);
        this.isPersonal = currentFollowup.IsPersonal;
        this.followupStatus = currentFollowup.FollowUpStatus;
        this.followupcomment = "";
        this.taskRequestData = currentFollowup.TaskDetail;
        this.selectedLabelKey = currentFollowup.FollowUpLabel;
        this.customer = currentFollowup.Customer;
        this.followUpNotification = currentFollowup.Notifications;
        this.customNotificationDate = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
        this.customRangeSelectedString = this.UIParams.OtherDate;
        this.isCustomNotificationChecked = false;
        this.isCustomDateRangePickerVisible = false;
        var customDateNotificationItem = this.followUpNotification.find(x => x.NotificationType == AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE);
        if (this.followUpNotification != undefined && customDateNotificationItem != undefined) {
            this.customNotificationDate = customDateNotificationItem.NotificationValue;
            this.customRangeSelectedString = moment(DateTimeUtil.getDateInLocalFormat(this.customNotificationDate)).format("MM/DD/YYYY");
            this.isCustomNotificationChecked = true;
        }
        if (this.followUpNotification == undefined || (this.followUpNotification.length == 0)) {
            this.followUpNotification = [];
            this.followupDetail.Notifications = [];
        }

        this.setWarningsToDefault();
        if (!currentFollowup.IsQueued) {
            this.selectedSkill = AppConstant.DEFAULT_SKILL;
        } else {
            this.selectedSkill = currentFollowup.SkillAddress;
        }
        this.saveAndUpdateButtonName = this.UIParams.SaveClose;

        this.isDraftFollowUp = false;
        this.refreshDOM();

        this.followUpEditDetails = null;
        if (isNaN(Number(this.followupDetail.FollowUpID))) {
            this.synchronizeLocalStorageForEditMode();
        } else {
            if (this.isInEditmode) {
                this.broadcastFollowUpEditModeEvent(this.isOpenedFromActiveTask, this.isInEditmode, this.followupDetail.FollowUpID);
            }
            this.getAssociatedTaskDetails(this.taskRequestData, AppConstant.SYNCHRONIZE_EDIT);
            this.updateEditFollowUpTypeList(false, this.followUpType);
            this.updateCheckBoxStatusForNotifications();
        }
        if (this.currPageNumber == 0) {
            this.currPageNumber = 1;
        }
        var currentFollowUpIndex = ((this.currPageNumber - 1) * this.appliedFilters.recordsPerPage) + this.activeIndex + 1;
        this.modalFooterMessage = this.UIParams.ModalFooterMessage.replace(AppConstant.PLACEHOLDER_1, currentFollowUpIndex).replace(AppConstant.PLACEHOLDER_2, this.totalNumberOfRecords);
        this.showHideDateRangePickerCalled(AppConstant.BLANK_STRING);
    }

    /**
     * synchronize details with local storage
     */
    synchronizeLocalStorageForEditMode() {
        this.followUpEditDetails = JSON.parse(localStorage.getItem(this.followupDetail.FollowUpID));
        if (localStorage.getItem(this.followupDetail.FollowUpID) != null && this.followUpEditDetails && this.followUpEditDetails.FollowUpDetails.AgentId == this.userId) {
            if (DateTimeUtil.dateComparator(this.followupDetail.FollowUpLastModifiedDate, this.followUpEditDetails.TimeStamp) != 1) {
                this.followupSubject = this.followUpEditDetails.FollowUpDetails.FollowUpSubject;
                this.followupDueDate = this.followUpEditDetails.FollowUpDetails.FollowUpDueDate;
                this.followUpType = this.followUpEditDetails.FollowUpDetails.FollowUpType;
                this.selectedLabelKey = this.followUpEditDetails.FollowUpDetails.FollowUpLabel;
                this.followupcomment = this.followUpEditDetails.FollowUpDetails.FollowUpComment;
                this.isPersonal = this.followUpEditDetails.FollowUpDetails.IsPersonal;
                this.taskRequestData = this.followUpEditDetails.FollowUpDetails.TaskDetail;
                this.followupChannel = this.followUpEditDetails.FollowUpDetails.ChannelType;
                this.customer = this.followUpEditDetails.FollowUpDetails.CustomerInfo;
                this.agentName = this.followUpEditDetails.FollowUpDetails.Owner;
                this.followUpNotification = this.followUpEditDetails.FollowUpDetails.Notifications;
                if (this.followUpNotification.length > 0) {
                    if (this.followUpNotification.find(x => x.NotificationType == AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE) != undefined) {
                        this.customNotificationDate = this.followUpEditDetails.FollowUpDetails.customNotificationDate;
                        this.customRangeSelectedString = moment(DateTimeUtil.getDateInLocalFormat(this.customNotificationDate)).format("MM/DD/YYYY");
                        this.isCustomNotificationChecked = true;
                    }
                }
                this.followUpEditDetails.FollowUpDetails.IsOpen = true;
                this.isDraftFollowUp = true;
                this.updateEditFollowUpTypeList(true, this.followUpType);
            } else {
                this.isDraftFollowUp = false;
                localStorage.removeItem(this.followupDetail.FollowUpID);
            }
            this.refreshDOM();

        } else if (localStorage.getItem(AppConstant.FOLLOWUP_KEY) != null) {
            this.followUpEditDetails = JSON.parse(localStorage.getItem(AppConstant.FOLLOWUP_KEY));
            this.followupSubject = this.followUpEditDetails.FollowUpDetails.FollowUpSubject;
            this.followupDueDate = this.followUpEditDetails.FollowUpDetails.FollowUpDueDate;
            this.followUpType = this.followUpEditDetails.FollowUpDetails.FollowUpType;
            this.selectedLabelKey = this.followUpEditDetails.FollowUpDetails.FollowUpLabel;
            this.followupcomment = this.followUpEditDetails.FollowUpDetails.FollowUpComment;
            this.followupChannel = this.followUpEditDetails.FollowUpDetails.ChannelType;
            this.taskRequestData = this.followUpEditDetails.FollowUpDetails.TaskDetail;
            this.isPersonal = this.followUpEditDetails.FollowUpDetails.IsPersonal;
            this.customer = this.followUpEditDetails.FollowUpDetails.CustomerInfo;
            this.agentName = this.followUpEditDetails.FollowUpDetails.Owner;
            this.followUpEditDetails.FollowUpDetails.IsOpen = true;
            this.followUpNotification = this.followUpEditDetails.FollowUpDetails.Notifications;
            if (this.followUpNotification.length > 0) {
                if (this.followUpNotification.find(x => x.NotificationType == AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE) != undefined) {
                    this.customNotificationDate = this.followUpEditDetails.FollowUpDetails.customNotificationDate;
                    this.customRangeSelectedString = moment(DateTimeUtil.getDateInLocalFormat(this.customNotificationDate)).format("MM/DD/YYYY");
                    this.isCustomNotificationChecked = true;
                }
            }
            this.isDraftFollowUp = false;

            this.refreshDOM();

        } else if (this.isInEditmode) {
            this.followUpEditDetails = new FollowUpEditDetails();
            this.followUpEditDetails.FollowUpId = this.followupDetail.FollowUpID;
            this.followUpEditDetails.FollowUpDetails = new FollowUpLocalDetails();
            this.followUpEditDetails.FollowUpDetails.FollowUpSubject = this.followupSubject;
            this.followUpEditDetails.FollowUpDetails.FollowUpDueDate = this.followupDueDate;
            this.followUpEditDetails.FollowUpDetails.FollowUpType = this.followUpType;
            this.followUpEditDetails.FollowUpDetails.FollowUpLabel = this.selectedLabelKey;
            this.followUpEditDetails.FollowUpDetails.FollowUpComment = this.followupcomment;
            this.followUpEditDetails.FollowUpDetails.IsPersonal = this.isPersonal;
            this.followUpEditDetails.TimeStamp = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
            this.followUpEditDetails.FollowUpDetails.IsOpen = true;
            this.followUpEditDetails.FollowUpDetails.AgentId = this.userId;
            this.followUpEditDetails.FollowUpDetails.TaskDetail = this.taskRequestData;
            this.followUpEditDetails.FollowUpDetails.ChannelType = this.followupChannel;
            this.followUpEditDetails.FollowUpDetails.CustomerInfo = this.customer;
            this.followUpEditDetails.FollowUpDetails.Owner = this.agentName;
            this.followUpEditDetails.FollowUpDetails.Notifications = this.followUpNotification;
            this.followUpEditDetails.FollowUpDetails.customNotificationDate = this.customNotificationDate;
            this.isDraftFollowUp = false;
            this.saveDraftData(AppConstant.FOLLOWUP_KEY, JSON.stringify(this.followUpEditDetails), "sync if (this.isInEditmode)");
            this.refreshDOM();
        }
        this.customerName = this.customer.CustomerName;
        this.contactAdress = this.customer.CustomerSourceAddress;
        this.contactId = this.customer.ContactId;
        this.contactNumber = this.customer.CustomerNumber;
        this.followupDetail.ContactID = this.customer.ContactId;
        this.getAssociatedTaskDetails(this.taskRequestData, AppConstant.SYNCHRONIZE_EDIT);
        this.updateCheckBoxStatusForNotifications();
        this.refreshDOM();
    }


    /**
     * Call onclick of cancel button of modal
     * @param from
     */
    public cancelFollowUp(from: number) {
        if (from == 0) {
            this.hide();
            this.ackToTaskInteractionCapture(null);
        } else {
            this.hide();
        }
    }

    /**
     * Hide FollowUp
     */
    public hide() {
        this._isHide = true;
        this.isHideModal = false;
        upstream.Logger.info(FollowupModalComponent.TAG, this.currPageNumber + "'s Modal view hide called");
        this.pageChange.emit(this.currPageNumber);
        localStorage.removeItem(AppConstant.FOLLOWUP_KEY);
        this.setWarningsToDefault();
        if (this.isNewFollowUp) {
            localStorage.removeItem(this.activeTaskInteractionId);
        }
        if (!this.isNewFollowUp && this.isInEditmode && !this.isDraftFollowUp) {
            this.releaseLock();
        }
        this.closeFollowUp(true);
        this.isFollowupDetailChanged = false;
        upstream.Logger.info(FollowupModalComponent.TAG, "Modal closed");
        this.refreshDOM();
    }

    /**
     * release lock for the FollowUp
     */
    releaseLock() {
        this.resetTimer();
        if (this.isInEditmode && this.followupDetail != undefined && !isNaN(Number(this.followupDetail.FollowUpID))) {
            upstream.Logger.info(FollowupModalComponent.TAG, "followid=>", this.followupDetail.FollowUpID);
            this.sub = this._followupService.reqSetFollowUpEditMode(this.followupDetail.FollowUpID, this.userId, false)
                .subscribe(result => {
                }, error => {
                    upstream.Logger.error(FollowupModalComponent.TAG, error);
                });
        }
    }

    dateConverter(date: string) {
        return DateTimeUtil.getDateInLocalFormat(date);
    }

    /**
     * Set edit mode details
     * @param isEditMode : true/false
     * @param followupItem : Item for witch details was set
     */
    setEditMode(isEditMode: boolean, followupItem: Followup) {
        upstream.Logger.info(FollowupModalComponent.TAG, "Set edit mode" + isEditMode);
        if (isNaN(Number(this.followupIds[this.currentIndex]))) {
            this.isInEditmode = true;
            this.getDraftFollowUpDetails(this.followupIds[this.currentIndex], this.currentIndex, AppConstant.ENABLE_EDIT);
        } else {
            this.fetchFollowupDetail(this.currentIndex, AppConstant.ENABLE_EDIT);
        }
         upstream.Logger.info(FollowupModalComponent.TAG, "Tick called in on seteditmode modal method");
        this.refreshDOM();
    }

    /**
     * Method to show daterangepicker for custom notification
     * @param event
     */
    showDateRangePickerCalled(event) {

        //ng2-daterangeicker library set display property of ranges to none in case singleDatePicker attribute is set true.
        //To counter that display property has been explicitly set to block
        var customRangesElements = document.getElementsByClassName('ranges');
        var customRangeElement;
         upstream.Logger.info(FollowupModalComponent.TAG, "Ranges class length", customRangesElements.length);
        for (var index = 0; index < customRangesElements.length; index++) {
            customRangeElement = <HTMLElement>customRangesElements[index];
            if (customRangeElement.childNodes.length > 0
                && customRangeElement.childNodes[0].childNodes.length > 0
                && customRangeElement.childNodes[0].childNodes[0].dataset != undefined
                && customRangeElement.childNodes[0].childNodes[0].dataset.rangeKey == this.UIParams.Tomorrow) {
                customRangeElement.style.display = "block";
            }
         }
        this.isCustomDateRangePickerVisible = true;
        this.refreshDOM();
    }

    hideCustomDateRangePickerCalled(event) {
        this.isCustomDateRangePickerVisible = false;
        this.refreshDOM();
    }
    //Handle select date event
    private singleSelect(value: any) {
        upstream.Logger.info(FollowupModalComponent.TAG, "Applied event called with value" + value);
        this.showDueDateInvalidWarning = false;
        this.singleDate = value.picker.startDate;
        this.isDueDateChanged = true;
        this.followupDueDate = DateTimeUtil.getDateStringInUTCFormat(this.singleDate._d);
        this.isFollowupDetailChanged = false;
        if (this.isNewFollowUp) {
            this.insertFollowUp.FollowUpDueDate = this.followupDueDate;
            this.followUpLocalDetails.FollowUpDetails.FollowUpDueDate = this.followupDueDate;
             this.saveDraftData(this.activeTaskInteractionId, JSON.stringify(this.followUpLocalDetails), "singleSelect if");
        } else if (!this.isNewFollowUp && this.followUpEditDetails) {
            this.followUpEditDetails.FollowUpDetails.FollowUpDueDate = this.followupDueDate;
             this.saveDraftData(this.followupDetail.FollowUpID, JSON.stringify(this.followUpEditDetails), "singleSelect else");
        }
        this.refreshDOM();
        upstream.Logger.info(FollowupModalComponent.TAG, "Applied selected date" + DateTimeUtil.getDateStringInUTCFormat(this.singleDate._d));
    }

    /**
     * Common method for detection change of followup details
     * @param value : changed value
     * @param field : filed for which value was changed
     */
    onChange(value, field) {
         upstream.Logger.info(FollowupModalComponent.TAG, "check=" + value, field);

        //Added this logic as in IE onchange for comment is called when followup is opened in edit mode
        if (field == AppConstant.COMMENT && value != "" && value.trim().length != 0 && this.isFollowupDetailChanged) {
            this.isFollowupDetailChanged = false;
        } else if (field != AppConstant.COMMENT) {
            this.isFollowupDetailChanged = false;
        }
         upstream.Logger.info(FollowupModalComponent.TAG, "Edit Mode -> isnewfollowup", this.isNewFollowUp);
        switch (field) {
            case AppConstant.SUBJECT:
                this.followupSubject = value;
                if (!this.isNewFollowUp && this.followUpEditDetails) {
                    this.followUpEditDetails.FollowUpDetails.FollowUpSubject = value;
                     this.saveDraftData(this.followupDetail.FollowUpID, JSON.stringify(this.followUpEditDetails), "subject onChange if");
                } else if (this.isNewFollowUp) {
                    this.insertFollowUp.FollowUpSubject = value;
                    this.followUpLocalDetails.FollowUpDetails.FollowUpSubject = value;
                    this.saveDraftData(this.activeTaskInteractionId, JSON.stringify(this.followUpLocalDetails), "subject onChange else");
                }
                this.showSubjectRequiredWarning = false;
                break;
            case AppConstant.TYPE:
                this.followUpType = value;
                if (!this.isNewFollowUp && this.followUpEditDetails) {
                    this.followUpEditDetails.FollowUpDetails.FollowUpType = value;
                    this.saveDraftData(this.followupDetail.FollowUpID, JSON.stringify(this.followUpEditDetails), "Type onchange if");
                } else if (this.isNewFollowUp) {
                    this.insertFollowUp.FollowUpType = value;
                    this.followUpLocalDetails.FollowUpDetails.FollowUpType = value;
                    this.saveDraftData(this.activeTaskInteractionId, JSON.stringify(this.followUpLocalDetails), "Type onchange else");
                }
                this.showTypeRequiredWarning = false;
                break;
            case AppConstant.OWNER:
                 upstream.Logger.info(FollowupModalComponent.TAG, "owner");
                this.agentName = value;
                this.insertFollowUp.Owner = value;

                break;
            case AppConstant.CHANNEL:
                 upstream.Logger.info(FollowupModalComponent.TAG, "channel");
                this.followupChannel = value;
                this.insertFollowUp.FollowUpChannel = value;

                break;
            case AppConstant.CONTACTAADDRESS:
                 upstream.Logger.info(FollowupModalComponent.TAG, "caddress");
                this.contactAdress = value;
                this.insertFollowUp.Customer.CustomerSourceAddress = value;

                break;
            case AppConstant.CONTACTID:
                 upstream.Logger.info(FollowupModalComponent.TAG, "cid");
                this.contactId = value;
                this.insertFollowUp.Customer.ContactId = value;

                break;
            case AppConstant.CUSTOMER_NAME:
                 upstream.Logger.info(FollowupModalComponent.TAG, "cname");
                this.customerName = value;
                this.insertFollowUp.Customer.CustomerName = value;

                break;
            case AppConstant.DESTINATION_ADDRESS:
                this.insertFollowUp.Customer.CustomerSourceAddress = value;
                break;
            case AppConstant.PHONE_NUMBER:
                this.contactNumber = value;
                this.insertFollowUp.Customer.CustomerNumber = value;
                break;
            case AppConstant.COMMENT:
                if (!this.isNewFollowUp && this.followUpEditDetails && localStorage.getItem(this.followupDetail.FollowUpID)) {
                    this.followUpEditDetails.FollowUpDetails.FollowUpComment = value;
                     this.saveDraftData(this.followupDetail.FollowUpID, JSON.stringify(this.followUpEditDetails), "comment onchange if");
                } else if (this.isNewFollowUp && localStorage.getItem(this.activeTaskInteractionId)) {
                    this.followUpLocalDetails.FollowUpDetails.FollowUpComment = value;
                    this.saveDraftData(this.activeTaskInteractionId, JSON.stringify(this.followUpLocalDetails), "comment onchange else");
                }
                break;
        }
        this.refreshDOM();
    }

    /**
     * Method to handle followup save option
     */
    saveFollowUp() {
        upstream.Logger.info(FollowupModalComponent.TAG, "Save followup from modal")
        this.setFollowUpComplete = false;
        if (!this.isAllDetailsValid()) {
            this.refreshDOM();
            return;
        }
        if (this.isNewFollowUp) {
            this.createFollowUp();
        } else if (isNaN(Number(this.followupDetail.FollowUpID))) {
            this.saveDraftFollowUp();

        } else {
            if (this.followupDetail.IsQueued || this.selectedSkill == AppConstant.DEFAULT_SKILL) {
                this.updateFollowup();
            } else if (this.selectedSkill != AppConstant.DEFAULT_SKILL) {
                this.showSkillConfimrationDialog();
            }
        }
    }

    /**
     * Api call for creatinf new followup
     */
    createFollowUp() {
        if (!this.isValidFUType(this.insertFollowUp.FollowUpType, this.configurationData.UserFollowUpTypes))
            return;
        this.insertFollowUp.SkillAddress = this.selectedSkill;

        if (this.followupcomment != AppConstant.BLANK_STRING && this.followupcomment.trim().length != 0) {
            upstream.Logger.info(FollowupModalComponent.TAG, "Add comment" + this.followupcomment);
            var comment = new FollowUpComment(this.followupcomment.trim(), DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING), "");

            this.totalComment = 1;
        } else {
            this.totalComment = 0;
        }
        this.updatecomments = [];
        if (this.totalComment == 1) {
            this.updatecomments.push(comment);
        }
        this.insertFollowUp.FollowUpSubject = this.insertFollowUp.FollowUpSubject.trim(); //trim the subject before saving

        this.insertFollowUp.Notifications = this.getAppliedNotification();
        var hasNotification = this.insertFollowUp.Notifications.length == 0 ? false : true;
        //Create new followup insert object
        var newFollowUp = new FollowUpInsert(this.insertFollowUp.UserID, this.insertFollowUp.FollowUpChannel,
            this.totalComment, this.insertFollowUp.Customer, Number(this.insertFollowUp.FollowUpStatus),
            Number(this.insertFollowUp.FollowUpType), Number(this.insertFollowUp.FollowUpLabel),
            this.insertFollowUp.IsPersonal, this.insertFollowUp.Owner,
            this.insertFollowUp.FollowUpDueDate, this.insertFollowUp.FollowUpSubject,
            this.updatecomments, this.insertFollowUp.SkillAddress, this.taskRequestData, this.insertFollowUp.Notifications);
        this.isRequesting = true;
        this.refreshDOM();
        this.sub = this._followupService.saveFollowUpFromModal(newFollowUp).subscribe(result => {
            upstream.Logger.info(FollowupModalComponent.TAG, "Followup create Response :: " + JSON.stringify(result.data));
            if (hasNotification) {
                this.dueDateChange.emit("Create followup with notification");
            }
            this.followupcomment = "";// reset followup comment
            this.isRequesting = false;
            this.queueAnyTaskSkill(result.data.FollowUp);
            var key = result.data.FollowUp.TaskDetail.TaskId + (result.data.FollowUp.TaskDetail.SubInteractionId - 1);
            if (localStorage.getItem(key)) {
                upstream.Logger.info(FollowupModalComponent.TAG, " From localStorage.getItem(key) ");
                localStorage.removeItem(key);
            }
            this.ackToTaskInteractionCapture(result.data);
            this.refreshDOM();
        }, error => {
            this.isRequesting = false;
            this.errorMessage = <any>error;
            upstream.Logger.error(FollowupModalComponent.TAG, this.errorMessage);
            this.confirmationModal.show(this.UIParams.ErrorCreate, AppConstant.ALERT);
            this.ackToTaskInteractionCapture(null);
            this.refreshDOM();
        });
    }

    /**
     * Send acknowledgement to IC regarding creation of FollowUp 
     * @param data
     */
    ackToTaskInteractionCapture(data: FollowupCreateRes) {

        var subInteraction = this.taskRequestData.SubInteractionId.toString();
        var postFixKey = subInteraction.substr(subInteraction.length - 1, subInteraction.length)
        var postFixKeyVal = parseInt(postFixKey, 10);
        var key = 'FollowUpId' + postFixKeyVal;
        upstream.Logger.info(FollowupModalComponent.TAG, "followup key of current Interaction :: " + key);
        var interactionData = {};
        interactionData['FollowUpID'] = data == null ? "-1" : data.FollowUp.FollowUpID;
        interactionData['key'] = key;
        interactionData['index'] = postFixKeyVal;
        interactionData['taskId'] = data == null ? this.taskId : data.FollowUp.TaskDetail.TaskId;
        interactionData['followUpJson'] = data == null ? null : data.FollowUpJson;
        upstream.Logger.info(FollowupModalComponent.TAG, "interactionData['taskId'] " + interactionData['taskId'] );
        this.hub.publish('com.upstreamworks.events.followup.ack', interactionData);
    }

    /**
     * Method to handle label change value
     * @param labelkey : key of the slected label
     */
    onLabelChange(labelkey: number) {
        this.isFollowupDetailChanged = false;
        this.selectedLabelKey = labelkey;
        if (this.isNewFollowUp) {
            this.insertFollowUp.FollowUpLabel = labelkey;
             upstream.Logger.info(FollowupModalComponent.TAG, "New Mode -> key set after label change");
            this.followUpLocalDetails.FollowUpDetails.FollowUpLabel = this.selectedLabelKey;
            this.saveDraftData(this.activeTaskInteractionId, JSON.stringify(this.followUpLocalDetails), "onLabelChange if ");
        } else if (!this.isNewFollowUp && this.followUpEditDetails) {
            this.followUpEditDetails.FollowUpDetails.FollowUpLabel = this.selectedLabelKey;
             upstream.Logger.info(FollowupModalComponent.TAG, "Edit Mode -> key set after label change");
             this.saveDraftData(this.followupDetail.FollowUpID, JSON.stringify(this.followUpEditDetails), "onLabelChange else");
        }
        this.refreshDOM();
    }

    /**
     * Set value whether FollowUp is new or not
     * @param value
     */
    setIsNewFollowUp(value: boolean) {
        upstream.Logger.info(FollowupModalComponent.TAG, "isNewFollowUp" + value);
        this.isNewFollowUp = value;
        this.refreshDOM();
        this.setWarningsToDefault();
    }

    //Handle any othe calendar related events
    public calendarEventsHandler(e: any) {
         upstream.Logger.info(FollowupModalComponent.TAG, e);
    }

    /**
     * Set edit properties for FollowUp
     * @param isNewFollowUp : creation is initialted
     * @param isInEditmode : is followup editable
     */
    public initializeEditProperties(isNewFollowUp: boolean, isInEditmode: boolean) {
        upstream.Logger.info(FollowupModalComponent.TAG, "Set properties" + isInEditmode + ", " + isNewFollowUp);
        if (this.childModal.isShown) {
            if (this.isInEditmode && this.followUpEditDetails) {
                this.followUpEditDetails.TimeStamp = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
                this.followUpEditDetails.FollowUpDetails.IsOpen = false;
                localStorage.removeItem(AppConstant.FOLLOWUP_KEY);
            } else if (this.isNewFollowUp) {
                this.followUpLocalDetails.FollowUpDetails.IsOpen = false;
                this.saveDraftData(this.activeTaskInteractionId, JSON.stringify(this.followUpLocalDetails), "initializeEditProperties if (this.isNewFollowUp)");
            }
            this.closeFollowUp(false);
            this.refreshDOM();
            upstream.Logger.info(FollowupModalComponent.TAG, "Is child modal shown after hiding" + this.childModal.isShown);
        }

        this.isInEditmode = isInEditmode;
        this.isNewFollowUp = isNewFollowUp;
        this.refreshDOM();
        this.setWarningsToDefault();
    }

    /**
     * Get label color
     * @param label : lable key
     */
    getLabelColor(label: number) {
        var selectedLabelColor = this.configurationData.Labels.find(electedLabel => electedLabel.LabelID == label)
        if (this.configurationData.Labels.length == 0 || selectedLabelColor == undefined) {
            return;
        }
        return selectedLabelColor.Description;
    }

    /**
     * get label name
     * @param label : label key
     */
    getSelectedLabel(label: number) {
        var selectedLabelName = this.configurationData.Labels.find(electedLabel => electedLabel.LabelID == label)
        if (this.configurationData.Labels.length == 0 || selectedLabelName == undefined) {
            return;
        }
        return selectedLabelName.LabelName;
    }

    togglePersonalStatus() {
        upstream.Logger.info(FollowupModalComponent.TAG, "Toggle personal status " + this.isNewFollowUp);
        if (this.isNewFollowUp) {
            this.insertFollowUp.IsPersonal = !this.insertFollowUp.IsPersonal;
        } else if (!this.isNewFollowUp && this.isInEditmode) {
            this.followupDetail.IsPersonal = !this.followupDetail.IsPersonal;
        }
    }

    /** Update followupdetail **/
    updateFollowup() {
        if (!this.isValidFUType(this.followUpType, this.editFollowUpUserTypes))
            return;
        if (this.followupcomment != AppConstant.BLANK_STRING && this.followupcomment.trim().length != 0) {
            upstream.Logger.info(FollowupModalComponent.TAG, "Add comment" + this.followupcomment);
            var comment = new FollowUpComment(this.followupcomment.trim(), DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING), this.customerName);
            this.totalComment = 1;
        } else {
            this.totalComment = 0;
        }
        
        this.followupStatus = this.followupDetail.FollowUpStatus;
        if (this.followupStatus == this.configurationData.Status[0].StatusID) {
            this.followupStatus = this.configurationData.Status[1].StatusID;
            this.followupDetail.FollowUpStatus = this.configurationData.Status[1].StatusID;
        }
        this.updatecomments = [];
        if (this.totalComment == 1) {
            this.updatecomments.push(comment);
        }
        this.callUpdateApi();
    }


    /** Fetch followup detail on the basis of the current page **/
    fetchFollowupDetail(index: number, from: string) {
        upstream.Logger.info(FollowupModalComponent.TAG, from+" Start to fetching followup's detail of index " + index);
        var isFollowupEditMode;
        this.activeIndex = index;
        if (this.followupIds[index] == undefined || this.isInEditmode == undefined)
            return;

        //since incase of lock, shouldn't open editview
        if (from === AppConstant.ENABLE_EDIT_MODE) {
            isFollowupEditMode = true;
        } else {
            isFollowupEditMode = this.isInEditmode;
        }
        //this.selectedSkill='--Select Field--';
        if (isNaN(Number(this.followupIds[index]))) {
            this.getDraftFollowUpDetails(this.followupIds[index], index, from);
        } else {
            this.getActualFollowUpDetails(this.followupIds[index], this.userId, isFollowupEditMode, from, index);
        }

        this.refreshDOM();
    }

    /**
     * API call to fetch followup details
     * @param fuid :FollowUp id
     * @param uId : userID
     * @param isFollowupEditMode :is FollowUp in edit mode
     * @param from : from where this method was invoked
     * @param index : index of the slide
     */
    getActualFollowUpDetails(fuid, uId, isFollowupEditMode, from, index) {
        upstream.Logger.info(FollowupModalComponent.TAG,
            "Start to fetching followup's detail from " + from + " and followup id is " + fuid);
        this.refreshDOM();
        this.sub = this._followupService.getFollowupDetail(fuid, this.userId, isFollowupEditMode)
            .subscribe(result => {
                this.isRequesting = false;
                upstream.Logger.info(FollowupModalComponent.TAG, "Fetched followUp's detail response " + result);
                this.followupDetailRes = result;
                if (from === AppConstant.SHOW_MODAL && this.followupDetailRes.data.FollowUpStatus == this.configurationData.Status[2].StatusID && this.isInEditmode) {
                    var errorEvent = { "message": this.UIParams.ErrorEdit, "type": AppConstant.DANGER_KEY };
                    localStorage.removeItem(AppConstant.FOLLOWUP_KEY);
                    this.errorMessageNotify.emit(errorEvent);
                    this.refreshDOM();
                    return;
                }
                //update notification status to viewed only when the user who created the follow up has opened it
                if (this.userId == this.followupDetailRes.data.UserID) {
                    this.updateNotificationStatus(fuid, this.followupDetailRes.data.Notifications);
                }
                if (from === AppConstant.ENABLE_EDIT_MODE) {
                    if (this.followupDetailRes.Status === true) {
                        var message = this.UIParams.LockedErrorMessage.replace(AppConstant.PLACEHOLDER_1, this.followupDetailRes.Message);
                        this.confirmationModal.show(message, AppConstant.ALERT);
                        this.refreshDOM();
                        return;
                    }
                    else if (this.followupDetailRes.data.FollowUpStatus == this.configurationData.Status[2].StatusID) {
                        this.confirmationModal.show(this.UIParams.ErrorEdit, AppConstant.ALERT);
                    }
                    else {
                      this.isInEditmode = true;
                      this.enableCompleButton();
                    }
                    this.refreshDOM();
                }
                else if (from === AppConstant.REFRESH) {
                    this.initModel();
                    this.onModalShown(-1);
                    this.refreshDOM();
                    return;
                }
                else if (this.followupDetailRes.Status === true) {
                    this.editModeEnable.emit(this.followupDetailRes);
                    this.refreshDOM();
                    return;
                }

                this.refreshDOM();
                this.editModeEnable.emit(this.followupDetailRes);
                this.followupDetail = result.data;
                this.currentIndex = index;
                if (from === AppConstant.SHOW_MODAL) {
                    if (this.followupDetail.FollowUpStatus == this.configurationData.Status[2].StatusID && this.isInEditmode) {
                        var errorEvent = { "message": this.UIParams.ErrorEdit, "type": AppConstant.DANGER_KEY };
                        localStorage.removeItem(AppConstant.FOLLOWUP_KEY);
                        this.errorMessageNotify.emit(errorEvent);
                        this.refreshDOM();
                        return;
                    }
                    upstream.Logger.info(FollowupModalComponent.TAG, "Open modal after fetching followup's detail ");
                    this.initModel();
                    this.onModalShown(index);

                }
                else {
                    this.initModel();
                    this.refreshDOM();
                }

            }, error => {
                this.isRequesting = false;
                upstream.Logger.error(FollowupModalComponent.TAG, error);
                if (this.childModal.isShown) {
                    this.confirmationModal.show(this.UIParams.ErrorFetchup, AppConstant.CRITICAL);
                }
                else {
                    var errorEvent = { "message": this.UIParams.ErrorFetchup, "type": AppConstant.DANGER_KEY };
                    this.errorMessageNotify.emit(errorEvent);
                }
                this.refreshDOM();
            });

    }

    /**
     * Method to get draft followup details
     * @param fuid : FollowUp id
     * @param index :slide index
     * @param from :from where this method was invoked
     */
    getDraftFollowUpDetails(fuid, index, from) {
        this.isRequesting = true;
        this.initializeNewFollowUp(true);
         upstream.Logger.info(FollowupModalComponent.TAG, "carousel setting initial draft for index", index);
        this.followUpLocalDetails = JSON.parse(localStorage.getItem(fuid));
        this.followupDetail = JSON.parse('{ "UserID": 327, "FollowUpChannel": 3, "FollowUpCompleteDate": null, "TotalComment": 0, "Comment": [], "Customer": { "CustomerName": "", "CustomerSourceAddress": "", "CustomerDestAddress": "", "CustomerNumber": "", "ContactId": "" }, "IsQueued": false, "FollowUpID": 2, "FollowUpStatus": 1, "FollowUpType": 7, "FollowUpLabel": 1, "IsPersonal": false, "ContactID": 1, "Owner": "", "CustomerName": "", "FollowUpCreationDate": "2017-09-20T07:00:06.01+00:00", "FollowUpDueDate": "2017-09-20T15:58:00+00:00", "FollowUpSubject": "New-follow up added part-2", "FollowUpLastModifiedDate": "2017-09-20T07:00:06.01+00:00", "FollowUpLastModifyUser": "Super LN26X025", "SkillAddress": null }');
        this.followupDetail.UserID = this.userId;
        this.followupDetail.FollowUpChannel = 3;
        this.followupDetail.FollowUpLastModifiedDate = this.followUpLocalDetails.TimeStamp;
        this.followupDetail.TotalComment = 0;
        this.followupDetail.FollowUpID = fuid;
        this.followupDetail.FollowUpStatus = 1;
        this.followupDetail.FollowUpType = 0;
        this.followupDetail.FollowUpLabel = 3;
        this.followupDetail.IsPersonal = false;
        this.followupDetail.FollowUpCreationDate = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
        this.followupDetail.FollowUpDueDate = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
        this.followupDetail.FollowUpSubject = AppConstant.BLANK_STRING;
        this.followupDetail.SkillAddress = AppConstant.BLANK_STRING;
        this.followupDetail.IsQueued = false;
        this.followupDetail.TaskDetail = this.followUpLocalDetails.FollowUpDetails.TaskDetail;
        this.followupDetail.Notifications = [];
        this.currentIndex = index;
        this.isRequesting = false;
        this.refreshDOM();
        if (from === AppConstant.ENABLE_EDIT_MODE) {
            this.isInEditmode = true;
        } else if (from === AppConstant.REFRESH) {
            this.initModel();
            this.onModalShown(-1);
            return;
        }
        this.refreshDOM();
        this.currentIndex = index;
        if (from === AppConstant.SHOW_MODAL) {
            upstream.Logger.info(FollowupModalComponent.TAG, "Open modal after fetching followup's draft detail ");
            this.initModel();
            this.onModalShown(index);
        } else {
            this.initModel();
        }
        this.refreshDOM();
    }

    /** call next page **/
    onPageChange() {
        upstream.Logger.info(FollowupModalComponent.TAG, "currentpage number " + this.currPageNumber);
        if (this.currPageNumber == 0)
            return;

        if (this.currPageNumber > this.maxPage) {
            upstream.Logger.error(FollowupModalComponent.TAG, "this page is not a valid " + this.currPageNumber);
            return;
        }
        this.offset = AppConstant.ONE_PAGE_ITEMS * (this.currPageNumber - 1);
        this.sub = this._followupService.getFollowUps(this.appliedFilters.isPersonal, this.offset, 25,
            this.appliedFilters.label, this.appliedFilters.status, this.appliedFilters.type, this.appliedFilters.sortingColumn,
            this.appliedFilters.sortingOrder, this.appliedFilters.textSearch, this.appliedFilters.startDueDate, this.appliedFilters.endDueDate, this.appliedFilters.isNotify, this.userId).subscribe(result => {
                if (result == null) {
                    upstream.Logger.debug(FollowupModalComponent.TAG, "Result is null: ");
                    return;
                }
                upstream.Logger.info(FollowupModalComponent.TAG, "Get Next page Followup Response : " + result.FollowUpList.length);
                this.createFollowupIds(result);
                this.refreshDOM();
            }, error => {
                upstream.Logger.error(FollowupModalComponent.TAG, error);
                this.confirmationModal.show(this.UIParams.ErrorFetchup, AppConstant.CRITICAL);
                this.refreshDOM();
            });
    }

    /**
     * Method to get list of FollowUP id present in carousel
     * @param result
     */
    createFollowupIds(result: FollowupRes) {
        upstream.Logger.info(FollowupModalComponent.TAG, "creating followup ids");
        var pos = 0;

        if (result.FollowUpList.length == 0 && result.TotalRecords > 0) {
            this.maxPage = Math.ceil(result.TotalRecords / 25);
            this.currPageNumber = this.maxPage;
            this.onPageChange();
            upstream.Logger.debug(FollowupModalComponent.TAG, "max page, current page " + this.maxPage + ", " + this.currPageNumber);
            return;
        }
        var data = result.FollowUpList;

        upstream.Logger.info(FollowupModalComponent.TAG, "Len " + data.length);
        var len = data.length;
        this.followupIds = [];
        for (var index = 0; index < len; index++) {
            upstream.Logger.debug(FollowupModalComponent.TAG, "followupid " + data[index].FollowUpID);
            this.followupIds.push(data[index].FollowUpID);
        }

        if (this.isPageFromNext) {
            pos = 0;
            var idLen = this.followupIds.length;
            //handle if single element on last page
            if ((idLen - 1) == 0) {
                if (this.currPageNumber == this.maxPage) {
                    this.carouselComponent.updateLastVal(true);
                }
            }

        } else {
            pos = data.length - 1;
        }
        this.fetchFollowupDetail(pos, AppConstant.ONPAGE_CHANGE);
    }
    /**
     * Close followup
     * @param toggleStatus
     */
    closeFollowUp(toggleStatus) {
        this.hideAssociatedTaskModal();
        this.broadcastFollowUpEditModeEvent(false, false, AppConstant.NO_ACTIVE_FOLLOWUP);
        this.childModal.hide();
        this.updateJsonRegardingNotification();
        this.refreshDOM();
    }

    /**
     * Validation before completing FollowUp
     */
    completeFollowUp() {
        if (!this.isValidFUType(this.followUpType, this.editFollowUpUserTypes))
            return;
        if (this.followUpType == AppConstant.DEFAULT_ID) {
            this.showTypeRequiredWarning = true;
            upstream.Logger.info(FollowupModalComponent.TAG, "Warning type");
        }
        this.showCustomDateInvalidWarning = !this.iscustomNotifcationValid();
        if (this.followupSubject == AppConstant.BLANK_STRING || this.followupSubject.trim().length == 0) {
            this.followupSubject = "";
            this.showSubjectRequiredWarning = true;
        }
        if (this.showTypeRequiredWarning || this.showSubjectRequiredWarning || this.showCustomDateInvalidWarning) {
            return;
        }
        this.setFollowUpComplete = true;
        if (this.selectedSkill != AppConstant.DEFAULT_SKILL && !this.followupDetail.IsQueued) {
            this.confirmationModal.show(this.UIParams.ErrorComplete, AppConstant.CONFIRM);
            this.refreshDOM();
            return;
        }
        this.followupDetail.FollowUpStatus = this.configurationData.Status[2].StatusID;
        this.callCompleteApi();
        this.refreshDOM();
    }

    /**
     * API call to update FollowUp
     */
    callUpdateApi() {
        upstream.Logger.info(FollowupModalComponent.TAG, "callUpdateApi invoked");
        this.isPersonal = this.followupDetail.IsPersonal;
        var followupId = this.followupDetail.FollowUpID;
        var followUpModel = new FollowUpModel(followupId, this.userId, this.followupChannel, this.totalComment, this.customer,
            Number(this.followupStatus), Number(this.followUpType), Number(this.selectedLabelKey), this.isPersonal, this.customerName,
            this.followupDueDate, this.followupSubject.trim(), this.updatecomments, this.selectedSkill, this.getAppliedNotification());

        this.isRequesting = true;
        this.refreshDOM();
        this.sub = this._followupService.reqUpdateFollowUp(followUpModel).subscribe(result => {
            upstream.Logger.info(FollowupModalComponent.TAG, "reqUpdateFollowUp's Response : " + result);
            this.followupcomment = "";
            //Find difference between orignal set and new set of notifications
            var differenceList = followUpModel.Notifications.filter((item) => {
                var commonItem = this.followupDetail.Notifications.find(item2 => item.NotificationType == item2.NotificationType)
                if (commonItem && (commonItem.NotificationValue == null || (DateTimeUtil.dateComparator(item.NotificationValue, commonItem.NotificationValue)==0))) {
                    return false;
                } else {
                    return true;
                }
            })
            /* Update followup notification onchange of duedate if follow up
                * that was created by the agent is changed by the same agent ,
                * then reload the notifications
                * Or when user updates the notification refetch the notification list
                */
            if (!this.isNewFollowUp && this.isDueDateChanged && this.agentName === this.followupDetail.Owner ||
                differenceList.length > 0 || followUpModel.Notifications.length != this.followupDetail.Notifications.length) {
                this.dueDateChange.emit("change duedate");
            }
            if (!this.isSaveOnly) {
                this.queueAnyTaskSkill(this.followupDetail);
            } else {
                this.isRequesting = false;
                this.isSaveOnly = false;
                this.followupDetail.FollowUpLastModifiedDate = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
                this.callGetCommentApi(followupId);
            }

            this.refreshDOM();
        }, error => {
            this.errorMessage = <any>error;
            this.isRequesting = false;
            if (!this.isSaveOnly) {
                this.confirmationModal.show(this.UIParams.ErrorUpdate, AppConstant.ALERT);
            } else {
                this.isSaveOnly = false;
                this.confirmationModal.show(this.UIParams.ErrorAddComment, AppConstant.ALERT);
            }
            this.refreshDOM();
        });
    }

    /**
     * API call for complete FollowUp
     */
    callCompleteApi() {
        if (this.followupcomment != AppConstant.BLANK_STRING && this.followupcomment.trim().length != 0) {
            upstream.Logger.info(FollowupModalComponent.TAG, "Add comment" + this.followupcomment);
            var comment = new FollowUpComment(this.followupcomment.trim(), DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING), this.customerName);
            this.totalComment = 1;
        } else {
            this.totalComment = 0;
        }
        this.updatecomments = [];
        if (this.totalComment == 1) {
            this.updatecomments.push(comment);
        }
        var openFuData = {};
        openFuData['TaskData'] = '';
        openFuData['Status'] = false;

        this.isPersonal = this.followupDetail.IsPersonal;
        var followupId = this.followupDetail.FollowUpID;
        this.followupStatus = this.followupDetail.FollowUpStatus;
        upstream.Logger.info(FollowupModalComponent.TAG, "Changes in followup call ui id " + followupId);
        var followUpModel = new FollowUpModel(followupId, this.userId, this.followupChannel, this.totalComment, this.customer,
            Number(this.followupStatus), Number(this.followUpType), Number(this.selectedLabelKey), this.isPersonal, this.customerName,
            this.followupDueDate, this.followupSubject.trim(), this.updatecomments, this.selectedSkill, this.getAppliedNotification());

        this.isRequesting = true;
        this.refreshDOM();

        this.sub = this._followupService.reqCompleteFollowUp(followUpModel).subscribe(result => {
            upstream.Logger.info(FollowupModalComponent.TAG, "callCompleteApi's Response : " + result);
            this.followupcomment = "";
            this.dueDateChange.emit("On Complete followup");//update notification on complete followup
            if (!this.isSaveOnly) {
                this.queueAnyTaskSkill(this.followupDetail);
            } else {
                this.isRequesting = false;
                this.isSaveOnly = false;
                this.callGetCommentApi(followupId);
            }
            this.hub.publish("com.upstreamworks.events.openFUCount", openFuData);
            this.refreshDOM();
        }, error => {
            this.errorMessage = <any>error;
            this.isRequesting = false;
            if (!this.isSaveOnly) {
                this.confirmationModal.show(this.UIParams.ErrorUpdate, AppConstant.ALERT);
            } else {
                this.isSaveOnly = false;
                this.confirmationModal.show(this.UIParams.ErrorAddComment, AppConstant.ALERT);
            }
            this.hub.publish("com.upstreamworks.events.openFUCount", openFuData);
            this.refreshDOM();
        });
    }

    /**
     * Method invoked on cliking Save and Add button
     */
    saveComment() {
        if (!this.isAllDetailsValid()) {
            return;
        }
        this.isSaveOnly = true;
        this.updateFollowup();
        this.refreshDOM();
    }

    /**
     * Method to get all commetns regarding a FollowUp
     * @param followupId : FollowUp id
     */
    callGetCommentApi(followupId) {
        upstream.Logger.info(FollowupModalComponent.TAG, "callGetCommentApi Invoked for followupId " + followupId);
        this.sub = this._followupService.getFollowupComment(followupId).subscribe(result => {
            this.followupDetail.Comment = [];
            if (result) {
                [].push.apply(this.followupDetail.Comment, result.Comments);
            }
            this.refreshDOM();
        }, error => {
            this.errorMessage = <any>error
            upstream.Logger.error(FollowupModalComponent.TAG, " Error : " + this.errorMessage);
            this.confirmationModal.show(this.UIParams.ErrorFetchComment, AppConstant.ALERT);

            this.refreshDOM();
        });
    }

    /**
     * Set all warning to default
     */
    setWarningsToDefault() {
        this.showTypeRequiredWarning = false;
        this.showSubjectRequiredWarning = false;
        this.showDueDateInvalidWarning = false;
        this.showCustomDateInvalidWarning = false;
        this.isDueDateChanged = false;
        this.refreshDOM();
    }

    @HostListener(AppConstant.BEFOREUNLOAD)
    cleaupTask() {
        upstream.Logger.info(FollowupModalComponent.TAG, "on cleanup called");
        this.releaseLock();
    }

    isDueDateValid(date: string) {
        
        var verify = DateTimeUtil.dateComparator(date, AppConstant.BLANK_STRING) != -1;
        return verify;
    }

    commentDateConverter(date) {

        return this.dateConverter(date);
    }

    onChangeSkill(value, field) {
        this.selectedSkill = value;
        this.isFollowupDetailChanged = false;
        if (this.selectedSkill != AppConstant.DEFAULT_SKILL) {
            this.saveAndUpdateButtonName = this.UIParams.SaveQueue;
        } else {
            this.saveAndUpdateButtonName = this.UIParams.SaveClose;
        }
    }

    queueAnyTaskSkill(followUpItem: FollowupDetail) {
        this.isRequesting = false;
        this.scrollToDashboardHeader();
        this.hide();
        this.refreshDOM();
    }

    hideConfirmationDialog() {
        this.confirmationModal.hideConfirmationDialog();
    }

    confirmQueueTask(event: any) {
        if (this.isNewFollowUp) {
            this.createFollowUp();
        } else {
            if (this.setFollowUpComplete) {
                this.followupDetail.FollowUpStatus = this.configurationData.Status[2].StatusID;
            }
            this.updateFollowup();
        }
    }

    /**
     * Check whether all details are valid or not
     */
    isAllDetailsValid(): boolean {
        if ((!this.isNewFollowUp && this.followUpType == AppConstant.DEFAULT_ID) || (this.isNewFollowUp && this.insertFollowUp.FollowUpType == AppConstant.DEFAULT_ID)) {
            this.showTypeRequiredWarning = true;
            upstream.Logger.info(FollowupModalComponent.TAG, "Warning type");
        }
        if (this.followupSubject == AppConstant.BLANK_STRING || this.followupSubject.trim().length == 0) {
            upstream.Logger.info(FollowupModalComponent.TAG, "Warning subject");
            if (this.isNewFollowUp)
                this.insertFollowUp.FollowUpSubject = "";
            this.followupSubject = "";
            this.showSubjectRequiredWarning = true;
        }
        var isDueValid = this.isNewFollowUp ? this.isDueDateValid(this.insertFollowUp.FollowUpDueDate) : this.isDueDateValid(this.followupDueDate);
        if ((this.isNewFollowUp || this.isDraftFollowUp) && !isDueValid) {
            this.showDueDateInvalidWarning = true;
        } else if (!isDueValid && !this.isSaveOnly && this.isDueDateChanged) {
            this.showDueDateInvalidWarning = true;
        }
        this.showCustomDateInvalidWarning = !this.iscustomNotifcationValid();
        
        if (this.showTypeRequiredWarning || this.showSubjectRequiredWarning || this.showDueDateInvalidWarning || this.showCustomDateInvalidWarning) {
            return false;
        }
        this.refreshDOM();
        return true;
    }

    private pollingTimer() {
        this.resetTimer();
        let interval = +this.interval;
        upstream.Logger.info(FollowupModalComponent.TAG, "start polling");
        if (!isNaN(interval) && interval > 0) {
            this.currentInterval = setInterval(() => {
                let nInterval = +this.interval;
                if (!isNaN(this.interval) && nInterval > 0) {
                    this.doPoll();
                }
            }, interval);
        }
    }

    private resetTimer() {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = null;
        }
    }

    doPoll() {
        upstream.Logger.info(FollowupModalComponent.TAG, "doPoll=> method called");
        if (this.isInEditmode) {
            this.sub = this._followupService.reqRefreshFollowUpEditMode(this.followupDetail.FollowUpID, this.userId)
                .subscribe(result => {
                    upstream.Logger.info(FollowupModalComponent.TAG, "polling response " + result);
                }, error => {
                    upstream.Logger.error(FollowupModalComponent.TAG, error);
                });
        }
    }

    popUpDueDate() {
        this.showDueDateInvalidWarning = false
        this.singlePicker.minDate = new Date();
    }

    setNewFollowUpPersonalType(isNewPersonal: boolean) {
        this.isNewPersonal = isNewPersonal;
        this.refreshDOM();
    }
    showSkillConfimrationDialog() {
        var message = this.UIParams.SkillQueue.replace(AppConstant.PLACEHOLDER_1, this.selectedSkill);
        this.confirmationModal.show(message, AppConstant.CONFIRM);
    }

    /**
     * Method to set focus on comment in saved followup or subject in new FollowUp
     */
    modalShownCallbackHandler() {
        var el;
        if (this.isNewFollowUp) {
            el = document.getElementById(AppConstant.SUBJECT_NEW);
            if (el != null)
                el.focus();
        } else if (this.isInEditmode) {
            el = document.getElementById(AppConstant.COMMENT_BOX_CAROUSEL_ID);
            if (el != null)
                el.focus();
        }
    }

    scrollToContactInfo(event) {
        var contactInfoId;
        if (this.isNewFollowUp) {
            contactInfoId = AppConstant.CONTACT_INFO_ID;
        } else if (this.isInEditmode) {
            contactInfoId = AppConstant.CONTACT_INFO_CAROUSEL_ID;
        }
        document.getElementById(contactInfoId).scrollTop = document.getElementById(event.target.id).offsetTop - 10;
        this.refreshDOM();
    }

    btnToggleSave() {
        return (this.isFollowupDetailChanged && !this.isDraftFollowUp);
    }



    getSkills() {
        this.listOfSkills = [];
    }

    /**
     * Method to get followup status name
     * @param statusID
     */
    getFollowupStatus(statusID: number) {
        var statusMessage;
        if (this.configurationData == undefined || this.configurationData.Status.length == 0) {
            return;
        }
        var selectedStatus = this.configurationData.Status.find(electedStatus => electedStatus.StatusID == statusID);
        if (selectedStatus == undefined) {
            status = this.UIParams.SelectField;
        } else {
            statusMessage = this.UIParams[selectedStatus.Description];
        }
        if (this.isDraftFollowUp && statusID != this.configurationData.Status[2].StatusID) {
            statusMessage = this.UIParams.Draft;
        } else if(this.isNewFollowUp) {
            statusMessage = this.UIParams.New;
        }
        return statusMessage
    }

    /**
     * Method to get FollowUp type name
     * @param typeID
     */
    getFollowupType(typeID: number) {
        if (this.configurationData == undefined || this.configurationData.UserFollowUpTypes.length == 0) {
            return;
        }

        var typeName = "";
        var selectedType = this.configurationData.UserFollowUpTypes.find(x => x.FollowUpTypeId == typeID);
        if (typeID == AppConstant.DEFAULT_ID)
            typeName = this.UIParams.SelectField;
        else if (selectedType == undefined)
            typeName = this.getTypeName(typeID);
        else 
            typeName = selectedType.Name;
        return typeName;
    }


    isViewFollowUp() {
        return this.isNewFollowUp && this.isHideModal;
    }

    /**
     * Method to handle interaction change from IC
     */
    handleInteractionChangeEvent() {
        if (this.childModal.isShown && this.isOpenedFromActiveTask) {
             upstream.Logger.info(FollowupModalComponent.TAG, "Interaction change event received when a draft followup was open hence closing the draft");
            if (this.isNewFollowUp) {
                this.followUpLocalDetails.FollowUpDetails.IsOpen = false;
                this.saveDraftData(this.activeTaskInteractionId, JSON.stringify(this.followUpLocalDetails), "handleInteractionChangeEvent");
            } else if (this.isInEditmode) {
                return;
            }
            this.closeFollowUp(true);
        }
        this.refreshDOM();
    }

    setUserId(userId) {
        this.userId = userId;
        this.associatedTaskModal.setUserId(userId);
        this.refreshDOM();
    }

    /**
     * Method to update FollowUp type list
     * @param addDefaultType
     */
    updateEditFollowUpTypeList(addDefaultType:boolean, typeId:number) {
        this.editFollowUpUserTypes = [];
        if (addDefaultType) {
            this.editFollowUpUserTypes.push(new UserFollowUpTypes(AppConstant.DEFAULT_ID, AppConstant.DEFAULT_ID, this.UIParams.SelectField));
        }
        this.editFollowUpUserTypes.push.apply(this.editFollowUpUserTypes, this.configurationData.UserFollowUpTypes);
        if (this.editFollowUpUserTypes.find(x => x.FollowUpTypeId == typeId) == undefined && typeId != AppConstant.DEFAULT_ID)
            this.editFollowUpUserTypes.push(new UserFollowUpTypes(0, typeId, this.getTypeName(typeId)));
        this.editFollowUpUserTypes.sort(function (a, b) {
            var firstType = a.Name.toLowerCase(), secondType = b.Name.toLowerCase()
            if (firstType < secondType) //sort string ascending
                return -1
            if (firstType > secondType)
                return 1
            return 0 //default return value (no sorting)
        });
    }
    getTypeName(typeID: number) {
        if (this.configurationData == undefined || this.configurationData.FollowUpTypes.length == 0) {
            return;
        }
        var selectedType = this.configurationData.FollowUpTypes.find(electedType => electedType.FollowUpTypeId == typeID);
        if (typeID == AppConstant.DEFAULT_ID || selectedType == undefined) {
            return this.UIParams.SelectField;
        } else {
            return selectedType.Name;
        }
    }


    setTaskDetails(taskDetails) {
        this.taskRequestData = taskDetails;
    }


    showTaskDetails() {
        this.getAssociatedTaskDetails(this.taskRequestData, AppConstant.SHOW_ASSOCIATED_TASK);
        this.refreshDOM();
    }
    closeAssociatedTaskModal() {
        this.isAssociatedTask = false;
        if (!this.isNewFollowUp)
            this.carouselComponent.hideCarousel(false);
        this.refreshDOM();
    }

    /**
     * Method to get associated task information
     * @param taskDetails
     * @param from
     */
    getAssociatedTaskDetails(taskDetails: TaskFollowUpDetails, from: string) {
        //whenver details are fetched  we fetch details regarding associated tasks
        //Here an API will be called to fetch details and initialize AssociatedTaskComponent
        if (!taskDetails) {
            if (from != AppConstant.SHOW_ASSOCIATED_TASK)
                this.associatedTaskDetails = undefined;
            else {
                this.confirmationModal.show(this.UIParams.OpenAssociatedTaskError, AppConstant.ALERT);
                this.refreshDOM();
                return;
            }
        }
        this.sub = this._followupService.getAssociatedTaskDetails(taskDetails.TaskId, taskDetails.SubInteractionId)
            .subscribe(result => {
                if (from == AppConstant.SHOW_ASSOCIATED_TASK && result == null) {
                    this.confirmationModal.show(this.UIParams.OpenAssociatedTaskError, AppConstant.ALERT);
                    this.refreshDOM();
                    return;
                }

                this.associatedTaskDetails = result;
                upstream.Logger.info(FollowupModalComponent.TAG, "Associated task details received are", this.associatedTaskDetails);
                this.refreshDOM();
                if (from == AppConstant.SHOW_ASSOCIATED_TASK) {
                    if (this.associatedTaskDetails.TaskStatus != "COMPLETED") {
                        this.sub = this._followupService.getTaskSummaryByTaskId(taskDetails.TaskId)
                            .subscribe(result => {
                                upstream.Logger.info(FollowupModalComponent.TAG, "Status is not completed hence fetching task data", result);
                                this.associatedTaskModal.isCompleted(false);
                                this.onFetchMediaDetialNotify(result);
                            }, error => {
                                upstream.Logger.error(FollowupModalComponent.TAG, error);
                                this.confirmationModal.show(this.UIParams.OpenAssociatedTaskError, AppConstant.ALERT);
                                this.refreshDOM();
                            });
                    } else {
                        this.sub = this._followupService.getInteractionByTaskId(taskDetails.TaskId, taskDetails.SubInteractionId)
                            .subscribe(result => {
                                upstream.Logger.info(FollowupModalComponent.TAG, "Status is completed hence fetching interaction data", result);
                               // this.associatedTaskDetails = result;
                                this.associatedTaskModal.isCompleted(true);
                                this.onFetchInteractionMediaDetailNotify(result);
                            }, error => {
                                upstream.Logger.error(FollowupModalComponent.TAG, error);
                                this.confirmationModal.show(this.UIParams.OpenAssociatedTaskError, AppConstant.ALERT);
                                this.refreshDOM();
                            });
                    }
                }
            }, error => {
                //if error gets in fetching associated task details message is displayed in asociated task section
                if (from == AppConstant.SHOW_ASSOCIATED_TASK) {
                    this.confirmationModal.show(this.UIParams.OpenAssociatedTaskError, AppConstant.ALERT);
                    this.refreshDOM();
                }
                this.associatedTaskDetails = undefined;
                upstream.Logger.error(FollowupModalComponent.TAG, error);
            });
    }

    onFetchInteractionMediaDetailNotify(event) {
        this.associatedTaskModal.setAssociatedTaskDetails(event);
        this.associatedTaskModal.startLoaders();
        this.fetchInteractionMediaDetailNotify.emit(event);
    }
    onFetchMediaDetialNotify(event) {
        var taskData = event.Tasks;
        this.associatedTaskModal.setAssociatedTaskDetails(taskData);
        this.associatedTaskModal.startLoaders();
        this.fetchMediaDetialNotify.emit(taskData);
    }
    onFetchInteractionDetailsAck(data) {
        if (this.associatedTaskModal.isTaskDetailLoading) {
            if (!this.isAssociatedTask) {
                this.isAssociatedTask = true;
                if (!this.isNewFollowUp) {
                    this.carouselComponent.hideCarousel(true);
                }
            }
            this.refreshDOM();
            this.associatedTaskModal.taskDataReceived(data);
        }
    }
    onFetchMediaAck(data) {
        if (!this.isAssociatedTask) {
            this.isAssociatedTask = true;
            if (!this.isNewFollowUp) {
                this.carouselComponent.hideCarousel(true);
            }
        }
        this.refreshDOM();
        this.associatedTaskModal.mediaDataReceived(data);
    }
    onFetchMediaError() {
        this.isAssociatedTask = false;
        if (!this.isNewFollowUp)
            this.carouselComponent.hideCarousel(false);
        this.associatedTaskModal.closeAssociatedTaskModal();
        this.confirmationModal.show(this.UIParams.OpenAssociatedTaskError, AppConstant.ALERT);
        this.refreshDOM();
    }

    setAgentName(agentName: string) {
        this.agentName = agentName;
        upstream.Logger.info("Agent Name ==>" + this.agentName);
    }
    getContactReasonDetails(contactReason, contactReasonDetail) {

        if (!contactReason && !contactReasonDetail) {
            return AppConstant.BLANK_STRING;
        }

        if (contactReason == AppConstant.BLANK_STRING) {
            return contactReasonDetail;
        } else if (contactReasonDetail == AppConstant.BLANK_STRING) {
            return contactReason;
        } else {
            return contactReason + "/" + contactReasonDetail;
        }
    }

    setChannelType(channelType: number) {
        this.channelType = channelType;
        upstream.Logger.info("ChannelType==>" + this.channelType);
    }
    getIconPerChannel(channelIcon) {
        if (channelIcon) {
            return "up-task-icon-small " + channelIcon;
        } else if (this.associatedTaskDetails ) {
            return "up-task-icon-small " + this.associatedTaskDetails.ChannelIcon;
        } else {
            return "up-task-icon-small ";
        }
    }

    hideAssociatedTaskModal() {
        if (this.associatedTaskModal.taskModalDirective.isShown) {
            this.associatedTaskModal.closeAssociatedTaskModal();
            this.refreshDOM();
        }
    }

    getFollowUpDueDateTitle(dueDate) {
        var titleValue;
        if (dueDate) {
            titleValue = this.showDueDateInvalidWarning ? '' : moment(dueDate).format(AppConstant.MM_DD_YY_HH_MM_FORMAT);
        } else {
            titleValue = "Undefined date";
        }
        return titleValue;
    }

    scrollToDashboardHeader() {
        if (document.getElementById('followUpHeader') != null)
            document.getElementById('followUpHeader').scrollIntoView();
    }

    customDateConverter(date) {
        return this.dateConverter(date);
    }
    removeDefaultSubjectWarning() {
        if (this.showSubjectRequiredWarning) {
            this.showSubjectRequiredWarning = false;
            this.refreshDOM();
        }
    }

    public set isFollowUpOpenedFromActiveTask(value) {
        this.isOpenedFromActiveTask = value;
    }
    broadcastFollowUpEditModeEvent(isOpenedFromActiveTask, isEditModeEnable, followUpId) {
        var followUpEditStatus = {};
        followUpEditStatus['openedFromActiveTask'] = isOpenedFromActiveTask;
        followUpEditStatus['isInEditMode'] = isEditModeEnable;
        followUpEditStatus['followUpId'] = followUpId;
        this.hub.publish('com.upstreamworks.events.followupEditModeChange', followUpEditStatus);
    }

    saveDraftFollowUp() {
        this.insertFollowUp.FollowUpType = this.followUpType;
        this.insertFollowUp.FollowUpLabel = this.selectedLabelKey;
        this.insertFollowUp.FollowUpDueDate = this.followupDueDate;
        this.insertFollowUp.FollowUpSubject = this.followupSubject;
        this.createFollowUp();
    }
    setCustomerInformation(custInfo: any) {
        this.customer = new Customer(custInfo.ContactId, custInfo.CustomerName,
            custInfo.CustomerSourceAddress, custInfo.CustomerNumber, custInfo.CustomerDestAddress);
    }

    /**
     * Method to handle custom notification status change
     * @param notificationName
     * @param value
     */
    onFollowUpNotificationStatusChange(notificationName, value) {
        if (notificationName == AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE) {
            var singleDateSelected = value.picker.startDate;
            this.customNotificationDate = DateTimeUtil.getDateStringInUTCFormat(singleDateSelected._d);
            var diffNumberOfDays = DateTimeUtil.differenceOfDatesInDays(singleDateSelected._d, AppConstant.BLANK_STRING);
            switch (diffNumberOfDays) {
                case 1: this.customRangeSelectedString = this.UIParams.Tomorrow;
                    break;
                case 3: this.customRangeSelectedString = this.UIParams.In3Days;
                    break;
                case 7: this.customRangeSelectedString = this.UIParams.In1Week;
                    break;
                default:
                    this.customRangeSelectedString = value.picker.startDate.format(AppConstant.MM_DD_YY_FORMAT);
            }   
            this.showCustomDateInvalidWarning = false;
            this.updateCheckBoxForCustomDate();
        }
        this.isFollowupDetailChanged = false;
        this.refreshDOM();
    }

    /**
     * Method to getwhat notifications are applied before updating or creating FollowUp
     */
    getAppliedNotification() {
        var isDueDateChecked, isCompleteDateChecked, isCustomDateChecked;
        var customDateNotification, dueDateNotification, completeDateNotification;
        isDueDateChecked = (<HTMLInputElement>document.getElementsByName(AppConstant.DUE_DATE_NOTIFICATION_TYPE)[0]) ? (<HTMLInputElement>document.getElementsByName(AppConstant.DUE_DATE_NOTIFICATION_TYPE)[0]).checked:false;
        isCompleteDateChecked = (<HTMLInputElement>document.getElementsByName(AppConstant.COMPLETE_DATE_NOTIFICATION_TYPE)[0]) ?(<HTMLInputElement>document.getElementsByName(AppConstant.COMPLETE_DATE_NOTIFICATION_TYPE)[0]).checked:false;
        isCustomDateChecked = (<HTMLInputElement>document.getElementsByName(AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE)[0]) ? (<HTMLInputElement>document.getElementsByName(AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE)[0]).checked:false;
        if (this.isNewFollowUp) {
            this.followUpNotification = [];
            if (isDueDateChecked) {
                this.followUpNotification.push(new FollowUpNotification(AppConstant.DUE_DATE_NOTIFICATION_TYPE, DateTimeUtil.getDateStringInUTCFormat(this.insertFollowUp.FollowUpDueDate), AppConstant.DEFAULT_NOTIFICAITON_STATUS));
            }
            if (isCompleteDateChecked) {
                this.followUpNotification.push(new FollowUpNotification(AppConstant.COMPLETE_DATE_NOTIFICATION_TYPE, null, AppConstant.DEFAULT_NOTIFICAITON_STATUS));
            }
            if (isCustomDateChecked && this.customRangeSelectedString != this.UIParams.OtherDate) {
                this.followUpNotification.push(new FollowUpNotification(AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE, DateTimeUtil.getDateStringInUTCFormat(this.customNotificationDate), AppConstant.DEFAULT_NOTIFICAITON_STATUS));
            }
        } else if (!this.isNewFollowUp && this.userId == this.followupDetail.UserID) {
            dueDateNotification = this.followUpNotification.find(x => x.NotificationType == AppConstant.DUE_DATE_NOTIFICATION_TYPE);
            completeDateNotification = this.followUpNotification.find(x => x.NotificationType == AppConstant.COMPLETE_DATE_NOTIFICATION_TYPE);
            customDateNotification = this.followUpNotification.find(x => x.NotificationType == AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE);
            this.followUpNotification = [];
            if (isDueDateChecked) {
                if (dueDateNotification != undefined && !this.isDueDateChanged) {
                    this.followUpNotification.push(new FollowUpNotification(AppConstant.DUE_DATE_NOTIFICATION_TYPE, DateTimeUtil.getDateStringInUTCFormat(this.followupDueDate), dueDateNotification.NotificationStatus));
                } else {
                    this.followUpNotification.push(new FollowUpNotification(AppConstant.DUE_DATE_NOTIFICATION_TYPE, DateTimeUtil.getDateStringInUTCFormat(this.followupDueDate), AppConstant.DEFAULT_NOTIFICAITON_STATUS));
                }
            }
            if (isCompleteDateChecked) {
                this.followUpNotification.push(new FollowUpNotification(AppConstant.COMPLETE_DATE_NOTIFICATION_TYPE, null, AppConstant.DEFAULT_NOTIFICAITON_STATUS));
            }
            if (isCustomDateChecked && this.customRangeSelectedString != this.UIParams.OtherDate) {
                if (customDateNotification != undefined && DateTimeUtil.dateComparator(customDateNotification.NotificationValue, this.customNotificationDate) == 0) {
                    this.followUpNotification.push(new FollowUpNotification(AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE, DateTimeUtil.getDateStringInUTCFormat(this.customNotificationDate), customDateNotification.NotificationStatus));
                } else {
                    this.followUpNotification.push(new FollowUpNotification(AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE, DateTimeUtil.getDateStringInUTCFormat(this.customNotificationDate), AppConstant.DEFAULT_NOTIFICAITON_STATUS));
                }
            }
        }
        return this.followUpNotification;
    }

    /**
     * Update json for notifications before closing FollowUp
     */
    updateJsonRegardingNotification() {
        if (this.isDraftFollowUp && this.followUpEditDetails && localStorage.getItem(this.followUpEditDetails.FollowUpId)) {
            this.followUpEditDetails.FollowUpDetails.Notifications = this.getAppliedNotification();
            this.followUpEditDetails.FollowUpDetails.customNotificationDate = this.customNotificationDate;
            this.saveDraftData(this.followupDetail.FollowUpID, JSON.stringify(this.followUpEditDetails), " updateJsonRegardingNotification if");
        } else if (this.isNewFollowUp && localStorage.getItem(this.activeTaskInteractionId)) {
            this.followUpLocalDetails.FollowUpDetails.Notifications = this.getAppliedNotification();
            this.followUpLocalDetails.FollowUpDetails.customNotificationDate = this.customNotificationDate;
            this.saveDraftData(this.activeTaskInteractionId, JSON.stringify(this.followUpLocalDetails), "updateJsonRegardingNotification else");
        }
    }

    isDueDateNotificationAllowed() {
        return !this.isDueDateValid(this.followupDueDate) || !this.isInEditmode;
    }

    isFollowUpNotificationChecked(notificationItemName) {
        if (this.followUpNotification.find(x => x.NotificationType == notificationItemName) != undefined) {
            return true;
        }
        return false;
    }

    /**
     * Check validation for custom notification
     */
    iscustomNotifcationValid() {
        var isCustomDateChecked = (<HTMLInputElement>document.getElementsByName(AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE)[0]) ?(<HTMLInputElement>document.getElementsByName(AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE)[0]).checked:false;
        if (isCustomDateChecked != undefined && isCustomDateChecked && this.customRangeSelectedString == this.UIParams.OtherDate) {
            return false;
        }
        return true;
    }

    /**
     * Method to update custom notification check box
     */
    updateCheckBoxForCustomDate() {
        var customDateCheckElement = (<HTMLInputElement>document.getElementsByName(AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE)[0]);;
        if (customDateCheckElement != undefined) {
            customDateCheckElement.checked = true;
            this.isCustomNotificationChecked = true;
        }
    }

    /**
     * Method ot handle custom notification status change
     * @param field
     * @param value
     */
    onCustomNotificationStatusChange(field, value) {
        if (!value.target.checked) {
            this.customRangeSelectedString = this.UIParams.OtherDate;
            this.isCustomNotificationChecked = false;
        } else {
            this.isCustomNotificationChecked = true;
        }
        this.isFollowupDetailChanged = false;
        this.refreshDOM();
    }

    
    /**
    * @param followUpId : Id regarding which status needs to be updated.
    * @param notifications : Notifications for the followup.
    * Update status of unread notifications to viewed.
    */
    updateNotificationStatus(followUpId, notifications: Array<FollowUpNotification>) {
        if (!notifications) {
            return;
        }
        var valueArray = [];
        var value = {};
        notifications.forEach((item, index) => {
            if (item.NotificationStatus == AppConstant.DELIVERED_NOTIFICAITON_STATUS) {
                value = {};
                value['FollowUpId'] = followUpId;
                value['NotificationType'] = item.NotificationType;
                value['NotificationValue'] = (item.NotificationValue == null || item.NotificationValue == undefined) ? item.NotificationValue : DateTimeUtil.getDateStringInUTCFormat(item.NotificationValue);
                value['NotificationStatus'] = AppConstant.VIEWED_NOTIFICAITON_STATUS;
                valueArray.push(value);
            }
        });
        this.hub.publish('com.upstreamworks.events.update_notification', JSON.stringify(valueArray));
    }

    /**
     * Method to set width for details on run time
     */
    setSelectTagWidth() {
         var selectParent;
         selectParent = this.isNewFollowUp ? (<HTMLInputElement>document.getElementsByName(AppConstant.SELECT_TAG_PARENT)[0]) : (<HTMLInputElement>document.getElementsByName(AppConstant.SELECT_TAG_PARENT)[0]);
         this.selectTagWidth = (selectParent == undefined || selectParent.offsetWidth == 0) ? AppConstant.DEFAULT_SELECT_TAG_SIZE : (selectParent.offsetWidth - 10) + AppConstant.PIXEL;
         this.refreshDOM();
    }

    /**
    * @param datum
    * display FU personal icon for creater
    */
    showPersonalIcon(datum: FollowupDetail) {
        return datum != undefined ? (datum.IsPersonal && datum.UserID.toString() == this.userId) : false;
    }

    public refreshDOM() {
        if (!this.ref['destroyed']) {
            this.ref.detectChanges();
        }
    }


    public saveDraftData(key: string, value: any, from: string) {
        upstream.Logger.info(FollowupModalComponent.TAG, " saveDraftData From " + from);
        localStorage.setItem(key, value);
    }

    public updateCheckBoxStatusForNotifications() {
        var dueDateNotificationElement, customDateNotificationElement, completeDateNotificationElement;
        dueDateNotificationElement = (<HTMLInputElement>document.getElementsByName(AppConstant.DUE_DATE_NOTIFICATION_TYPE)[AppConstant.ZERO_INDEX]);
        completeDateNotificationElement = (<HTMLInputElement>document.getElementsByName(AppConstant.COMPLETE_DATE_NOTIFICATION_TYPE)[AppConstant.ZERO_INDEX]);
        customDateNotificationElement = (<HTMLInputElement>document.getElementsByName(AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE)[AppConstant.ZERO_INDEX]);
        if (dueDateNotificationElement) {
            dueDateNotificationElement.checked = this.isFollowUpNotificationChecked(AppConstant.DUE_DATE_NOTIFICATION_TYPE);
        }
        if (completeDateNotificationElement) {
            completeDateNotificationElement.checked = this.isFollowUpNotificationChecked(AppConstant.COMPLETE_DATE_NOTIFICATION_TYPE);
        }
        if (customDateNotificationElement) {
            customDateNotificationElement.checked = this.isFollowUpNotificationChecked(AppConstant.CUSTOM_DATE_NOTIFICATION_TYPE);
        }
    }

    
    ngOnDestroy(): void{
        upstream.Logger.info(FollowupModalComponent.TAG, "on destry called");
        if (this.sub != null)
            this.sub.unsubscribe();
    }
    /**
     * Check FUType id present or not
     * @param typeId
     * @param FUTypes
     */
    private isValidFUType(typeId: number, FUTypes: UserFollowUpTypes[]): boolean {
        var isValid = true;
        if (!FUTypes)
            isValid = false;
        else {
            var FUType = FUTypes.find(x => x.FollowUpTypeId == typeId)
            if (FUType == undefined)
                isValid = false
        }
        if (!isValid)
            this.confirmationModal.show(this.UIParams.FUTypeValidation, AppConstant.ALERT);
        return isValid;
    } 

    public enableCompleButton(): void {
        if (this.completeFollowUpButton) {
                this.completeFollowUpButton.nativeElement.style.display = 'block';
                this.refreshDOM();
        }
    }
    /**
     * Set subject title 
     */
    public setSubjectTitle(subjectValue): string {
        return this.isInEditmode ? (this.UIParams != null ? this.UIParams.SubjectLine : '') : (subjectValue != null && subjectValue.length > 231) ? subjectValue.substring(0, 227) + "..." : subjectValue;
    }

    showHideDateRangePickerCalled($event) {
        //since hide event is called before apply event for dtareangepicekr calendar library, delay has been introduced
        if (this.isNewFollowUp || this.isInEditmode) {
            setTimeout(() => {
                var calendarDate = DateTimeUtil.dateComparator(this.followupDueDate, AppConstant.BLANK_STRING) <= 0 ? DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING) : this.followupDueDate;
                this.picker.datePicker.startDate = moment(calendarDate);
                this.picker.datePicker.endDate = moment(calendarDate);
            }, 200);
        }
        
    }
}
