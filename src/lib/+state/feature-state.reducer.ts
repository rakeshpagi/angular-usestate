import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as FeatureStateActions from './feature-state.actions';
import { FeatureStateEntity } from './feature-state.models';

export const FEATURE_STATE_FEATURE_KEY = 'featureState';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface   AppState extends  Record<string,any>{
     
}

export interface State extends EntityState<FeatureStateEntity> {
  selectedId?: string | number; // which FeatureState record has been selected
  loaded: boolean; // has the FeatureState list been loaded
  error?: string | null; // last known error (if any)
}

export interface FeatureStatePartialState {
  readonly [FEATURE_STATE_FEATURE_KEY]: State;
}

// export const featureStateAdapter: EntityAdapter<FeatureStateEntity> =
//   createEntityAdapter<FeatureStateEntity>();

// export const initialState: State = featureStateAdapter.getInitialState({
//   // set initial required properties
//   loaded: false,
// });
export const initialState:AppState={
    appname:'Test-NPM'
}

const featureStateReducer = createReducer(
  initialState,
  on(FeatureStateActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(FeatureStateActions.setFeatureState,(state,{stateName,value})=>({...state,[stateName]:value}))
  // on(FeatureStateActions.loadFeatureStateSuccess, (state, { featureState }) =>
  //   featureStateAdapter.setAll(featureState, { ...state, loaded: true })
  // ),
  // on(FeatureStateActions.loadFeatureStateFailure, (state, { error }) => ({
  //   ...state,
  //   error,
  // }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureStateReducer(state, action);
}
