import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import * as WorkOutActions from './workout.actions'

import { Store } from '@ngrx/store';



@Injectable()
export class WorkOutEffects {

    constructor(public store: Store<any>, private actions$: Actions) {

    }

    workOutsLoad$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOutActions.loadWorkOutsStart),

            tap(actions => {

                const workouts = localStorage.getItem('workouts');

                if (!!workouts) {
                    console.log(JSON.parse(workouts))
                    //  this.store.dispatch(BooksActions.loadBooks({ books: [...res] }))
                    this.store.dispatch(WorkOutActions.loadWorkOuts({ WorkOuts: JSON.parse(workouts) }));

                }




            }),



        ), { dispatch: false }
    )


}
