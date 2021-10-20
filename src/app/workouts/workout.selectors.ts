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
    selectWorkState,
  
    (state)=>{
        console.log(state.entities)
        let entities=state.entities;
        let result={}
        for (const key in entities) {
            if (entities[key].status == true) {
              result[key]=({ ...entities[key] })
            }
          }
          console.log(result)
          return result;
    }
  );

  export const selectActiveWorkEntities = createSelector(
    selectWorkState,
  
    (state)=>{
        console.log(state.entities)
        let entities=state.entities;
        let result={}
        for (const key in entities) {
            if (entities[key].status == false) {
              result[key]=({ ...entities[key] })
            }
          }
          console.log(result)
          return result;
    }
  );
//   export const selectCurrentWorkId = createSelector(
//     selectWorkState,
//     fromWorkouts.getSelectedWorkId
//   );
  
//   export const selectCurrentWork = createSelector(
//     selectWorkEntities,
//     selectCurrentWorkId,
//     (WorkEntities, WorkId) => WorkEntities[WorkId]
//   );