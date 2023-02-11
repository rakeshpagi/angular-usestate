import { Action, createAction, props } from '@ngrx/store';
import { FeatureStateEntity } from './feature-state.models';

export const init = createAction('[FeatureState Page] Init');

export const loadFeatureStateSuccess = createAction(
  '[FeatureState/API] Load FeatureState Success',
  props<{ featureState: FeatureStateEntity[] }>()
);

export const loadFeatureStateFailure = createAction(
  '[FeatureState/API] Load FeatureState Failure',
  props<{ error: any }>()
);

export const  setFeatureState = createAction(
  '[State/Action]SetFeatureState',props<{stateName:string,value:any}>()
)

export const loadAPIData = createAction(
  '[FeatureState/API]Load API Query',
  props<{ 
    useEndpoint?:string,
    contextName?:string, 
    serviceName?:string,
    useState:string,
    queryParams?:any, 
     onComplete?:(result:any)=>Promise<any>  
     onError?: (error:any)=>Promise<any> 
    }>() 
)

export const doPostAPIAction=createAction(
  '[FeatureState/API]Post API',
  props<{ contextName?:string,replaceEndpoint?:string,
    service?:string,processStates:string[],setState:string,
    postData:any,isMultipart?:boolean,formdata?:FormData,
    onComplete?: (result:any)=>Promise<any> ,
    onError?: (error:any)=>Promise<any> 
  }>() 
)
export const doDeleteAPIAction=createAction(
  '[FeatureState/API]Delete API',
  props<{ contextName?:string,replaceEndpoint?:string,
    service?:string,processStates:string[],setState:string,
    postData:any,
    onComplete?: (result:any)=>Promise<any> ,
    onError?: (error:any)=>Promise<any> 
  }>() 
)
export const doPutAPIAction=createAction(
  '[FeatureState/API]Put API',
  props<{ contextName?:string,replaceEndpoint?:string,
    service?:string,processStates:string[],setState:string,
    postData:any,
    onComplete?: (result:any)=>Promise<any> ,
    onError?: (error:any)=>Promise<any> 
  }>() 
)