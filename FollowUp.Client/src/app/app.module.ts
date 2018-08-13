import { FollowupListModule } from './followups/followuplist.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';
import { downgradeComponent } from '@angular/upgrade/static';
import { APP_BASE_HREF } from '@angular/common';
declare var angular: any;


@NgModule({
  declarations: [
      AppComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FollowupListModule,
    UpgradeModule 
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule {

}