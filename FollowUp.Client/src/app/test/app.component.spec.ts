// import { inject,TestBed, async } from '@angular/core/testing';

// import { AppComponent } from './app.component';
// import { Router, RouterOutlet } from "@angular/router";
// import { RouterTestingModule } from '@angular/router/testing';

// class MockRouter { public navigate() {}; }
// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports:[RouterTestingModule],
//       declarations: [
//         AppComponent
//       ],
//       providers: [
//             {provide: Router,  useClass: MockRouter },
//             RouterOutlet
//         ]
//     }).compileComponents();
//   }));

//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));

//   it(`should have as title 'app works!'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('app works!');
//   }));
// });
