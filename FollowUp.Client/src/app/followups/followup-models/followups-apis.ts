declare var upstream: any;
declare var gadgets: any;
declare var moment: any;
declare var taskservices: any;
declare var finesse: any;

export class FollowupsApis{
    
    public static BASE_URL                              = upstream.gadget.Config.baseUri +"/applications/FollowUp.WebAPI/api/FollowUpGadget";
    public static GET_FOLLOWUP_LIST                     = FollowupsApis.BASE_URL + "/GetListofFollowUp?";
    public static TEXT_SEARCH_ENDPOINT                  = FollowupsApis.BASE_URL+"/GetListofSearhText?";
    public static INSERT_FOLLOW_UP                      = FollowupsApis.BASE_URL+"/InsertFollowUp";
    public static GET_FOLLOWUP_COMMENT                  = FollowupsApis.BASE_URL+"/GetListofComment?followupid=";
    public static GET_FOLLOWUP_PARAMETER                = FollowupsApis.BASE_URL+"/GetUIParameter";
    public static GET_FOLLOWUP_DETAIL                   = FollowupsApis.BASE_URL+"/GetFollowUpDetail?";
    public static UPDATE_FOLLOWUP                       = FollowupsApis.BASE_URL+"/UpdateFollowUp";
    public static UPDATE_EDITMODE                       = FollowupsApis.BASE_URL+"/SetFollowUpEditMode?";
    public static QUEUE_ANYTASK                         = FollowupsApis.BASE_URL+"/QueueAnyTask?";
    public static REFRESH_FOLLOWUP                      = FollowupsApis.BASE_URL+"/RefreshFollowUpEditMode?";
    public static GET_LISTOFTYPES                       = FollowupsApis.BASE_URL+"/GetTypes?";
    public static GET_LISTOFSKILLS                      = FollowupsApis.BASE_URL+"/GetSkills";
    public static GET_CONFIGURATION                     = FollowupsApis.BASE_URL + "/GetConfiguration?";
    public static COMPLETE_FOLLOWUP                     = FollowupsApis.BASE_URL + "/CompleteFollowUp";
    public static URL_INTERACTION_AFTER_TASK_DELETE     = FollowupsApis.BASE_URL +  "/DeleteFollowUp?";
    public static UPDATE_INTERACTION_AFTER_TASK_DONE    = FollowupsApis.BASE_URL + "/UpdateFollowUpTaskSummary?";
    public static UPDATE_CUSTOMER_INFO                  = FollowupsApis.BASE_URL + "/UpdateFollowUpCustomerInfo?";
    public static GET_FOLLOWUP_NOTIFICATION             = FollowupsApis.BASE_URL + "/GetPendingFUNotification?"
    public static UPDATE_FOLLOWUP_NOTIFICATION          = FollowupsApis.BASE_URL+ "/UpdateFUNotification?";

    /*base URL for task releted API call*/
    public static GET_ASSOCIATED_TASK_DETAILS           = upstream.gadget.Config.baseUri + "/api/task/GetFollowUpTaskSummaryByTaskId?";
    public static GET_TASK_SUMMARY_BY_TASK_ID           = upstream.gadget.Config.baseUri + "/api/task/GetTaskSummaryByTaskId?";
    public static GET_INTERACTION_BY_TASK_ID            = upstream.gadget.Config.baseUri + "/api/interaction/GetInteractionByTaskId?";
   
    //public static NOTIFICATION_LOGO_PATH = upstream.gadget.Config.baseUri + '/static/internal/application/Followup/assets/images/upstream_logo.jpg';
    public static NOTIFICATION_LOGO_PATH                = upstream.gadget.Config.baseUri + "/static/internal/gadget/img/up_300.jpg?nc=" + upstream.gadget.Config.nc
    public static NOTIFICATION_GPATH                    = upstream.gadget.Config.baseUri + '/static/internal/application/Followup/assets/notification.json';
    
    
    
};
