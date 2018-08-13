import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FollowUpService } from '../followups/shared/followup.service';
import { FollowupListToggleComponent } from '../followups/followup-toggle/followup-listtoggle.component';
import { inject, TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, Component } from '@angular/core';
import { FollowupRes } from '../followups/followup-models/followup-res';
describe('FollowuplistComponent (templateUrl)', () => {

    let comp: FollowupListToggleComponent;
    let fixture: ComponentFixture<FollowupListToggleComponent>;
    let de;
    let el: HTMLElement;
    let followUpService: FollowUpService;
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                HttpModule,
                FormsModule
            ],
            declarations: [
                FollowupListToggleComponent,
            ], // declare the test component
            providers: [FollowUpService]
        })
            .compileComponents() // compile template and css
            .then(() => {
                fixture = TestBed.createComponent(FollowupListToggleComponent);
                comp = fixture.componentInstance;
                followUpService = fixture.debugElement.injector.get(FollowUpService);
                fixture.detectChanges();
                de = fixture.debugElement.query(By.css('input'));
            });
    }));



    it('should display details of follow up', async(() => {

        fixture.whenStable().then(() => {
            console.log(fixture.isStable(), "testing");
            fixture.detectChanges();
            let isPersonal: boolean;
            comp.notify.subscribe((personal: boolean) => isPersonal = personal);
            let compiled = fixture.debugElement.nativeElement;
            comp.onToggleClick()
            expect(comp.isToggleOn).toBeFalsy();
        });

    }));
    it('should display details of follow up', async(() => {

        fixture.whenStable().then(() => {
            console.log(fixture.isStable(), "testing");
            fixture.detectChanges();
            let isPersonal: boolean;
            comp.notify.subscribe((personal: boolean) => isPersonal = personal);
            let compiled = fixture.debugElement.nativeElement;
            comp.onToggleClick()
            expect(comp.isToggleOn).toBeFalsy();
        });

    }));
    it('should re render the toggle view', async(() => {

        fixture.whenStable().then(() => {
            console.log(fixture.isStable(), "testing");
            fixture.detectChanges();
            let isPersonal: boolean;
            comp.reloadToggleView = true;
            expect(comp.isToggleOn).toBeFalsy();
        });

    }));



});
