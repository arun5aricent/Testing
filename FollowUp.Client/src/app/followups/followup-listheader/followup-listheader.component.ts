import { FollowupConfiguration } from '../followup-models/followup-configuration';
import { FollowupTypes } from '../followup-models/followup-types';
import { FollowupStatus } from '../followup-models/followup-status';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { AppConstant } from '../util/util.appconstant';
import { FollowupListSearchComponent } from '../followup-search/followup-listsearch.component';
import { FollowupLabels } from '../followup-models/followup-labels';
import { FollowupsApis } from '../followup-models/followups-apis';
import { DateTimeUtil } from '../util/util.dateTime';
import { FollowupStates } from '../followup-models/followup-states';
import * as moment from 'moment';
import 'moment/locale/it';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/pt';
import 'moment/locale/fr';

declare var upstream: any;
declare var gadgets: any;

@Component({
    selector: 'followup-header',
    templateUrl: `./followup-listheader.component.html`,
    styleUrls: ['./followup-listheader.component.css']

})
export class FollowUpListHeaderComponent {
    private static TAG: string = "FollowUpListHeaderComponent";
    @Input() public UIParams: any;
    @Input() public configurationData: FollowupConfiguration;
    @Output() public searchNotify: EventEmitter<string> = new EventEmitter<string>();
    @Output() public notify: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public filterNotify: EventEmitter<any> = new EventEmitter<any>();
    @Output() public clearSearchNotify: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public createNewFollowUpNotify: EventEmitter<any> = new EventEmitter<any>();
    @Output() public dueDateRangechangeNotify: EventEmitter<any> = new EventEmitter<any>();
    @Output() public overDueDateChangeNotify: EventEmitter<any> = new EventEmitter<any>();
    @Output() public notification: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild(FollowupListSearchComponent)
    private followUpListSearchComponent: FollowupListSearchComponent;
    public selectedStatus = AppConstant.ALL;
    public selectedType = AppConstant.ALL;
    public selectedLabel = AppConstant.ALL_STRING_VALUE;
    public selectedLabelColor = AppConstant.DEFAULT_COLOR;
    public selectedLabelValue = AppConstant.ALL;
    public selectedState = AppConstant.ALL;
    public clearSearchText: boolean = false;
    public reloadToggleView: boolean = false;
    public countPerPage: number = 10;
    public currentdate = new Date();
    public dueDateValue = AppConstant.ALL_STRING_VALUE;
    public defaultLabel: FollowupLabels;
    public defaultStatus: FollowupStatus;
    public defaultAllStatus: FollowupStatus;
    public defaultType: FollowupTypes;
    public activeFUTypes: Array<FollowupTypes>;
    public defaultState: FollowupStates;
    public rangePickerOptions1;
    constructor(private http: Http,
        private daterangepickerOptions: DaterangepickerConfig) {
        this.daterangepickerOptions.settings = {
            locale: { format: AppConstant.DATE_FORMAT },
            alwaysShowCalendars: false,
        };
        moment.locale(gadgets.Prefs().getLang());
        
        if (!this.UIParams)
            this.UIParams = upstream.gadget.locale.FollowUpGadget;
        let customRanges: any[] = [];
        customRanges[this.UIParams.All] = [new Date().setDate(this.currentdate.getDate() - AppConstant.EFFECTIVE_FOLLOWUP_RANGE), new Date().setDate(this.currentdate.getDate() + AppConstant.EFFECTIVE_FOLLOWUP_RANGE)];
        customRanges[this.UIParams.Overdue] = [new Date().setDate(this.currentdate.getDate() - AppConstant.EFFECTIVE_FOLLOWUP_RANGE), this.currentdate];
        customRanges[this.UIParams.Today] = [this.currentdate, this.currentdate];
        customRanges[this.UIParams.Tomorrow] = [new Date().setDate(this.currentdate.getDate() + 1), new Date().setDate(this.currentdate.getDate() + 1)];
        customRanges[this.UIParams.Next7Days]= [new Date().setDate(this.currentdate.getDate() + 1), new Date().setDate(this.currentdate.getDate() + 7)];
        

        this.rangePickerOptions1 = {
            showDropdowns: true,
            autoUpdateInput: false,
            opens: AppConstant.DATE_PICKER_IN_LEFT,
            startDate: new Date(new Date().setDate(this.currentdate.getDate() - AppConstant.EFFECTIVE_FOLLOWUP_RANGE)).toISOString(),
            endDate: new Date(new Date().setDate(this.currentdate.getDate() + AppConstant.EFFECTIVE_FOLLOWUP_RANGE)).toISOString(),
            ranges: customRanges,
            autoApply: true,
            locale: {
                format: 'YYYY-MM-DD',
                customRangeLabel: this.UIParams.Custom,
                applyLabel: this.UIParams.Apply,
                cancelLabel: this.UIParams.Cancel
            }
        };

        this.dueDateValue = this.UIParams.All;
        this.selectedLabel = this.UIParams.All;
    }
    ngOnInit() {
        upstream.Logger.info(FollowUpListHeaderComponent.TAG, "Configuration data in header", this.configurationData);
        this.defaultLabel = new FollowupLabels(AppConstant.ALL, AppConstant.DEFAULT_COLOR, this.UIParams.All);
        this.defaultStatus = new FollowupStatus(AppConstant.OPEN, this.UIParams.AllActive);
        this.defaultAllStatus = new FollowupStatus(AppConstant.ALL, this.UIParams.All);
        this.defaultType = new FollowupTypes(AppConstant.ALL, this.UIParams.All, this.UIParams.All, true);
        this.defaultState = new FollowupStates(AppConstant.ALL, this.UIParams.All);
    }
    //    Use this with toggle Notificaiton view
    onNotify(isNotify: boolean): void {
        upstream.Logger.info(FollowUpListHeaderComponent.TAG, "Header recieve value " + isNotify);
        this.reloadToggleView = false;
        //on updating emit value here also update the viewMultipleFollowupNotifications() method in FollowUpListComponent
        this.notification.emit(isNotify);
    }

    /** Method to emit FollowUp state change event
     * @param value : represents selected state from FollowUp filter
     */
    onStateChange(value) {
        var filter;
        this.selectedState = value;
        filter = { "selectedState": value, "isQueued": false };
        this.notify.emit(filter);
    }
    /**
     * Method to emit event when a search string has been entered
     * @param searchTxt : represents search text string
     */
    onSearchNotify(searchTxt: string) {
        upstream.Logger.info(FollowUpListHeaderComponent.TAG, "headre search : " + searchTxt);
        this.searchNotify.emit(searchTxt);
    }
    /**
     * Method to emit when either Status filter or Type filter is applied
     * @param value : value selected for filter
     * @param which : which filter has been changed
     */
    onChange(value: number, which: number) {
        upstream.Logger.info(FollowUpListHeaderComponent.TAG, value + ' which ' + which);
        var filter = { "whichFilter": which, "filterValue": value };
        this.filterNotify.emit(filter);
        if (which == 2) {
            this.selectedStatus = value;
        } else if (which == 3) {
            this.selectedType = value;
        }
    }
    /**
     * method to emit event when search is cleared
     */
    onClearSearchNotify(isSearchCleared: boolean) {
        upstream.Logger.info(FollowUpListHeaderComponent.TAG, "Clear search notify");
        this.clearSearchNotify.emit(isSearchCleared);
    }
    /**
     * Method to set default values for all filters
     */
    setDefaultFilterValues() {
        this.selectedLabel = this.UIParams.All;
        this.selectedLabelValue = AppConstant.ALL;
        this.selectedStatus = AppConstant.ALL;
        this.selectedType = AppConstant.ALL;
        this.reloadToggleView = true;
    }
    /**
     * Method to send notification for all filters
     */
    sendNotificationForDefaultFilters() {
        this.onChange(AppConstant.ALL, 1);
        this.onChange(AppConstant.ALL, 2);
        this.onChange(AppConstant.ALL, 3);
        //this.onNotify(false);
    }
    /**
     * Method to clear serach box
     */
    emptySearchBox() {
        this.followUpListSearchComponent.emptySearchBox();
    }

    /**
     * Method to identify which label has been slected as filter and emit event for the same
     * @param labelName : name of the label selected
     * @param labelColor : color of the label selected
     * @param labelValue : value of the label selected
     */
    onLabelChange(labelName, labelColor, labelValue) {
        this.selectedLabel = labelName;
        this.selectedLabelColor = labelColor;
        this.selectedLabelValue = labelValue;
        this.onChange(labelValue, 1);
    }

    /**
     * Method to emit event to create new follow up from FollowUp header
     * @param isNewPersonal : check whether new FollowUp is personal or not
     */
    onCreateNewNotify(isNewPersonal: boolean) {
        upstream.Logger.info(FollowUpListHeaderComponent.TAG, "Notify to create new followup");
        this.createNewFollowUpNotify.emit(isNewPersonal);
    }

    public calendarEventsHandler(e: any) {
        upstream.Logger.info(FollowUpListHeaderComponent.TAG, e);
    }

    /**
     * apply date range seelcted and update string correspondingly
     * @param value : value of date range selected
     * @param labelNumber : label number selected
     */
    applyDateRange(value: any, labelNumber) {
        upstream.Logger.info(FollowUpListHeaderComponent.TAG, "Due date" + value.picker.chosenLabel + "Value start date=>" + value.picker.startDate._d + " Value end date=> " + value.picker.endDate._d);
        var dueDateRange;
        if (value.picker.chosenLabel == this.UIParams.All) {
            this.dueDateValue = value.picker.chosenLabel;
            dueDateRange = { "startDate": AppConstant.ALL.toString(), "endDate": AppConstant.ALL.toString() };
        } else if (value.picker.chosenLabel == this.UIParams.Overdue) {
            this.dueDateValue = value.picker.chosenLabel;
            dueDateRange = { "startDate": DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING), "endDate": DateTimeUtil.getDateStringInUTCFormat(AppConstant.BLANK_STRING) };
        } else if (value.picker.chosenLabel != this.UIParams.Custom) {
            this.dueDateValue = value.picker.chosenLabel;
            dueDateRange = { "startDate": DateTimeUtil.getDateStringInUTCFormat(value.picker.startDate._d), "endDate": DateTimeUtil.getDateStringInUTCFormat(value.picker.endDate._d) };
        } else {
            this.dueDateValue = value.picker.startDate.format('MMM DD YYYY') + ' - ' + value.picker.endDate.format('MMM DD YYYY');
            dueDateRange = { "startDate": DateTimeUtil.getDateStringInUTCFormat(value.picker.startDate._d), "endDate": DateTimeUtil.getDateStringInUTCFormat(value.picker.endDate._d) };
        }
        dueDateRange['selectedDueDateLabel'] = value.picker.chosenLabel;
        if (value.picker.chosenLabel == this.UIParams.Overdue) {
            this.selectedStatus = this.defaultStatus.StatusID;
            dueDateRange['status'] = this.defaultStatus.StatusID;
            this.overDueDateChangeNotify.emit(dueDateRange);
        }
        else
            this.dueDateRangechangeNotify.emit(dueDateRange);

    }

    /**
     * Upadte active FU types into dropdown list
     */
    updateActiveFUTypes() {
        if (this.configurationData.FollowUpTypes != undefined) {
            this.activeFUTypes = this.configurationData.FollowUpTypes.filter(x => x.Active);
            upstream.Logger.info(FollowUpListHeaderComponent.TAG, "Configuration data in header for Active FU" + this.activeFUTypes);
        }
        else {
            upstream.Logger.error(FollowUpListHeaderComponent.TAG, "Configuration data in header for Active FU with null");
        }
    }
}
