import { FollowUpListHeaderComponent } from './../followup-listheader/followup-listheader.component';
import { FollowupModalComponent } from './../followup-detail/followup-modal.component';
import { UserFollowUpTypes } from '../followup-models/followup-user-types';
import { FollowupConfiguration } from '../followup-models/followup-configuration';
import { Notification } from '../followup-models/notification';
import {
    Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy,
    HostListener, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { FollowUpService } from '../shared/followup.service';
import { Followup } from '../followup-models/followup';
import { TaskFollowUpDetails } from '../followup-models/followup-taskdetail';
import { Subscription } from 'rxjs/Subscription';
import { Network } from 'ionic-native';
import { FollowUpFilter } from '../followup-models/followup-filters';
import { AppConstant } from '../util/util.appconstant';
import { AppUtil } from '../util/util.apputil';
import { FollowUpNotification } from '../util/util.followup.notification';
import { FollowupDetailRes } from '../followup-models/followup-detail-res';
import { FollowUpEditDetails } from '../followup-models/followup-editDetails';
import { FollowUpLocalDetails } from '../followup-models/followup-LocalDetails';
import { DateTimeUtil } from '../util/util.dateTime';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';



declare var upstream: any;
declare var gadgets: any;
declare var finesse: any;
declare var GadgetServices: any;
declare var UserServices: any;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'follow-ups',
  templateUrl: `./followup-list.component.html`,
  styleUrls: ['./followup-list.component.css'],
  host: { 'window:beforeunload': 'cleaupTask' }
})
export class FollowupListComponent implements OnInit, OnDestroy {
  private static TAG: string = 'FollowupListComponent';
  private sub: Subscription;
  public data: Array<Followup> = [];
  public modalData: Array<Followup> = [];
  public errorMessage: String;
  public currPage: number = 1;
  public offset: number = 0;
  public recordsPerPage: number = 25;
  public totalNumberOfRecords: number = 0;
  public isNotificationVisible = false;
  public notification: Notification;
  public label: number = AppConstant.ALL;
  public status: number = AppConstant.ALL;
  public type: number = AppConstant.ALL;
  public sortingOrder: string = AppConstant.DESC;
  public sortingColumn: string = AppConstant.EDUE_DATE;
  public sortingReverse: boolean = true;
  public searchMode: boolean = false;
  public txtSearch: string = AppConstant.BLANK_STRING;
  public isRequesting: boolean;
  public numberOfRecordsFound: string;
  public selectedFollowUp: Followup;
  public isInEditMode: boolean;
  public isNewFollowUp: boolean;
  public hub = gadgets.Hub;
  public isUserLoaded: boolean;
  private startDueDate = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
  private endDueDate = this.startDueDate;
  public followupIds: Array<string> = [];
  @ViewChild(AppConstant.MODAL_KEY) public  childModal: FollowupModalComponent;
  @ViewChild(FollowUpListHeaderComponent)
  private followUpListHeaderComponent: FollowUpListHeaderComponent;

  public selectedState: number = AppConstant.ALL;
  public isQueued: boolean = false;
  public isNotify: boolean = false;
  public configurationData: FollowupConfiguration;
  public isCreateNewFollowUp: boolean = false;
  private followupNotification: FollowUpNotification;

  public prefs = new gadgets.Prefs();
  public userId: string = null;
  public common = upstream.gadget.locale.Common;
  public  baseUri = upstream.gadget.Config.baseUri;
  public finesse = finesse;
  public containerServices = null;
  public gadgetTabId = null;
  public taskDetail: TaskFollowUpDetails;
  public localization = upstream.gadget.locale;
  public loginId: string = null;
  public followUpEditDetails: FollowUpEditDetails;
  public followUpLocalDetails: FollowUpEditDetails;
  public UIParam: any = this.localization.FollowUpGadget;
  public agentName: string;
  public isChecked: boolean = true;
  public dueDateSelectedLabel: string = this.UIParam.All;

  constructor(private _followupService: FollowUpService, private ref: ChangeDetectorRef) {
    this.startDueDate = AppConstant.ALL.toString();
    this.endDueDate = AppConstant.ALL.toString();
  }

  /**
   * check to which column sorting is apllied and reverse it if same column is chosen again. By default it is due date
   * @param columnName : represents column on which sorting is applied
   */
  changeSorting(columnName): void {
      this.offset = 0;
      this.sortingReverse = (this.sortingColumn === columnName) ? !this.sortingReverse : true;
      this.sortingOrder = this.sortingReverse ? AppConstant.DESC : AppConstant.ASC;
      this.sortingColumn = columnName;
      this.followupApiRequest();
  }

  /**
   * Call followup list
   * refresh data and rerender again list 
   */
  followupApiRequest() {
    this.isRequesting = true;
    this.refreshDOM();
    this.onNotificationCancel();
    if (this.configurationData == undefined || this.configurationData == null) {
      upstream.Logger.info(FollowupListComponent.TAG, "Unable toolbar get configuration data");
      this.getConfiguration(this.loginId);
      return;
    }
   
    this.updateDueDateRange();
    this.sub = this._followupService.getFollowUps(this.selectedState, this.offset, this.recordsPerPage, this.label, this.status,
        this.type, this.sortingColumn, this.sortingOrder, this.txtSearch, this.startDueDate, this.endDueDate, this.isNotify, AppConstant.USER_ID).subscribe(result => {
            if (result == null) {
                this.blankResponseHandling();
                return;
            }
        upstream.Logger.info(FollowupListComponent.TAG, "Response : " + result);
        this.isRequesting = false;//hide asyncloader
        this.refreshDOM();
        if (this.modalData.length == AppConstant.ZERO_LENGTH)
             this.repareModalData();
        this.data = [];

        [].push.apply(this.data, result.FollowUpList);
        this.currPage = 1;
        this.totalNumberOfRecords = result.TotalRecords;

        if (this.data.length == AppConstant.ZERO_LENGTH) {
          this.numberOfRecordsFound = this.localization.FollowUpGadget.NoRecord;
        }
        else {
          this.numberOfRecordsFound = this.localization.FollowUpGadget.RecordFoundMessage.replace(AppConstant.PLACEHOLDER_1, this.totalNumberOfRecords);
        }
        this.refreshDOM();
        GadgetServices.hub.publish('com.upstreamworks.events.UpdateDueFollowUp', true); //Update followUp tab indicator for any due followup
        //create new follow up
        if (this.isCreateNewFollowUp) {
          this.isCreateNewFollowUp = false;
          this.setEditMode(true, null, true);
        }
        this.refreshDOM();
      }, error => {
        this.isRequesting = false;
        this.errorMessage = <any>error;
        //clear data in this particular order to reset carousel to any changes done.
        this.data = [];

        this.totalNumberOfRecords = 0;
        upstream.Logger.error(FollowupListComponent.TAG, " Error : " + this.errorMessage);
        this.numberOfRecordsFound = AppConstant.BLANK_STRING;
        GadgetServices.hub.publish('com.upstreamworks.events.UpdateDueFollowUp', true); //Update followUp tab indicator for any due followup
        if (Network.type == null) {
          this.showNotification(this.UIParam.ErrorConnect, AppConstant.DANGER_KEY);
          this.refreshDOM();
          return;
        }
        this.showNotification(this.UIParam.ErrorConnect, AppConstant.DANGER_KEY);
        this.refreshDOM();
      });
  }
  
  ngOnInit() {
    upstream.Logger.info(FollowupListComponent.TAG, "ngOnInit called");
    this.followupNotification = new FollowUpNotification();
    this.isRequesting = true;
    this.isUserLoaded = false;
    upstream.Logger.info(FollowupListComponent.TAG, "User Id " + this.userId);
    this.hub.subscribe('com.upstreamworks.events.followup', this.recievedEvent.bind(this));

    UserServices.loadUser().then(currentUser => {
     
      if (this.isUserLoaded) {
        this.isRequesting = false;
        this.refreshDOM();
        upstream.Logger.info(FollowupListComponent.TAG, "Return " + this.isRequesting);
        return;
      }

      if (!currentUser) {
        upstream.Logger.error('FollowUp', 'Got invalid user object from UserServices. Make sure the user exists in the system.');
        return;
      }
      this.isUserLoaded = true;
      this.agentName = currentUser.FirstName + " " + currentUser.LastName;
      upstream.Logger.info(FollowupListComponent.TAG, "User Login ==>" + currentUser.UserId);
      AppConstant.USER_ID = this.userId = currentUser.UserId;
      this.loginId = currentUser.Login;
      this.refreshDOM();
      this.onUserInitialized(this.loginId);


    });

    GadgetServices.hub.subscribe('com.upstreamworks.events.refreshFollowUps', this.onRefreshClick.bind(this));
    GadgetServices.hub.subscribe('com.upstreamworks.events.fetchMediaRequestAck', this.onFetchMediaAck.bind(this));
    GadgetServices.hub.subscribe("com.upstreamworks.events.fetchInteractionDetail", this.onFetchInteractionDetailsAck.bind(this));
     upstream.Logger.info(FollowupListComponent.TAG, "Local storage has activeTaskInteractionKey set to", localStorage.getItem("activeTaskInteraction"));
    GadgetServices.hub.subscribe("com.upstreamworks.events.interactionChanged", this.onInteractionChanged.bind(this));
    GadgetServices.hub.subscribe("com.upstreamworks.events.showFollowUpCarousel", this.onShowCarouselEvent.bind(this));
    GadgetServices.hub.subscribe("com.upstreamworks.events.fetchMediaRequestError", this.onFetchMediaError.bind(this));
    GadgetServices.hub.subscribe('com.upstreamworks.events.view_followup', this.viewFollowUp.bind(this));
    GadgetServices.hub.subscribe('com.upstreamworks.tasks.completed', this.taskCompleted.bind(this));
    GadgetServices.hub.subscribe('com.upstreamworks.subinteraction.delete', this.deleteSubInteraction.bind(this));
    GadgetServices.hub.subscribe('com.upstreamworks.events.UpdatefollowupCustInfo', this.updateFollowUpCustInfo.bind(this));
    GadgetServices.hub.subscribe('com.upstreamworks.closeFollowUpModal', this.closeFollowUpModal.bind(this));
    GadgetServices.hub.subscribe('com.upstreamworks.event.updateNotification', this.handleNotification.bind(this));
    GadgetServices.hub.subscribe('com.upstreamworks.events.view_multiple_followup_notification', this.viewMultipleFollowupNotifications.bind(this));
    GadgetServices.hub.subscribe('com.upstreamworks.events.update_notification', this.updateNotificationApi.bind(this));

    // Initialize Finesse container services and add handler for gadget tab activation
    this.containerServices = this.finesse.containerservices.ContainerServices.init();
    this.containerServices.addHandler(this.finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB, this.gadgetTabActivated.bind(this));
    GadgetServices.hub.publish("com.upstreamworks.events.followup_gadget_loaded", true);
    upstream.Logger.debug(FollowupListComponent.TAG, "HandshakingRequest send by followup list  init");
    GadgetServices.hub.subscribe("com.upstreamworks.events.followup_gadget_handshake", this.handShakeWithInteractionCapture.bind(this));
  }

  private handShakeWithInteractionCapture() {
      upstream.Logger.debug(FollowupListComponent.TAG, "HandshakingRequest send by followup list  ");
      GadgetServices.hub.publish("com.upstreamworks.events.followup_gadget_loaded", true);
  }
  /**
   * call'll come after followup tab activated and refresh notification list
   */
  private gadgetTabActivated() {
    var value = {};
    value['from'] = 'On Gadget flip';
    upstream.Logger.debug(FollowupListComponent.TAG, "On Gadget flip  ");
    this.handleNotification(null, JSON.stringify(value));
  }

  /**
   * Method binded to event com.upstreamworks.events.fetchInteractionDetail, received when data regarding associated task is fetched
   * @param topic : name of the event
   * @param data : data containing interaction details
   */
  onFetchInteractionDetailsAck(topic, data) {
    this.childModal.onFetchInteractionDetailsAck(data);
    this.refreshDOM();
  }

  /**
   * Method binded to event com.upstreamworks.events.fetchMediaRequestAck , recieved when media regarding a task is fetched
   * @param topic : name of the event
   * @param data : data containig media details
   */
  onFetchMediaAck(topic, data) {
    this.childModal.onFetchMediaAck(data);
    this.refreshDOM();
  }
  /**
   * Method binded to event com.upstreamworks.events.fetchMediaRequestError , recieved when media error regarding a task is fetched
   * @param topic : name of the event
   * @param data : data containig media error details
   */
  onFetchMediaError(topic, data) {
    upstream.Logger.debug(FollowupListComponent.TAG, "Media error received");
    this.childModal.onFetchMediaError();
    this.refreshDOM();
  }

  /**
   * Got request to create followup from InteractionView
   * @param topic
   * @param data
   */
  recievedEvent(topic, data) {
    var followupType = data.type;
    upstream.Logger.debug(FollowupListComponent.TAG, "request to create followup of type :: " + JSON.stringify(data));
    this.taskDetail = new TaskFollowUpDetails(0, data.taskId, data.SubInteractionId,"","");
    this.childModal.setTaskDetails(this.taskDetail);
    this.childModal.setAgentName(this.agentName);
    this.childModal.setChannelType(data.channeltype);
    this.childModal.isFollowUpOpenedFromActiveTask = true;
    this.childModal.setCustomerInformation(data.CustomerInfo);
    var subInteraction = data.SubInteractionId.toString();
    var postFixKey = subInteraction.substr(subInteraction.length - 1, subInteraction.length)
    var postFixKeyVal = parseInt(postFixKey, AppConstant.SUBINTERACTION_LEN) - AppConstant.ONE;
    this.childModal.saveDraftData(AppConstant.ACTIVE_TASK_INTERACTION, data.taskId + postFixKeyVal, "recievedEvent");
    this.childModal._taskId = data.taskId;
    if (followupType === AppConstant.PUBLIC_FOLLOWUP) {
      upstream.Logger.debug(FollowupListComponent.TAG, "public modal open");
      this.childModal.setNewFollowUpPersonalType(false);
      if (this.configurationData != undefined && this.configurationData != null) {
        this.isCreateNewFollowUp = false;
        this.setEditMode(true, null, true);
      } else {
        this.isCreateNewFollowUp = true;
        this.getConfiguration(this.loginId);
      }
    } else if (followupType === AppConstant.PERSONAL_FOLLOWUP) {
      upstream.Logger.debug(FollowupListComponent.TAG, "personal modal open");
      this.childModal.setNewFollowUpPersonalType(true);
      upstream.Logger.info(FollowupListComponent.TAG, this.configurationData);
      if (this.configurationData != undefined && this.configurationData != null) {
        this.isCreateNewFollowUp = false;
        this.setEditMode(true, null, true);
      } else {
        this.isCreateNewFollowUp = true;
        this.getConfiguration(this.loginId);
      }
    }
  }

  /**
   * Got request to View followup from Interaction View
   * @param topic
   * @param data
   */
  viewFollowUp(topic, data) {
    this.childModal.isFollowUpOpenedFromActiveTask = true;
    var reqData = JSON.parse(data);
    var fId = parseInt(reqData.FollowUpId);
    var subId = reqData.interaction;
    var listArray = [];
    for (var index = 0; index <= subId; index++) {
      if (index == subId) {
        listArray.push(fId);
      } else {
        listArray.push(-1);
      }
    }
    upstream.Logger.info(FollowupListComponent.TAG, "Open Followup ID " + fId);
    //this.setEditMode(false, i, false);
    var req = {};
    req['FollowUpIdList'] = listArray;
    req['TaskId'] = reqData.taskId;
    this.onShowCarouselEvent(AppConstant.EMPTY_STRING, req);
  }

  taskCompleted(topic, data) {

  }

  /**
   * call when user loaded and after that fetch all configuartions
   * @param userLogin
   */
  onUserInitialized(userLogin: string) {
    this.isRequesting = true;
    this.refreshDOM();
    this.getConfiguration(userLogin);
    /* Update notification */
    var value = {};
    value['from'] = 'On Followup Gadget loaded';
    this.handleNotification(null, JSON.stringify(value));
  }

  /**
   * This method is callback method, called after 
   * personal toggle changed
   * @param followups 
   */
  onNotify(event: any): void {
    this.offset = 0;
    this.searchMode = false;
    this.selectedState = Number(event.selectedState);
    this.isQueued = event.isQueued;
    this.followupApiRequest();
  }
  /**
   * Received when toggle event is cliked to view to filtered dashboard list
   * @param event : contains toggle value (off or on)
   */
  onNotification(event: any): void {
    upstream.Logger.info(FollowupListComponent.TAG, "Received notification value=> " + event);
    this.offset = 0;
    this.sortingReverse = true;
    this.sortingOrder = AppConstant.DESC;
    this.isNotify = event;
    if (this.isNotify) {
      this.sortingColumn = AppConstant.ENOTIFY;
    } else {
      this.sortingColumn = AppConstant.EDUE_DATE;
    }
    this.followupApiRequest();
  }

  /**
   * Filter callback, when apply  filter label/status/type
   * @param filter
   */
  onFilterNotify(filter: any) {
    this.offset = 0;
    this.searchMode = false;
    upstream.Logger.info(FollowupListComponent.TAG, ' FilterValue => : ' + filter.filterValue + ' WhichFilter => ' + filter.whichFilter);
    switch (filter.whichFilter) {
      case AppConstant.LABEL_FILTER:
        this.label = Number(filter.filterValue);
        break;
      case AppConstant.STATUS_FILTER:
        this.status = Number(filter.filterValue);
        break;
      case AppConstant.TYPE_FILTER:
        this.type = Number(filter.filterValue);
        break;
    }
    this.refreshDOM();
    this.followupApiRequest();
  }

  /**
   * Event recieved when filter value of DueDate filter is changed from FollowUpListHeaderComponent
   * @param event : contains vlaue regarding the range
   */
  onDueDateRangechangeNotify(event) {
    upstream.Logger.info(FollowupListComponent.TAG, "Due date range set to", event.startDate, event.endDate);
    this.offset = 0;
    this.startDueDate = event.startDate;
    this.endDueDate = event.endDate;
    this.dueDateSelectedLabel = event.selectedDueDateLabel;
    this.refreshDOM();
    this.followupApiRequest();
  }

  onOverDueDateChangeNotify(event) {
      upstream.Logger.info(FollowupListComponent.TAG, "Overdue Due date range set to", event.startDate, event.endDate, event.status);
      this.offset = 0;
      this.startDueDate = event.startDate;
      this.endDueDate = event.endDate;
      this.status = event.status;
      this.dueDateSelectedLabel = event.selectedDueDateLabel;
      this.refreshDOM();
      this.followupApiRequest();
  }

  /**
   * Event received when search event is called from FollowUpListHeaderComponent
   * @param txtSearch : represents search string
   */
  onSearchNotify(txtSearch: string) {
    upstream.Logger.info(FollowupListComponent.TAG, " Search request for " + txtSearch);
    this.searchMode = true;
    this.txtSearch = txtSearch;
    this.offset = 0;
    this.data = [];
    this.isRequesting = true;
    this.refreshDOM();
    this.followupApiRequest();
  }
  /**
   * callback method of page click
   * @param pageNumber 
   */
  pageChange(pageNumber: number): void {
    upstream.Logger.info(FollowupListComponent.TAG, "PageNumber " + pageNumber);
    this.offset = this.recordsPerPage * (pageNumber - 1);
    if (this.offset < 0)
      this.offset = 0;

    this.isRequesting = true;
    this.refreshDOM();
    this.updateDueDateRange();
    this.sub = this._followupService.getFollowUps(this.selectedState, this.offset, this.recordsPerPage, this.label, this.status,
      this.type,
      this.sortingColumn, this.sortingOrder, this.txtSearch, this.startDueDate, this.endDueDate, this.isNotify,
      AppConstant.USER_ID).subscribe(result => {
          upstream.Logger.info(FollowupListComponent.TAG, "getFollowUps Response : " + result);
          if (result == null) {
              this.blankResponseHandling();
              return;
          }
      this.isRequesting = false;
      this.data = [];
      if (result.FollowUpList.length == 0 && result.TotalRecords > 0) {
        var pages = Math.ceil(result.TotalRecords / AppConstant.ONE_PAGE_ITEMS);
        this.pageChange(pages);
        return;
      }
      this.totalNumberOfRecords = result.TotalRecords;
      
      [].push.apply(this.data, result.FollowUpList);
      this.currPage = pageNumber;
      this.childModal.currPageNumber = pageNumber;
      this.numberOfRecordsFound = this.localization.FollowUpGadget.RecordFoundMessage.replace(AppConstant.PLACEHOLDER_1, this.totalNumberOfRecords);
      this.refreshDOM();
    
    }, error => {
      this.isRequesting = false;
      this.errorMessage = <any>error;
      this.data = [];
      this.totalNumberOfRecords = 0;
      upstream.Logger.error(FollowupListComponent.TAG, " getFollowUps Error : " + this.errorMessage);
      this.numberOfRecordsFound = AppConstant.BLANK_STRING;
      this.showNotification(this.UIParam.ErrorConnect, AppConstant.DANGER_KEY);
      this.refreshDOM();
    });
    this.currPage = pageNumber;
  }

  /**
   * method to show ribbon message on dashboard list
   * @param message : message to be displayed
   * @param type : type of message
   */
  showNotification(message: string, type: string) {
    this.notification = {
      notificationMessage: message,
      notificationType: type
    };
    this.isNotificationVisible = true;
    if (this.isRequesting) {
        this.isRequesting = false;
        this.refreshDOM();
    }
  }

  /**
   * Method to close ribbon message
   */
  onNotificationCancel() {
    this.isNotificationVisible = false;
    this.refreshDOM();
  }
  /**
   * Method to get creation date in UTC format
   * @param creationDate : creation date string
   */
  getFollowupCreationDate(creationDate: string) {

      return DateTimeUtil.getDateInLocalFormat(creationDate);
  }

  /**
   * Method to get due date in UTC format
   * @param dueDate : due date string
   */
  getFollowupDueDate(dueDate: string) {

      return DateTimeUtil.getDateInLocalFormat(dueDate);
  }

  /**
   * Method to clear search and refetch the list
   * @param isSearchCleared
   */
  onClearSearchNotify(isSearchCleared: boolean) {
    if (isSearchCleared) {
      this.offset = 0;
      this.txtSearch = "";
      this.followupApiRequest();
    }
  }
  /**
   * Initialize modal before opening modal view
   * @param isEditMode : whether followup to be opened in edit mode
   * @param index : index of FollowUp opened
   * @param isNew : wheter new followup is opened
   */
  setEditMode(isEditMode: boolean, index: number, isNew: boolean) {
    upstream.Logger.info(FollowupListComponent.TAG, "EditMode value " + isEditMode);


    this.childModal.setUserId(this.userId);
    this.followupIds = [];
    this.childModal.initializeEditProperties(isNew, isEditMode);
    this.refreshDOM();
    var appliedFilters = new FollowUpFilter(this.selectedState, this.offset, this.recordsPerPage, this.label, this.status,
      this.type, this.sortingColumn, this.sortingOrder, this.txtSearch, this.startDueDate, this.endDueDate, this.isNotify, Number(AppConstant.USER_ID));
    for (var i = 0; i < this.data.length; i++) {
      this.followupIds.push(this.data[i].FollowUpID);
    }

    this.isNotificationVisible = false;
    this.childModal.show(index, appliedFilters, this.followupIds, this.totalNumberOfRecords, isEditMode);
    this.refreshDOM();
  }

  /**
   * callback method hwen modal is visible
   * @param isModalShown : 
   */
  onModalShown(isModalShown: boolean) {
      upstream.Logger.info(FollowupListComponent.TAG, " Is Modal shown " + isModalShown);
      this.isRequesting = false;
      this.refreshDOM();
  }

  onEditModeSetNotify($event) {

  }
  /**
   * Refresh button handling
   * @param isRefreshCalledEvent
   * @param isRefreshCalledData
   */
  onRefreshClick(isRefreshCalledEvent, isRefreshCalledData) {
      upstream.Logger.info(FollowupListComponent.TAG, "onRefreshClick " + isRefreshCalledData);
    if (this.childModal.childModal.isShown)
      return;
    this.offset = 0;
    if (this.txtSearch == AppConstant.BLANK_STRING) {
      this.followUpListHeaderComponent.emptySearchBox();
    }
    this.getConfiguration(this.loginId);
    var value = {};
    value['from'] = 'On Refresh button clicked';
    this.handleNotification(null, JSON.stringify(value));
  }
  /**
   * Display how much records available on bottom left of followup list UI
   * @param totalNumberOfRecords
   */

  /**
   * Calback of followup created successfully
   * @param event
   */
  onCreateNewFollowUpNotify(event) {
    this.childModal.setNewFollowUpPersonalType(event);
    if (this.configurationData != undefined && this.configurationData != null) {
      this.isCreateNewFollowUp = false;
      this.setEditMode(true, null, true);
    } else {
      this.isCreateNewFollowUp = true;
      this.getConfiguration(this.loginId);
    }
  }
  /**
   *  check whether due date has passed or not
   * @param datum : followup for which method is called
   */
  isUrgent(datum: Followup) {
      if (typeof datum !== AppConstant.UNDEFINED) {
          if (datum.FollowUpStatus == AppConstant.COMPLETE_STATUS_CODE)// if FU has been completed then hide due indicator
              return false;
          var now = DateTimeUtil.getDateInLocalFormat(datum.FollowUpDueDate);
          let currentDate = new Date();
          if (now < currentDate) {
              return true;
          }
          return false;
      }
  }

  numDaysBetween = function (d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  };

  //Call this method to reflect any changes done at backend or by the user when the user was in modal view
  onModalViewhide() {
    upstream.Logger.debug(FollowupListComponent.TAG, "Modal view hide notify");
    this.pageChange(this.currPage);
  }

  /**
   * callback of pagechanged
   * @param pageNumber
   */
  onPageChangeByPagination(pageNumber: number) {
    var totalPages = Math.ceil(this.totalNumberOfRecords / AppConstant.ONE_PAGE_ITEMS);
    upstream.Logger.debug(FollowupListComponent.TAG, totalPages+" Move to  PageNumber " + pageNumber);
    if (pageNumber < 1 || pageNumber > totalPages || this.currPage == pageNumber)
          return;
    this.currPage = pageNumber;
    this.refreshDOM();
    this.pageChange(this.currPage);
  }

  /**
 * callback of pagechanged
 * @param pageNumber
 */
  onPageChange(pageNumber: number) {
      var totalPages = Math.ceil(this.totalNumberOfRecords / AppConstant.ONE_PAGE_ITEMS);
      this.currPage = pageNumber;
      this.refreshDOM();
      this.pageChange(this.currPage);
  }

  
  repareModalData() {
    this.modalData = [];
    this.modalData.push(AppUtil.getFollowup());
    upstream.Logger.debug(FollowupListComponent.TAG, "modal list size " + this.modalData.length);
  }

  /**
   * Callback on editmode enable
   * @param followupDetailRes
   */
  onEditModeEnable(followupDetailRes: FollowupDetailRes) {
    if (followupDetailRes.Status) {
      var message = this.UIParam.LockedErrorMessage.replace(AppConstant.PLACEHOLDER_1, followupDetailRes.Message);
      this.showNotification(message, AppConstant.DANGER_KEY);
    } else if (this.isNotificationVisible) {
      this.isNotificationVisible = false;
    }
  }
  /**
   * callback method of list item click
   * @param event
   * @param index
   */
  onFollowUpListItemClick(event, index) {
      if (event.target.id != undefined && event.target.id != AppConstant.BTN_EDIT) {
          this.isRequesting = true;
      this.childModal.isFollowUpOpenedFromActiveTask = false;
      this.setEditMode(false, index, false);
    }
  }

  /**
   * Open folowup in edit mode
   * @param event : event called
   * @param index :followup index for which it is called
   */
  openFollowUpInEditMode(event, index) {
    this.isRequesting = true;
    this.childModal.isFollowUpOpenedFromActiveTask = false;
    this.setEditMode(true, index, false);
  }

  onErrorMessageNotify(event) {
    this.followupApiRequest();
    this.showNotification(event.message, event.type);
  }
  getFollowupType(currentFollowup: Followup) {
    let followupTypeObject = this.configurationData.FollowUpTypes.find(electedLabel => electedLabel.FollowUpTypeId == currentFollowup.FollowUpType);
    return followupTypeObject.Name;
  }

    /**
     * Fetch config
     * @param userLogin
     */
  getConfiguration(userLogin: string) {
    this.isRequesting = true;
    this.refreshDOM();
    this.childModal.setUserId(this.userId);
    upstream.Logger.debug(FollowupListComponent.TAG, "InConfig :: " + userLogin);
    this.sub = this._followupService.getConfiguration(this.userId).subscribe(result => {
        if (!result) {
            this.isRequesting = false;
            this.data = [];
            this.totalNumberOfRecords = 0;
            this.numberOfRecordsFound = AppConstant.BLANK_STRING;
            this.showNotification(this.UIParam.ErrorConnect, AppConstant.DANGER_KEY);
            this.refreshDOM();
            return;
        }
        upstream.Logger.debug(FollowupListComponent.TAG, "GetConfiguration Response ", result);
        this.configurationData = result;
        this.getSortedLabels();
        this.childModal.configurationData = this.configurationData;
      this.followupApiRequest();
      this.followUpListHeaderComponent.configurationData = this.configurationData;
      this.followUpListHeaderComponent.updateActiveFUTypes();
      this.hub.publish('com.upstreamworks.events.followupAssignedType', JSON.stringify(result));
    }, error => {
      upstream.Logger.debug(FollowupListComponent.TAG, "Configuration error", error);
      this.isRequesting = false;
      this.refreshDOM();
      this.data = [];
      this.totalNumberOfRecords = 0;
      this.numberOfRecordsFound = AppConstant.BLANK_STRING;
      this.showNotification(this.UIParam.ErrorConnect, AppConstant.DANGER_KEY);
    });
  }
  /**
   * Method to subscribe event to fetch medial details
   * @param event
   */
  onFetchMediaDetialNotify(event) {
    GadgetServices.hub.publish('com.upstreamworks.events.fetchMediaRequest', event);
  }

  /**
   *  Method to fetch mediadetail of an interaction
   * @param event
   */
  onFetchInteractionMediaDetailNotify(event) {
      GadgetServices.hub.publish('com.upstreamworks.events.fetchMediaRequestForInteraction', event);
  }

  /**
   * method to handle Interaction Capture interaction change event
   * @param eventID : event name
   * @param eventData : 
   */
  onInteractionChanged(eventID, eventData) {
      upstream.Logger.debug(FollowupListComponent.TAG, "Interaction changed event received");
    if (this.childModal.childModal.isShown) {
      this.childModal.handleInteractionChangeEvent();
    }
  }

  /**
   * Method to show associated followu from MyTasks, MyQueue, Current contact, MyDay and Search tabs
   * @param eventID
   * @param eventData
   */
  onShowCarouselEvent(eventID, eventData) {
     if (eventID != AppConstant.EMPTY_STRING)
      this.childModal.isFollowUpOpenedFromActiveTask = false;
    upstream.Logger.info(FollowupListComponent.TAG, "Carousel change event received", eventData);
    if (this.modalData.length == AppConstant.ZERO_LENGTH)
      this.repareModalData();
    this.followupIds = [];
    this.childModal.initializeEditProperties(false, false);
    var appliedFilters = new FollowUpFilter(this.selectedState, this.offset, this.recordsPerPage, this.label, this.status,
      this.type, this.sortingColumn, this.sortingOrder, this.txtSearch, this.startDueDate, this.endDueDate, this.isNotify, Number(AppConstant.USER_ID));
    this.isNotificationVisible = false;
    var listLength = eventData.FollowUpIdList.length;
    for (var key = 0; key < listLength; key++) {
      if (eventData.FollowUpIdList[key] == 0 && localStorage.getItem(eventData.TaskId + key)) {
        if (isNaN(eventData.TaskId + key)) {
            upstream.Logger.info(FollowupListComponent.TAG, "carousel nan key received");
        }
        this.followUpLocalDetails = JSON.parse(localStorage.getItem(eventData.TaskId + key));
        if (this.followUpLocalDetails.FollowUpDetails.AgentId == this.userId) {
          this.followupIds.push(eventData.TaskId + key);
        }
      } else if (eventData.FollowUpIdList[key] > AppConstant.ZERO_INDEX) {
        if (isNaN(eventData.FollowUpIdList[key])) {
            upstream.Logger.info(FollowupListComponent.TAG, "carousel nan key received ");
        }
        this.followupIds.push(eventData.FollowUpIdList[key]);
      }
    }
    this.refreshDOM();
    this.childModal.show(AppConstant.ZERO_INDEX, appliedFilters, this.followupIds, this.followupIds.length, false);
  }

  /**
   * Delete followup associated to an subinteraction
   * @param topic : event name
   * @param data : data regarding delted interaction or task
   */
  deleteSubInteraction(topic, data) {
    var ackData = {};
    ackData['FollowUpId'] = data.FollowUpId;
    ackData['Index'] = data.Index;
    ackData['taskId'] = data.taskId;
    this.sub =  this._followupService.deleteFollowup(data.taskId, data.Index, data.FollowUpId, this.userId).subscribe(result => {
      upstream.Logger.info(FollowupListComponent.TAG, "delete SubInteraction Response : " + result);
      ackData['response'] = result.data;
      this.hub.publish('com.upstreamworks.events.delete_followup.ack', ackData);
      this.hub.publish('com.upstreamworks.events.refreshFollowUps', true);
      var value = {};
      value['from'] = 'On subinteraction related follow up delete :: Subinteraction Id ' + data.Index;
      this.hub.publish('com.upstreamworks.event.updateNotification', JSON.stringify(value));
      this.hub.publish('com.upstreamworks.events.UpdateDueFollowUp', true);
    }, error => {
      this.errorMessage = <any>error;
      upstream.Logger.error(FollowupListComponent.TAG, " Error : " + this.errorMessage);
      ackData['response'] = "fail";
      this.hub.publish('com.upstreamworks.events.delete_followup.ack', ackData);
      this.hub.publish('com.upstreamworks.events.refreshFollowUps', true);
    });

  }

  /**
   * Method to close FollowUp modal
   * @param topic : event name
   * @param data : data  associated with event
   */
  closeFollowUpModal(topic, data) {
    if (this.childModal.childModal.isShown) {
      this.childModal.broadcastFollowUpEditModeEvent(false, false, -1);
      this.childModal.childModal.hide();
    }
  }

  /**
   * Method to update customer information regarding FollowUps
   * @param topic : event name
   * @param data : customer information data
   */
  updateFollowUpCustInfo(topic, data) {
    upstream.Logger.info(FollowupListComponent.TAG, "Received Customer Info : " + JSON.stringify(data.customer));

    //api call for updating customer infomration in saved follow ups
    this.sub = this._followupService.UpdateCustomerInfo(data.taskId, data.customer).subscribe(result => {
      upstream.Logger.info(FollowupListComponent.TAG, "delete SubInteraction Response : " + result)
    }, error => {
      this.errorMessage = <any>error;
      upstream.Logger.error(FollowupListComponent.TAG, " Error : " + this.errorMessage);
    });

    //method call tp update draft followups
    this.updateCustomerInfoForAssociatedDraft(data);
  }

  /**
   * Method to update customer information for drafts
   * @param data :customer information
   */
  updateCustomerInfoForAssociatedDraft(data) {

      for (var index = AppConstant.ZERO_INDEX; index < AppConstant.TOTAL_SUB_INTERACTION; index++) {
      this.followUpEditDetails = null;
      this.followUpEditDetails = JSON.parse(localStorage.getItem(data.taskId + index));
      if (this.followUpEditDetails) {
          this.followUpEditDetails.FollowUpDetails.CustomerInfo = data.customer;
          this.childModal.saveDraftData(data.taskId + index, JSON.stringify(this.followUpEditDetails), "updateCustomerInfoForAssociatedDraft");
      }
    }
  }

  /**
   * @param topic
   * @param data
   *
   * Update followup notification after following point
   *  a)	When agent logins to desktop
   *  b)	When a tab flip of IA happens
   *  c)	When gadget flip happens
   *  d)	When refresh button is clicked (on all IA refresh button)
   *  e)  If a due date of follow up that was created by the agent is changed by the same agent , then reload the notifications
   *  f) Show notification only if followup is enable for agent
   *  g)  When user updates the notification
   */
  public handleNotification(topic, data) {
      var enableFollowUp = AppUtil.getEnableFollowUp();

      if ((!enableFollowUp || (enableFollowUp === 'false')) || !this.userId) {
          upstream.Logger.info(FollowupListComponent.TAG, "disable followup " + enableFollowUp);
          return;
    }
    var data = JSON.parse(data);
    upstream.Logger.debug(FollowupListComponent.TAG, "Notification going to Update from " + data.from);
    //api call for updating followup notification
    this.sub = this._followupService.getFollowUpNotification(this.userId).subscribe(result => {
        if (!result) {
            return;
        }
      upstream.Logger.debug(FollowupListComponent.TAG, "Get Notification Response : " + JSON.stringify(result));
      this.followupNotification.addData(result);
    }, error => {
      this.errorMessage = <any>error;
      upstream.Logger.error(FollowupListComponent.TAG, " Error : " + this.errorMessage);
    });
  }

  public updateNotificationApi(topic, data) {
    var data = JSON.parse(data);
    this.sub = this._followupService.updatetFollowUpNotification(data).subscribe(result => {
      upstream.Logger.debug(FollowupListComponent.TAG, "updated notification response  : " + result);
      GadgetServices.hub.publish('com.upstreamworks.events.UpdateDueFollowUp', true);

      //fetch updated dashboard list to show bold view
      if (!this.childModal.childModal.isShown) {
        this.followupApiRequest();
      }
    }, error => {
      this.errorMessage = <any>error;
      upstream.Logger.error(FollowupListComponent.TAG, " updatetFollowUpNotification Error : " + this.errorMessage);
    });
  }
  public onDueDateChange(event) {
    var value = {};
    value['from'] = 'On DueDate changed';
    this.handleNotification(null, JSON.stringify(value));
  }

  @HostListener(AppConstant.BEFOREUNLOAD)
  cleaupTask() {
    upstream.Logger.info(FollowupListComponent.TAG, "on List component cleanup called");
    this.followupNotification.beforeUnload();
  }

  /**
   * @param topic
   * @param data
   * If there is multiple notification for followup notification list will be launch from here.
   */
  viewMultipleFollowupNotifications(topic, data) {
      (<HTMLInputElement>document.getElementsByName(AppConstant.NOTIFICATION_TOGGLE_ID)[AppConstant.ZERO_INDEX]).checked = true;
    this.onNotification(true);
  }

  /**
   * @param followUpItem
   * @param data
   * Check if follow up has any unread notification.
   */
  hasUnreadNotification(followUpItem: Followup) {
    if (followUpItem.Notification.find(x => x.NotificationStatus == AppConstant.DELIVERED_NOTIFICAITON_STATUS) != undefined && this.agentName == followUpItem.Owner) {
      return true;
    }
    return false;
  }

  /**
   * detect IE
   * returns version of IE or false, if browser is not Internet Explorer
   */
  detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result �

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // IE 12 / Spartan
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge (IE 12+)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

     /**
     * @param datum
     * display FU personal icon for creater
     */
  showPersonalIcon(datum: Followup) {
      return datum != undefined ? (datum.IsPersonal && datum.OwnerUserID.toString() == this.userId):false ;
  }

    private refreshDOM() {
        upstream.Logger.info(FollowupListComponent.TAG, "List ngAfterContentChecked ");
        if (!this.ref['destroyed']) {
            this.ref.detectChanges();
        }
  }

    private getSortedLabels() {
        var lables = this.configurationData.Labels;
        lables.forEach((item, index) => {
            item.LabelName = this.UIParam[item.LabelName] ? this.UIParam[item.LabelName] : item.LabelName;
        });
        lables.sort(function (a, b) {
            var firstLabel = a.LabelName.toLowerCase(), secondLabel = b.LabelName.toLowerCase();
            if (a.LabelID == 1) return -1;
            if (b.LabelID == 1) return 1;
            if (firstLabel < secondLabel) //sort string ascending
                return -1
            if (firstLabel > secondLabel)
                return 1
            return 0 //default return value (no sorting)
        });
        this.configurationData.Labels = [];
        this.configurationData.Labels.push.apply(this.configurationData.Labels, lables);
  }

    ngOnDestroy(): void {
        if (this.sub != null)
           this.sub.unsubscribe();
  }

    public blankResponseHandling(): void {
        this.isRequesting = false;
        this.data = [];
        this.numberOfRecordsFound = this.localization.FollowUpGadget.NoRecord;
        this.totalNumberOfRecords = 0;
        upstream.Logger.debug(FollowupListComponent.TAG, "Record not found ");
        this.refreshDOM();
    }

    /**
     * Method to update due date selected range before fetching followup list.
     */
    private updateDueDateRange() {
        var temp;
        switch (this.dueDateSelectedLabel) {
            case this.UIParam.Overdue:
                this.startDueDate = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
                this.endDueDate = DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING);
                break;
            case this.UIParam.Today:
                this.startDueDate = DateTimeUtil.getStartOfDay(AppConstant.BLANK_STRING);
                this.endDueDate = DateTimeUtil.getEndOfDay(AppConstant.BLANK_STRING);
                break;
            case this.UIParam.Tomorrow:
                temp = DateTimeUtil.getDateBeforeAfter(1); 
                this.startDueDate = DateTimeUtil.getStartOfDay(temp);
                this.endDueDate = DateTimeUtil.getEndOfDay(temp);
                break;
            case this.UIParam.Next7Days:
                temp = DateTimeUtil.getDateBeforeAfter(1);
                this.startDueDate = DateTimeUtil.getStartOfDay(temp);
                temp = DateTimeUtil.getDateBeforeAfter(7);
                this.endDueDate = DateTimeUtil.getEndOfDay(temp);
                break;
        }
    }
};

