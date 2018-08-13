
import {Component, Input, OnDestroy} from '@angular/core';


declare var upstream: any
@Component({
    selector: 'async-loader',
    templateUrl: './util.asyncloader.html',
    styleUrls: ['./util.asyncloader.css']
})
export class AsyncLoaderComponent implements OnDestroy{

    asyncLoaderClass : string;

    ngOnDestroy() : any  {

    }

    @Input()
    public set isRunning(value: boolean) {
        upstream.Logger.info("AsyncLoaderComponent isshowing :: ", value);
        if (value) {
            upstream.Logger.info("AsyncLoaderComponent", "show");
           this.asyncLoaderClass = 'asyncloader-show';
        }else{
            upstream.Logger.info("AsyncLoaderComponent", "hide");
           this.asyncLoaderClass = 'asyncloader-hide';
        }
    }

onClickEvent(event){
    
}
    
}