import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import * as WorkoutActions from './Workout.actions'
import * as WorkoutSelectors from './Workout.selectors'

import { select, Store } from '@ngrx/store';



@Injectable()
export class WorkoutEffects {

    constructor(public store: Store<any>, private actions$: Actions) {

    }

    WorkoutsLoad$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutActions.loadWorkoutsStart),
            
            tap(actions => {
                this.store.select(WorkoutSelectors.loadedState).subscribe((loaded) => {
          
                    const Workouts = localStorage.getItem('Workouts');

                    if (!!Workouts && !loaded ) {
                       console.log(loaded)
                  
                        this.store.dispatch(WorkoutActions.loadWorkouts({ Workouts: JSON.parse(Workouts) }));
               
    
                    }
    
                })
             



            }),



        ), { dispatch: false }
    )


}
