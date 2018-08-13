import { CustomIdentifierDirective } from './followup-models/customIdentifier.directive';
import { FollowupsApis } from './followup-models/followups-apis';
import { PagerService } from './followup-models/pager.service';
import { CustomAutofocusDirective } from './followup-models/customAutofocus.directive';
import { FollowupConfirmationComponent } from './followup-confirmation/followup-confirmation.component';
import { AssociatedTasksComponent} from './associated-task/associated-tasks.component'
import { Carousel } from './carousel/carousel.component';
import { FollowupModalComponent } from './followup-detail/followup-modal.component';
import { FollowUpListHeaderComponent } from './followup-listheader/followup-listheader.component';
import { FollowupListToggleComponent } from './followup-toggle/followup-listtoggle.component';
import { Slide } from './carousel/slide.component';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { LinkyModule } from 'angular-linky';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import {MomentModule} from 'angular2-moment';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { FollowupListComponent } from './followup-list/followup-list.component';
import { FollowupListSearchComponent } from './followup-search/followup-listsearch.component';
import { FollowUpStatusComponent } from './followup-status/followup-status.component';
import { FollowUpListNotificationBannerComponent } from './followup-notification/followup-notification-banner.component';
import { AsyncLoaderComponent } from './util/util.asyncloader';
import { FollowUpService } from './shared/followup.service';
import { TrusteURLPipe } from './associated-task/trustUrl.pipe';
import { TrustedHTMLPipe } from './associated-task/trustedHTML.pipe';
import { FormatDatePipe } from './associated-task/formatDate.pipe';
import { CommentDateFormatPipe } from './util/util.dateformat-pipe';
import { CustomPaginationComponent } from './custom-pagination/followup.custompagination.component';
import { ClickStopPropagationDirective } from './util/util.stopPropogation.directive';
import { CustomMaxLengthPipe } from './util/util.customMaxLength.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    LinkyModule,
    MomentModule,
    Daterangepicker,
    ModalModule.forRoot()
    ],
  declarations: [
    FollowupListComponent,
    FollowUpListHeaderComponent,
    FollowupListToggleComponent,
    FollowupListSearchComponent,
    FollowUpStatusComponent,
    FollowUpListNotificationBannerComponent,
    AsyncLoaderComponent,
    FollowupModalComponent,
    Slide,
    Carousel,
    FollowupConfirmationComponent,
    CustomAutofocusDirective,
    CustomIdentifierDirective,
    AssociatedTasksComponent,
    TrusteURLPipe,
    TrustedHTMLPipe,
    FormatDatePipe,
    CommentDateFormatPipe,
    CustomPaginationComponent,
    ClickStopPropagationDirective,
    CustomMaxLengthPipe
    ],
    
  providers: [
      FollowUpService,  PagerService, FollowupsApis, DaterangepickerConfig
    ]
})
export class FollowupListModule {}
