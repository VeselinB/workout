import { ComponentFixture, TestBed } from '@angular/core/testing';
import { reducer } from './Workout.reducer';
import { StoreModule } from '@ngrx/store';
import { WorkoutsComponent } from './Workouts.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ExersiceClass } from '../models/exersice';

declare var require: any
// const { toMatchImageSnapshot } = require('jest-image-snapshot');
// const puppeteer = require('puppeteer');
// expect.extend({ toMatchImageSnapshot });
export class MatDialogMock {

  open() {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

describe('WorkoutsComponent', () => {
  let browser;
  let component: WorkoutsComponent;
  let fixture: ComponentFixture<WorkoutsComponent>;

  beforeEach(async () => {
   // browser = await puppeteer.launch();
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule, BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({
          Workout: reducer,
        })
      ],
      declarations: [WorkoutsComponent],
      providers: [{ provide: MatDialog, useClass: MatDialogMock }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should create new exercise", () => {
    let exercise = new ExersiceClass("id", "Title");
    expect(typeof exercise).toBe('object');
    expect(exercise.title).toBe("Title");
    expect(exercise.id).toBe("id");
    expect(exercise.status).toBe(false);
  });

  it('render correctly',async  () => {
    // const page = await browser.newPage();
    // await page.goto('https://localhost:3000');
    // const image = await page.screenshot();
    const element: HTMLElement = fixture.nativeElement;
    component.activeWorkouts = [{
      id: "1",
      exersices: {},
      status: false,
      title: "Test",
    }];
    fixture.detectChanges();
   expect(fixture).toMatchSnapshot();
   expect(element.textContent).toContain("exercise");
  });
});


