import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { catchError, map, mergeMap, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { NgrxApiService } from '../services/api.service';

import * as FeatureStateActions from './feature-state.actions';
import { getFeatureState } from './feature-state.selectors';

@Injectable()
export class FeatureStateEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureStateActions.init),
      map( (a)=>  (FeatureStateActions.loadFeatureStateSuccess({featureState:[]} )) ),
      
      // fetch({
      //   id(action) {
      //       return action.type
      //   },
      //   run: (action) => {
      //     // Your custom service 'load' logic goes here. For now just return a success action...
      //     return FeatureStateActions.loadFeatureStateSuccess({
      //       featureState: [],
      //     }) ;
      //   },
      //   onError: (action, error) => {
      //     console.error('Error', error);
      //     return FeatureStateActions.loadFeatureStateFailure({ error }) as Action;
      //   },
      // })
    )
  );

  loadProcessDataArray$=createEffect(()=> 
      this.actions$.pipe(
        ofType(FeatureStateActions.loadAPIData),
        mergeMap(action=> this.apiservice.getAPI( 
               action.contextName||'',action.useEndpoint,  action.serviceName,action.queryParams||{})
               .pipe(
              tap(result=>{
                   console.log(result);
                   if(action.onComplete){
                    try{
                      action.onComplete(result)
                    }catch(e){
                        console.log(e)
                    }
                   }
              }), 
                map(result=>FeatureStateActions.setFeatureState({stateName:action.useState,value:result}))
                ,
                catchError( (err)=>{
                    if(action.onError){
                         action.onError(err);
                    }
                   return of(FeatureStateActions.loadFeatureStateFailure({...err}))
                } )
            )
        ) ,
        // fetch({
        //   run:(action)=>{
        //     const o = this.apiservice.getAPI(
        //      action.contextName||'',action.useEndpoint,  action.serviceName,action.queryParams||{})
        //     return o.pipe(
        //       tap(result=>{
        //            console.log(result);
        //            if(action.onComplete){
        //             try{
        //               action.onComplete(result)
        //             }catch(e){
        //                 console.log(e)
        //             }
        //            }
        //       }), 
        //         map(result=>FeatureStateActions.setFeatureState({stateName:action.useState,value:result}))
        //     )
        //   },
        //   onError:(action,error)=>{
        //         return FeatureStateActions.loadFeatureStateFailure({error})
        //   }
        // })
      )
  ); 

  callProcessServiceAction$=createEffect(()=>
  this.actions$.pipe(
     ofType(FeatureStateActions.doPostAPIAction),
     withLatestFrom(this.store.select(getFeatureState) ),
     //tap( ([action,state])=> console.log(` ${JSON.stringify(action)} :  ${JSON.stringify(state)}`) ),
     mergeMap( ([action,state])=> this.apiservice.postAPI( action.replaceEndpoint,
        action.contextName,  action.service,
             {  
               ...( action.processStates.map(s=>state[s]??'' ) )
                    .reduce( (p,c)=>({...p, ...(Object.assign(p,c))   }), {} ),
               ...action.postData,
             }
           ).pipe( 
             tap(result=>{
                 if(action.onComplete ){
                       try{
                           action.onComplete(result); 
                          // console.log(`Will Set State to ${action.setState}`)
                       }catch(e){
                          // console.log(e)
                       }
                 } 
             }),
             map(result=> FeatureStateActions.setFeatureState({stateName:action.setState,value:result}) 
           )),
         )              
  ),  
);   

  constructor(private readonly actions$: Actions,private apiservice:NgrxApiService,
           private store:Store) {}
}
