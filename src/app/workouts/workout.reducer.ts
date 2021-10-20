import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { WorkOutClass } from '../models/workouts';
import * as WorkOutActions from './workout.actions';


export interface State extends EntityState<WorkOutClass> {
    // additional entities state properties
    selectedWorkOutId: string | null;

}


export const adapter: EntityAdapter<WorkOutClass> = createEntityAdapter<WorkOutClass>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    selectedWorkOutId: null,
});



const workOutsReducer = createReducer(
    initialState,
    // on(UserActions.addBook, (state, { book }) => {
    //   return adapter.addOne(book, state)
    // }),
    on(WorkOutActions.addWorkOut, (state, { WorkOut }) => {
        return adapter.addOne(WorkOut, state);
    }),
    on(WorkOutActions.loadWorkOuts, (state, { WorkOuts }) => {
        return adapter.addMany(WorkOuts, state);
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
