import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import * as WorkOutActions from './workout.actions'
import * as WorkOutSelectors from './workout.selectors'

import { select, Store } from '@ngrx/store';



@Injectable()
export class WorkOutEffects {

    constructor(public store: Store<any>, private actions$: Actions) {

    }

    workOutsLoad$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOutActions.loadWorkOutsStart),
            
            tap(actions => {
                this.store.select(WorkOutSelectors.loadedState).subscribe((loaded) => {
          
                    const workouts = localStorage.getItem('workouts');

                    if (!!workouts && !loaded ) {
                       console.log(loaded)
                  
                        this.store.dispatch(WorkOutActions.loadWorkOuts({ WorkOuts: JSON.parse(workouts) }));
               
    
                    }
    
                })
             



            }),



        ), { dispatch: false }
    )


}
