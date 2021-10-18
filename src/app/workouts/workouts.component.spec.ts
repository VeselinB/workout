import { ComponentFixture, TestBed } from '@angular/core/testing';
import { reducer } from './workout.reducer';
import { StoreModule } from '@ngrx/store';
import { WorkoutsComponent } from './workouts.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ExersiceClass } from '../models/exersice';

export class MatDialogMock {

  open() {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

describe('WorkoutsComponent', () => {
  let component: WorkoutsComponent;
  let fixture: ComponentFixture<WorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule, BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({
          workout: reducer,
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

  it('should display a new empty workout', () => {
    component.activeWorkOuts = [{
      id: "1",
      exersices: {},
      status: false,
      title: "Test",
    }];
    fixture.detectChanges();
   expect(fixture).toMatchSnapshot();
  });
});


