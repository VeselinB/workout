import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { WorkoutClass } from '../models/Workouts';
import * as WorkoutActions from './Workout.actions';


export interface State extends EntityState<WorkoutClass> {

    loaded: boolean;
    language: string;


}


export const adapter: EntityAdapter<WorkoutClass> = createEntityAdapter<WorkoutClass>();

export const initialState: State = adapter.getInitialState({

    loaded: false,
    language: "bg"



});


const WorkoutsReducer = createReducer(
    initialState,

    on(WorkoutActions.addWorkout, (state, { Workout }) => {
        return adapter.addOne(Workout, state);
    }),
    on(WorkoutActions.loadWorkouts, (state, { Workouts }) => {
        return adapter.addMany(Workouts, { ...state, loaded: true, });
    }),
    on(WorkoutActions.updateWorkout, (state, { update }) => {
        console.log(update)
        return adapter.updateOne(update, state);
    }),
    on(WorkoutActions.deleteWorkout, (state, { id }) => {
        return adapter.removeOne(id, state);
    }),


    on(WorkoutActions.changeLanguage, (state, { language }) => {
        return { ...state, language: language };
    }),


)


export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();



export function reducer(state: State | undefined, action: Action) {
    return WorkoutsReducer(state, action);
}
