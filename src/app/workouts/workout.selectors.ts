import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromWorkouts from './Workout.reducer';
  
  export interface State {
    Works: fromWorkouts.State;
  }
  
  export const reducers: ActionReducerMap<State> = {
    Works: fromWorkouts.reducer,
  };
  
  export const selectWorkState = createFeatureSelector<fromWorkouts.State>('Workout');
  

  export const selectCurrentLanguage = createSelector(
    selectWorkState,
    (state)=>state.language
  );

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
  
     Workouts=>Workouts.filter(Workout=>Workout.status==true)
  
  );

  export const selectActiveWorkEntities = createSelector(
    selectAllWorks,
 
     Workouts=>Workouts.filter(Workout=>Workout.status==false)
 
  );

  export const loadedState =  createSelector(
    selectWorkState,
    state=>state.loaded
  )
