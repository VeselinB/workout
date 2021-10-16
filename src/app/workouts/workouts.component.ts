import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list'
import { Store } from '@ngrx/store';

import { WorkOutClass } from '../models/workouts';
import * as WorkoutsActions from "../workouts/workout.actions"

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {
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
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.newWork = new WorkOutClass(uuid(), "Title");
    // this.store.dispatch(WorkoutsActions.loadWorkOuts({ WorkOuts: this.activeWorkOuts }));
    this.store.dispatch(WorkoutsActions.loadWorkOutsStart());
    // this.store.dispatch(WorkoutsActions.addWorkOut({ WorkOut: this.newWork }));
    this.store.subscribe(state => {
      // console.log(...state["workout"]["entities"])
      window.localStorage.setItem("workouts", JSON.stringify(Object.values(state["workout"]["entities"])))
      this.activeWorkOuts = this.getActive(state["workout"]["entities"]);
    });
  }
  //TODO
  getActive(workOuts) {
    console.log(workOuts)
    let result = [];
    for (const key in workOuts) {
      if (workOuts[key].status == false) {
        result.push({ ...workOuts[key]})
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

  onDelete(e, id) {
    e.stopPropagation();
    e.preventDefault();
  }
}
