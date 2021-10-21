import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromWorkouts from './workout.reducer';
  
  export interface State {
    Works: fromWorkouts.State;
  }
  
  export const reducers: ActionReducerMap<State> = {
    Works: fromWorkouts.reducer,
  };
  
  export const selectWorkState = createFeatureSelector<fromWorkouts.State>('workout');
  
  export const selectWorkIds = createSelector(
    selectWorkState,
    fromWorkouts.selectIds
  );
  export const selectWorkEntities = createSelector(
    selectWorkState,
    fromWorkouts.selectEntities
  );
  export const selectAllWorks = createSelector(
    selectWorkState,
    fromWorkouts.selectAll
  );
  export const selectWorkTotal = createSelector(
    selectWorkState,
    fromWorkouts.selectTotal
  );

  export const selectCompletedWorkEntities = createSelector(
    selectAllWorks,
  
     workouts=>workouts.filter(workout=>workout.status==true)
  
  );

  export const selectActiveWorkEntities = createSelector(
    selectAllWorks,
 
     workouts=>workouts.filter(workout=>workout.status==false)
 
  );

  export const loadedState =  createSelector(
    selectWorkState,
    state=>state.loaded
  )
