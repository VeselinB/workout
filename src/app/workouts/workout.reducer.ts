import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { WorkOutClass } from '../models/workouts';
import * as WorkOutActions from './workout.actions';


export interface State extends EntityState<WorkOutClass> {
   
    loaded: boolean;


}


export const adapter: EntityAdapter<WorkOutClass> = createEntityAdapter<WorkOutClass>();

export const initialState: State = adapter.getInitialState({
  
    loaded: false



});


const workOutsReducer = createReducer(
    initialState,
 
    on(WorkOutActions.addWorkOut, (state, { WorkOut }) => {
        return adapter.addOne(WorkOut, state);
    }),
    on(WorkOutActions.loadWorkOuts, (state, { WorkOuts }) => {
        return adapter.addMany(WorkOuts, {  ...state, loaded: true,});
    }),
    on(WorkOutActions.updateWorkOut, (state, { update }) => {
        console.log(update)
        return adapter.updateOne(update, state);
    }),
    on(WorkOutActions.deleteWorkOut, (state, { id }) => {
        return adapter.removeOne(id, state);
    }),

)


export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();



export function reducer(state: State | undefined, action: Action) {
    return workOutsReducer(state, action);
}
