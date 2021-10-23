import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';

import { WorkoutClass } from '../models/Workouts';

export const changeLanguage = createAction('[Workout/API] Change Language', props<{ language: string }>());


export const loadWorkouts = createAction('[Workout/API] Load Workouts', props<{ Workouts: WorkoutClass[] }>());
export const loadWorkoutsStart = createAction('[Workout/API] Load Start Workout');

export const addWorkout = createAction('[Workout/API] Add Workout', props<{ Workout: WorkoutClass }>());
export const addWorkoutStart = createAction('[Workout/API] Add Workout Start', props<{ Workout: WorkoutClass }>());

export const deleteWorkout = createAction('[Workout/API] Delete Workout', props<{ id: string }>());
export const deleteWorkoutStart = createAction('[Workout/API] Delete Workout Start', props<{ id: string }>());


export const updateWorkout = createAction('[Workout/API] Update Workout', props<{ update: Update<WorkoutClass> }>());
export const updateWorkoutStart = createAction('[Workout/API] Update Workout Start', props<{ update: Update<WorkoutClass> }>());

