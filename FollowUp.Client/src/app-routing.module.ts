import { FollowupListComponent } from './app/followups/followup-list/followup-list.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const appRoutes: Routes = [
    { path: '', redirectTo: 'followup', pathMatch: 'full' },
    { path: '**', redirectTo: 'followup', pathMatch: 'full' },
    { path: 'followup', component: FollowupListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [ ]
})
export class AppRoutingModule { }