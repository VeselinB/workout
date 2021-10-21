import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list'
import { Store } from '@ngrx/store';

import { ExersiceClass } from "../models/exersice"

import { WorkOutClass } from '../models/workouts';
import * as WorkoutsActions from "../workouts/workout.actions"

import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import * as Selector from './workout.selectors'

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  completedWorkOuts: WorkOutClass[] = []
  activeWorkOuts: WorkOutClass[] = [
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
  Object = Object;
  newWork: WorkOutClass;
  type: string;
  data: any;
  disabled: boolean = true;
  constructor(private store: Store, private dialog: MatDialog) { }
  name = { name: "Vesko" }
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






    this.store.dispatch(WorkoutsActions.loadWorkOutsStart());

    this.store.select(Selector.selectCompletedWorkEntities).subscribe(res => {


      this.completedWorkOuts = res;
    })

    this.store.select(Selector.selectActiveWorkEntities).subscribe(res => {

      this.activeWorkOuts = res;
    })

    this.store.select(Selector.selectAllWorks).subscribe(res => {

      window.localStorage.setItem("workouts", JSON.stringify(Object.values(res)))


    })
    this.newWork = new WorkOutClass(uuid(), "Title");

    this.store.dispatch(WorkoutsActions.loadWorkOutsStart());


  }

 

  slectedChange(selected, workOut: WorkOutClass) {
    const exerciseId = selected.option.value;
    const status = selected.option.selected;
    let updatedExercise = { ...workOut.exersices[exerciseId] };
    updatedExercise.status = status;

    let workOutStatus = false;
    const updatedWorkOutExercises = { ...workOut.exersices, [exerciseId]: { ...updatedExercise } };
    for (const id in updatedWorkOutExercises) {
      workOutStatus = updatedWorkOutExercises[id].status;
  
      if (!updatedWorkOutExercises[id].status) {
   
        break;
      }

    }
    const updatedWorkOut: WorkOutClass = { ...workOut, exersices: { ...updatedWorkOutExercises }, status: workOutStatus }
    this.store.dispatch(WorkoutsActions.updateWorkOut({ update: { id: workOut.id, changes: { ...updatedWorkOut } } }));

  }
  onDeleteEx(e, id, workOut) {
    e.stopPropagation();
    e.preventDefault();

    const updatedWorkOutExercises = { ...workOut.exersices };
    delete updatedWorkOutExercises[id];
    const updatedWorkOut: WorkOutClass = { ...workOut, exersices: { ...updatedWorkOutExercises } };
    this.store.dispatch(WorkoutsActions.updateWorkOut({ update: { id: workOut.id, changes: { ...updatedWorkOut } } }));


  }
  onDelete(e, id) {
    e.stopPropagation();
    e.preventDefault();

    this.store.dispatch(WorkoutsActions.deleteWorkOut({ id: id }))
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
  openDialog(type: string, workOut) {
    this.type = `New ${type}`;
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {

     
      if (result !== undefined) {
        this.disabled = true;
        if (result === 'yes' && type == "workout") {
          const newWorkOut = new WorkOutClass(uuid(), this.data);
          this.store.dispatch(WorkoutsActions.addWorkOut({ WorkOut: newWorkOut }))


        } else if (result === 'yes' && type == "exercise") {
          let newExercise = new ExersiceClass(uuid(), this.data)
          let updatedExercises = { ...workOut.exersices, [newExercise.id]: newExercise };

          const updatedWorkOut: WorkOutClass = { ...workOut, exersices: { ...updatedExercises } }
          this.store.dispatch(WorkoutsActions.updateWorkOut({ update: { id: workOut.id, changes: { ...updatedWorkOut } } }));


        }
      }
    })
  }
}
