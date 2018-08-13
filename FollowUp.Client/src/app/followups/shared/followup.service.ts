import { FollowUpFilter } from '../followup-models/followup-filters';
import { FollowupConfiguration } from '../followup-models/followup-configuration';
import { FollowUpInsert } from '../followup-models/followup-insert';
import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { FollowupsApis } from '../followup-models/followups-apis';
import { FollowupRes } from '../followup-models/followup-res';
import { FollowupCommentRes } from '../followup-models/followup-comment-res';
import { FollowupDetailRes } from '../followup-models/followup-detail-res';
import { FollowupNotifications } from '../followup-models/followup-notifications';
import { FollowUpNotificationModel } from '../followup-models/followup-notification-model';
import { FollowUpModel } from '../followup-models/followup-model';
import { AppConstant } from '../util/util.appconstant';
import { FollowupResponse } from '../followup-models/followup-response';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observer } from 'rxjs/Observer';

declare var upstream: any;
declare var GadgetServices: any;
declare var gadgets: any;


@Injectable()
export class FollowUpService {
  private static TAG: string = "FollowUpService~";

  logErrorMessages(errorMethod: string, customErrorText: string, errorObject: any) {
    upstream.Logger.error(errorMethod, customErrorText);
  }

  getFollowUps(isPersonal: number, offset: number, noOfRows: number, label: number, status: number, type: number,
    sortingField: string, sortingOrder: string, textSearch: string, startDueDate: string, endDueDate: string, isNotify: boolean, userID: string): Observable<FollowupRes> {
    upstream.Logger.info("offset " + offset + " rows " + noOfRows);
    if (textSearch.length === 0) {
      textSearch = '';
    }
    var params = new FollowUpFilter(isPersonal, offset, noOfRows, label, status,
    type, sortingField, sortingOrder, textSearch, startDueDate, endDueDate, isNotify, Number(userID));

    let bodyString = JSON.stringify(params); // Stringify payload
    return new Observable<FollowupRes>((observer: Observer<FollowupRes>) => {
        upstream.gadgets.io.ajax({
            url: FollowupsApis.GET_FOLLOWUP_LIST,
            context: this,
            data: bodyString,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Retreived the followups");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);

                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to load followups");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  getFollowupComment(followupId: String): Observable<FollowupCommentRes> {
    var queryString = FollowupsApis.GET_FOLLOWUP_COMMENT + followupId;
    upstream.Logger.debug("FollowUpService", "queryString " + queryString);
    return new Observable<FollowupCommentRes>((observer: Observer<FollowupCommentRes>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Retreived fllowup's comments");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);

                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to load Followup's comments");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  saveFollowUp(newfollowup: FollowUpInsert): Observable<FollowupDetailRes> {
    upstream.Logger.info(FollowUpService.TAG, JSON.stringify(newfollowup));
    let bodyString = JSON.stringify(newfollowup); // Stringify payload
    return new Observable<FollowupDetailRes>((observer: Observer<FollowupDetailRes>) => {
        upstream.gadgets.io.ajax({
            url: FollowupsApis.INSERT_FOLLOW_UP,
            context: this,
            data: bodyString,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Followup saved successfully");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to save followup");
                observer.error(error);
                observer.complete();
            }
        });
    });
 }

  saveFollowUpFromModal(newfollowup: FollowUpInsert): Observable<FollowupResponse> {
    upstream.Logger.info(FollowUpService.TAG, JSON.stringify(newfollowup));
    let bodyString = JSON.stringify(newfollowup); // Stringify payload
    return new Observable<FollowupResponse>((observer: Observer<FollowupResponse>) => {
        upstream.gadgets.io.ajax({
            url: FollowupsApis.INSERT_FOLLOW_UP,
            context: this,
            data: bodyString,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Saved followup from modal successfully");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to save followup from modal");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  getFollowupDetail(taskid: string, userid: string, isedit: boolean): Observable<FollowupDetailRes> {
    var queryString = FollowupsApis.GET_FOLLOWUP_DETAIL + 'followupid=' + taskid + '&userid=' + userid + "&isedit=" + isedit;
    return new Observable<FollowupDetailRes>((observer: Observer<FollowupDetailRes>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Retreived Followup's Detail on modal");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to load Followup's Detail");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  reqUpdateFollowUp(reqfollowup: FollowUpModel): Observable<Object> {
    upstream.Logger.debug(FollowUpService.TAG, JSON.stringify(reqfollowup));
    let bodyString = JSON.stringify(reqfollowup); // Stringify payload
    return new Observable<Object>((observer: Observer<Object>) => {
        upstream.gadgets.io.ajax({
            url: FollowupsApis.UPDATE_FOLLOWUP,
            context: this,
            data: bodyString,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Followup updated successfully");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to update followup");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  reqSetFollowUpEditMode(taskid: string, userid: string, isedit: boolean): Observable<Object> {
    var queryString = FollowupsApis.UPDATE_EDITMODE + 'followupid=' + taskid + '&userid=' + userid + "&isedit=" + isedit;
    return new Observable<Object>((observer: Observer<Object>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Followup has been set as in editmode");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to set followup as in editmode");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  reqRefreshFollowUpEditMode(followupid: string, userid: string): Observable<Object> {
    var queryString = FollowupsApis.REFRESH_FOLLOWUP + 'followupid=' + followupid + '&userid=' + userid;
    return new Observable<Object>((observer: Observer<Object>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Editmode followup refreshed successfully");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to refresh editmode followup");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  
  queueAnyTask(followupid: string, skill: string, channeltype: number, channelsubtype: number, contactid: string): Observable<Object> {
    var queryString = FollowupsApis.QUEUE_ANYTASK
      + "followupid=" + followupid
      + "&skill=" + skill
      + "&channeltype=" + channeltype
      + "&channelsubtype=" + channelsubtype
      + "&contactid=" + contactid;
    return new Observable<Object>((observer: Observer<Object>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Retreived any task");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to load anytask");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  getListofSkills(): Observable<Object> {
    var queryString = FollowupsApis.GET_LISTOFSKILLS;
    return new Observable<Object>((observer: Observer<Object>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Retreived skills");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to load skills");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  getConfiguration(userid: string): Observable<FollowupConfiguration> {
    var queryString = FollowupsApis.GET_CONFIGURATION + AppConstant.USER_ID_KEY + AppConstant.EQUAL_KEY + userid;
    return new Observable<FollowupConfiguration>((observer: Observer<FollowupConfiguration>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Retreived followup's configurations");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to load followup's configurations");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  getCurrentLanguage() {
      var lang = gadgets.Prefs().getLang();
      if (!lang) lang = "en";
      return lang;
  }

  deleteFollowup(taskid: string, subInteractionId: number, followupid: string, userid: string) {
    var queryString = FollowupsApis.URL_INTERACTION_AFTER_TASK_DELETE + 'followupid=' + followupid + '&userid=' + userid + '&taskid=' + taskid + '&subinteractionid=' + subInteractionId;
    return new Observable<any>((observer: Observer<any>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Follwup deleted successfully");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to delete followup");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  UpdateCustomerInfo(taskid: string, custInfo: any) {
    var queryString = FollowupsApis.UPDATE_CUSTOMER_INFO + 'taskid=' + taskid;
    let bodyString = JSON.stringify(custInfo); // Stringify payload

    return new Observable<any>((observer: Observer<any>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            data: bodyString,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Customer's info updated successfully");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to update customer's info");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  /**
   * APi for fetching the followup notifications
   * @param userId
   */
  getFollowUpNotification(userId: string): Observable<FollowUpNotificationModel[]> {
    var queryString = FollowupsApis.GET_FOLLOWUP_NOTIFICATION + 'userid=' + userId;
    return new Observable<FollowUpNotificationModel[]>((observer: Observer<FollowUpNotificationModel[]>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Retreived followup's notifications");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to load followup's notifications!");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  /**
   * After Getting the notification , acknoledge to the server and update followup
   * records.
   * @param followUpId
   * @param notificationUpdateInfo
   */
  updatetFollowUpNotification(notificationUpdateInfo): Observable<FollowupNotifications> {
    let bodyString = JSON.stringify(notificationUpdateInfo); // Stringify payload
    return new Observable<FollowupNotifications>((observer: Observer<FollowupNotifications>) => {
        upstream.gadgets.io.ajax({
            url: FollowupsApis.UPDATE_FOLLOWUP_NOTIFICATION,
            context: this,
            data: bodyString,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Followup notification's status updated successfully");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to updatet followUp notification's status");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }
  
  reqCompleteFollowUp(reqfollowup: FollowUpModel): Observable<Object> {
    upstream.Logger.info(FollowUpService.TAG, JSON.stringify(reqfollowup));
    let bodyString = JSON.stringify(reqfollowup); // Stringify payload
    return new Observable<Object>((observer: Observer<Object>) => {
        upstream.gadgets.io.ajax({
            url: FollowupsApis.COMPLETE_FOLLOWUP,
            context: this,
            data: bodyString,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Followup completed successfully");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to  complete followUp");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }
  
  getAssociatedTaskDetails(taskId: string, subinteractionId: number): Observable<Object> {
    var queryString = FollowupsApis.GET_ASSOCIATED_TASK_DETAILS
        + "taskid=" + taskId
        + "&subInteractionId=" + subinteractionId
        + "&hl=" + this.getCurrentLanguage();
    return new Observable<Object>((observer: Observer<Object>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Retreived followup's associated task");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to load followup's associated task");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  getTaskSummaryByTaskId(taskId: string): Observable<Object> {
    var queryString = FollowupsApis.GET_TASK_SUMMARY_BY_TASK_ID
      + "taskid=" + taskId
    return new Observable<Object>((observer: Observer<Object>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Retreived  task summary");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to load task summary");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }

  getInteractionByTaskId(taskId: string, subinteractionId: number): Observable<Object> {
    var queryString = FollowupsApis.GET_INTERACTION_BY_TASK_ID
      + "taskid=" + taskId
      + "&subInteractionId=" + subinteractionId;
    return new Observable<Object>((observer: Observer<Object>) => {
        upstream.gadgets.io.ajax({
            url: queryString,
            context: this,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data: any) {
                upstream.Logger.debug(FollowUpService.TAG, "Retreived task's interaction");
                if (data != null)
                    observer.next(JSON.parse(data));
                else
                    observer.next(null);
                observer.complete();
            },
            error: function (xhr, status, error) {
                upstream.Logger.error(FollowUpService.TAG, "Failed to load task's interaction");
                observer.error(error);
                observer.complete();
            }
        });
    });
  }
  
}

