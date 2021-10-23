import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list'
import { Store } from '@ngrx/store';

import { ExersiceClass } from "../models/exersice"

import { WorkoutClass } from '../models/Workouts';
import * as WorkoutsActions from "../Workouts/Workout.actions"

import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import * as Selector from './Workout.selectors'

import { v4 as uuid } from 'uuid';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-Workouts',
  templateUrl: './Workouts.component.html',
  styleUrls: ['./Workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  completedWorkouts: WorkoutClass[] = []
  activeWorkouts: WorkoutClass[] = [
    {

      id: uuid(),
      title: "Today",
      status: true,
      exersices: {

        1: {
          id: "1",
          title: "excercise1",
          status: true
        },
        2: {
          id: "2",
          title: "excercise2",
          status: false
        }

      },

    },
    {

      id: uuid(),
      title: "Today",
      status: true,
      exersices: {

        1: {
          id: "1",
          title: "excercise1",
          status: true
        },
        2: {
          id: "2",
          title: "excercise2",
          status: false
        }

      },

    }
  ]
  language = "bg";
  Object = Object;
  newWork: WorkoutClass;
  type: string;
  data: any;
  disabled: boolean = true;
  name = { name: "Vesko" }

  constructor(private store: Store, private dialog: MatDialog, private translate: TranslateService) { }

  ngOnInit(): void {
    let test = {
      name: "Stoil",
      showName() {
        console.log(this.name)
      }

    }
    let name = { name: "Vesko" }
    let name1 = { name: "Toshe" }

    test.showName.call(name1)
    // class Test {
    //   height;
    //   width;
    //   sum(){
    //     return this.height+this.width
    //   }
    //   constructor(height?, width?) {
    //     this.height = height;
    //     this.width = width;
    //   }
    // }

    // class Test1 extends Test {
    //   name;
    //   constructor(height, width, name?) {
    //     super()
    //     this.name = name
    //     this.height = height;
    //     this.width = width;
    //   }
    // }

    // class Test2 extends Test1{
    //   constructor(height, width){
    //     super(height, width)
    //   }
    // }

    // let test = new Test2(1, 2)
    // console.log(test.sum())






    this.store.dispatch(WorkoutsActions.loadWorkoutsStart());

    this.store.select(Selector.selectCurrentLanguage).subscribe(language => {
      this.language = language;
      this.translate.use(language);

    })

    this.store.select(Selector.selectCompletedWorkEntities).subscribe(res => {


      this.completedWorkouts = res;
    })

    this.store.select(Selector.selectActiveWorkEntities).subscribe(res => {

      this.activeWorkouts = res;
    })

    this.store.select(Selector.selectAllWorks).subscribe(res => {

      window.localStorage.setItem("Workouts", JSON.stringify(Object.values(res)))


    })

    this.newWork = new WorkoutClass(uuid(), "Title");

    this.store.dispatch(WorkoutsActions.loadWorkoutsStart());


  }


   capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + [...string.slice(1).toLowerCase()].join("");
}

  changeLanguage(language) {
    this.store.dispatch(WorkoutsActions.changeLanguage({ language: language }))
    console.log(language)
    // this.language = language;
    //this.translate.use(language);
  }

  slectedChange(selected, Workout: WorkoutClass) {
    const exerciseId = selected.option.value;
    const status = selected.option.selected;
    let updatedExercise = { ...Workout.exersices[exerciseId] };
    updatedExercise.status = status;

    let WorkoutStatus = false;
    const updatedWorkoutExercises = { ...Workout.exersices, [exerciseId]: { ...updatedExercise } };
    for (const id in updatedWorkoutExercises) {
      WorkoutStatus = updatedWorkoutExercises[id].status;

      if (!updatedWorkoutExercises[id].status) {

        break;
      }

    }
    const updatedWorkout: WorkoutClass = { ...Workout, exersices: { ...updatedWorkoutExercises }, status: WorkoutStatus }
    this.store.dispatch(WorkoutsActions.updateWorkout({ update: { id: Workout.id, changes: { ...updatedWorkout } } }));

  }
  onDeleteEx(e, id, Workout) {
    e.stopPropagation();
    e.preventDefault();

    const updatedWorkoutExercises = { ...Workout.exersices };
    delete updatedWorkoutExercises[id];
    const updatedWorkout: WorkoutClass = { ...Workout, exersices: { ...updatedWorkoutExercises } };
    this.store.dispatch(WorkoutsActions.updateWorkout({ update: { id: Workout.id, changes: { ...updatedWorkout } } }));


  }
  onDelete(e, id) {
    e.stopPropagation();
    e.preventDefault();

    this.store.dispatch(WorkoutsActions.deleteWorkout({ id: id }))
  }

  getValue(data) {

    this.data = data;
  }
  validator(value: string) {
    if (value.length != 0) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
  openDialog(type: string, Workout) {
    
    this.type = type=="workout" ?`New workout`: 'Add exercise';
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {


      if (result !== undefined) {
        this.disabled = true;
        if (result === 'yes' && type == "workout") {
          console.log(this.data)
          const newWorkout = new WorkoutClass(uuid(), this.capitalizeFirstLetter(this.data));
          this.store.dispatch(WorkoutsActions.addWorkout({ Workout: newWorkout }))


        } else if (result === 'yes' && type == "exercise") {
          let newExercise = new ExersiceClass(uuid(), this.data)
          let updatedExercises = { ...Workout.exersices, [newExercise.id]: newExercise };

          const updatedWorkout: WorkoutClass = { ...Workout, exersices: { ...updatedExercises } }
          this.store.dispatch(WorkoutsActions.updateWorkout({ update: { id: Workout.id, changes: { ...updatedWorkout } } }));


        }
      }
    })
  }
}
