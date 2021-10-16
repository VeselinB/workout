import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';

import { WorkOutClass } from '../models/workouts';

export const loadWorkOuts = createAction('[WorkOut/API] Load WorkOuts', props<{ WorkOuts: WorkOutClass[] }>());
export const loadWorkOutsStart = createAction('[WorkOut/API] Load Start WorkOut');

export const addWorkOut = createAction('[WorkOut/API] Add WorkOut', props<{ WorkOut: WorkOutClass }>());
export const addWorkOutStart = createAction('[WorkOut/API] Add WorkOut Start', props<{ WorkOut: WorkOutClass }>());

export const deleteWorkOut = createAction('[WorkOut/API] Delete WorkOut', props<{ id: string }>());
export const deleteWorkOutStart = createAction('[WorkOut/API] Delete WorkOut Start', props<{ id: string }>());


export const updateWorkOut = createAction('[WorkOut/API] Update WorkOut', props<{ update: Update<WorkOutClass> }>());
export const updateWorkOutStart = createAction('[WorkOut/API] Update WorkOut Start', props<{ update: Update<WorkOutClass> }>());

