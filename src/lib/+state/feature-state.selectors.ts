import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AppState,
  FEATURE_STATE_FEATURE_KEY,
  State,
  //featureStateAdapter,
} from './feature-state.reducer';

// Lookup the 'FeatureState' feature state managed by NgRx
export const getFeatureState = createFeatureSelector<AppState>(
  FEATURE_STATE_FEATURE_KEY
);

export const readFeatureState =  (stateName:string)=> createSelector( getFeatureState, (state:AppState)=>state[stateName]   );

//const { selectAll, selectEntities } = featureStateAdapter.getSelectors();

// export const getFeatureStateLoaded = createSelector(
//   getFeatureStateState,
//   (state: State) => state.loaded
// );

// export const getFeatureStateError = createSelector(
//   getFeatureStateState,
//   (state: State) => state.error
// );

// export const getAllFeatureState = createSelector(
//   getFeatureStateState,
//   (state: State) => selectAll(state)
// );

// export const getFeatureStateEntities = createSelector(
//   getFeatureStateState,
//   (state: State) => selectEntities(state)
// );

// export const getSelectedId = createSelector(
//   getFeatureStateState,
//   (state: State) => state.selectedId
// );

// export const getSelected = createSelector(
//   getFeatureStateEntities,
//   getSelectedId,
//   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// );
