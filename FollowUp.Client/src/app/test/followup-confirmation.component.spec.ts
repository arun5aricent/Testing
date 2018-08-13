import { AppConstant } from './../followups/util/util.appconstant';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FollowUpListNotificationBannerComponent } from '../followups/followup-notification/followup-notification-banner.component';
import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, Component } from '@angular/core';
import { FollowupRes } from '../followups/followup-models/followup-res';
import { FollowupConfirmationComponent } from '../followups/followup-confirmation/followup-confirmation.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
describe('FollowupConfirmationComponent (templateUrl)', () => {

    let comp: FollowupConfirmationComponent;
    let fixture: ComponentFixture<FollowupConfirmationComponent>;
    let de;
    let el: HTMLElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                HttpModule,
                FormsModule,
                ModalModule.forRoot()
            ],
            declarations: [
                FollowupConfirmationComponent,
            ], // declare the test component

        })
            .compileComponents() // compile template and css
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(FollowupConfirmationComponent);
        comp = fixture.componentInstance;

        fixture.detectChanges();
    });



    it('confirmation box should be hidden', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            comp.hideConfirmationDialog();
            expect(comp.confirmationModal.isShown).toBeFalsy();
            comp.type = AppConstant.CRITICAL;
            de = fixture.debugElement.query(By.css('.uwf-check'));
            fixture.detectChanges();
            comp.hideConfirmationDialog();
            de.triggerEventHandler("hideModalNotify", "true");
            expect(comp.confirmationModal.isShown).toBeFalsy();
        });

    }));

    it('confirmation box should be visible', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            comp.show("Test string", "critical");
            expect(comp.confirmationModal.isShown).toBeTruthy();
        });

    }));

    it('confirm queue event should be emitted', async(() => {
        fixture.whenStable().then(() => {
            de = fixture.debugElement.query(By.css('.uwf-check'));
            fixture.detectChanges();
            comp.confirmQueueTask();
            de.triggerEventHandler("confirmQueueTaskNotify", "true");
        });

    }));
});

