import { FollowUpService } from '../shared/followup.service';
import {Component,  EventEmitter, Input, Output,ViewChild,ViewContainerRef,ComponentRef,ComponentFactoryResolver,ChangeDetectorRef} from '@angular/core';
//import "../../../assets/js/logger.js";
import { AppConstant } from '../util/util.appconstant';
declare var upstream: any;

@Component({
    selector: 'followup-toggle-switch',
    templateUrl: `./followup-listtoggle.component.html`,
    styleUrls: ['./followup-listtoggle.component.css']
})

export class FollowupListToggleComponent{
    private static TAG : string = "FollowupListToggleComponent";
    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild(AppConstant.TOGGLE_SWITCH) toggleSwitch;
    @Input() UIParams: any;
    isToggleOn : boolean= false;
    personalOffset : number = 0;
    isViewInitialized;
    @Input()
    toggleName: string;

    @Input()
    itemsPerPage : number;

    @Input()
    set reloadToggleView(reload:boolean){
        upstream.Logger.info(FollowupListToggleComponent.TAG, "reload toggle view");
        if(reload){
            this._vcr.clear();
            this.isToggleOn = false;  
        }
   }
    constructor(
      private _followupService: FollowUpService,
                private _vcr: ViewContainerRef){}

    onToggleClick(){
        this.isToggleOn = (<HTMLInputElement>document.getElementsByName(this.toggleName)[0]).checked;
        upstream.Logger.info(FollowupListToggleComponent.TAG, "isToggleOn " + this.isToggleOn);
        this.notify.emit(this.isToggleOn);
    }
    ngAfterViewInit() {
        this.isViewInitialized = true;
    }

    


}
