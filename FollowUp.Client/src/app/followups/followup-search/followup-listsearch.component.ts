import { Followup } from '../followup-models/followup';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppConstant } from '../util/util.appconstant';
import { FollowUpService } from '../shared/followup.service';

declare var upstream: any;

@Component({
    selector: 'followup-search',
    templateUrl: `./followup-listsearch.component.html`,
    styleUrls: ['./followup-listsearch.component.css']
})
export class FollowupListSearchComponent {
    private static TAG: string = 'FollowupListSearchComponent';
    @Input() UIParams: any;
    @Output() searchNotify: EventEmitter<string> = new EventEmitter<string>();
    @Output() clearSearchNotify: EventEmitter<boolean> = new EventEmitter<boolean>();
    searchValue: string = AppConstant.BLANK_STRING;
    errorMessage: string;
    _isSearchBoxEmpty: boolean = true;
    @Input()
    set clearSearchText(_clearText: boolean) {

        this.emptySearchBox();

    }

    constructor(private _followupService: FollowUpService) {

    }

    onKey(event,searchValue: string) {
        console.log("Search event",event);
        if(event.keyCode == 13){
            this.onEnterKeyPressed(searchValue);
            return;
        }
        if (searchValue == AppConstant.BLANK_STRING || searchValue == null) {
            this.emptySearchBox();
            //call getlistFollowup if the search string becomes "" again.
            this.clearSearchNotify.emit(true);
        } else {
            this.searchValue = searchValue;
            this._isSearchBoxEmpty = false;
        }
        upstream.Logger.info("===" + searchValue);

        upstream.Logger.info(FollowupListSearchComponent.TAG, "this._isSearchBoxEmpty " + this._isSearchBoxEmpty);
    }


    onEnterKeyPressed(searchValue) {
        upstream.Logger.info(FollowupListSearchComponent.TAG, "Enter key " + searchValue);
        this.searchValue = searchValue;
        if(this.searchValue == AppConstant.BLANK_STRING || this.searchValue.trim().length == 0){
            this.searchValue=AppConstant.BLANK_STRING;
            this._isSearchBoxEmpty=true;
            return;
        }
        this._isSearchBoxEmpty = false;
        this.searchNotify.emit(searchValue.trim());
    }
    emptySearchBox() {
        this.searchValue = AppConstant.BLANK_STRING;
        this._isSearchBoxEmpty = true;
    }
    notifyClearButtonClicked() {
        this.emptySearchBox();
        this.clearSearchNotify.emit(true);
    }

}
