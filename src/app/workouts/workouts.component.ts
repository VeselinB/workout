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
  disabled: boolean=true;
  constructor(private store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(WorkoutsActions.loadWorkOutsStart());

    this.store.select(Selector.selectCompletedWorkEntities).subscribe(res=>{


      this.completedWorkOuts = this.getCompleted(res);
    })

    this.store.select(Selector.selectActiveWorkEntities).subscribe(res=>{

      this.activeWorkOuts = this.getActive(res);
    })

    this.store.select(Selector.selectWorkEntities).subscribe(res=>{
      console.log(res)
      window.localStorage.setItem("workouts", JSON.stringify(Object.values(res)))
    })
    this.newWork = new WorkOutClass(uuid(), "Title");
    // this.store.dispatch(WorkoutsActions.loadWorkOuts({ WorkOuts: this.activeWorkOuts }));
    this.store.dispatch(WorkoutsActions.loadWorkOutsStart());
    // this.store.dispatch(WorkoutsActions.addWorkOut({ WorkOut: this.newWork }));
    this.store.subscribe(state => {
      // console.log(...state["workout"]["entities"])
    //  window.localStorage.setItem("workouts", JSON.stringify(Object.values(state["workout"]["entities"])))
 
    });
  }
  //TODO
  getActive(workOuts) {
    console.log(workOuts)
    let result = [];
    for (const key in workOuts) {
      if (workOuts[key].status == false) {
        result.push({ ...workOuts[key] })
      }
    }
    console.log(result)
    return result;
  }

  getCompleted(workOuts) {
    console.log(workOuts)
    let result = [];
    for (const key in workOuts) {
      if (workOuts[key].status == true) {
        result.push({ ...workOuts[key] })
      }
    }
    console.log(result)
    return result;
  }

  slectedChange(selected, workOut: WorkOutClass) {
    const exerciseId = selected.option.value;
    const status = selected.option.selected;
    let updatedExercise = { ...workOut.exersices[exerciseId] };
    updatedExercise.status = status;
    //  console.log(  updatedExercise.status)
    let workOutStatus = false;
    const updatedWorkOutExercises = { ...workOut.exersices, [exerciseId]: { ...updatedExercise } };
    for (const id in updatedWorkOutExercises) {
      workOutStatus = updatedWorkOutExercises[id].status;
      //  console.log(updatedWorkOutExercises[id].status)
      if (!updatedWorkOutExercises[id].status) {
        //   console.log(updatedWorkOutExercises[id].status)
        break;
      }

    }
    const updatedWorkOut: WorkOutClass = { ...workOut, exersices: { ...updatedWorkOutExercises }, status: workOutStatus }
    this.store.dispatch(WorkoutsActions.updateWorkOut({ update: { id: workOut.id, changes: { ...updatedWorkOut } } }));
    //  console.log(workOut.id )
  }
  onDeleteEx(e, id, workOut) {
    e.stopPropagation();
    e.preventDefault();
    console.log(id, workOut)
    const updatedWorkOutExercises = { ...workOut.exersices };
    delete updatedWorkOutExercises[id];
    const updatedWorkOut: WorkOutClass = { ...workOut, exersices: { ...updatedWorkOutExercises } };
    this.store.dispatch(WorkoutsActions.updateWorkOut({ update: { id: workOut.id, changes: { ...updatedWorkOut } } }));


  }
  onDelete(e, id) {
    e.stopPropagation();
    e.preventDefault();
    console.log(id)
    this.store.dispatch(WorkoutsActions.deleteWorkOut({ id: id }))
  }

  getValue(data) {

    this.data = data;
  }
  validator(value: string){
    if(value.length!=0){
      this.disabled=false;
    } else {
      this.disabled=true;
    }
  }
  openDialog(type: string, workOut) {
    this.type = `New ${type}`;
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {

      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        this.disabled=true;
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
