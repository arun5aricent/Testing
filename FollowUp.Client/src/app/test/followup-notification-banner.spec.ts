import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FollowUpListNotificationBannerComponent } from '../followups/followup-notification/followup-notification-banner.component';
import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, Component } from '@angular/core';
import { FollowupRes } from '../followups/followup-models/followup-res';
import { Notification } from '../followups/followup-models/notification';
describe('FollowUpListNotificationBannerComponent (templateUrl)', () => {

    let comp: FollowUpListNotificationBannerComponent;
    let fixture: ComponentFixture<FollowUpListNotificationBannerComponent>;
    let de;
    let el: HTMLElement;
    let notificationTest: Notification = {
        "notificationMessage": "Test message",
        "notificationType": "Default"
    }
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                HttpModule,
                FormsModule
            ],
            declarations: [
                FollowUpListNotificationBannerComponent,
            ], // declare the test component

        })
            .compileComponents() // compile template and css
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(FollowUpListNotificationBannerComponent);
        comp = fixture.componentInstance;
        comp.notification = notificationTest;
        fixture.detectChanges();
    });



    it('should return default notification type', async(() => {

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            let expectedClassName = comp.getClassName();
            expect(expectedClassName).toBe("default");
        });

    }));
    it('should return info notification type', async(() => {

        fixture.whenStable().then(() => {
            notificationTest.notificationType = "info";
            comp.notification = notificationTest;
            fixture.detectChanges();
            let expectedClassName = comp.getClassName();
            expect(expectedClassName).toBe("info");
        });

    }));
    it('should return success notification type', async(() => {

        fixture.whenStable().then(() => {
            notificationTest.notificationType = "success";
            comp.notification = notificationTest;
            fixture.detectChanges();
            let expectedClassName = comp.getClassName();
            expect(expectedClassName).toBe("success");
        });


    }));

    it('should return warning notification type', async(() => {

        fixture.whenStable().then(() => {
            notificationTest.notificationType = "warning";
            comp.notification = notificationTest;
            fixture.detectChanges();
            let expectedClassName = comp.getClassName();
            expect(expectedClassName).toBe("warning");
        });


    }));
    it('should return danger notification type', async(() => {

        fixture.whenStable().then(() => {
            notificationTest.notificationType = "danger";
            comp.notification = notificationTest;
            fixture.detectChanges();
            let expectedClassName = comp.getClassName();
            expect(expectedClassName).toBe("danger");
        });


    }));

    it('click event should be notified', async(() => {

        fixture.whenStable().then(() => {
            de = fixture.debugElement.queryAll(By.css('span'));
            de[1].triggerEventHandler('click', true);
        });


    }));
});

