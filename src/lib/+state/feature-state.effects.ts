import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { NgrxApiService } from '../services/api.service';

import * as FeatureStateActions from './feature-state.actions';
import { getFeatureState } from './feature-state.selectors';

@Injectable()
export class FeatureStateEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureStateActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return FeatureStateActions.loadFeatureStateSuccess({
            featureState: [],
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return FeatureStateActions.loadFeatureStateFailure({ error });
        },
      })
    )
  );

  loadProcessDataArray$=createEffect(()=> 
      this.actions$.pipe(
        ofType(FeatureStateActions.loadAPIData),
        fetch({
          run:(action)=>{
            const o = this.apiservice.getAPI(
             action.contextName||'',action.useEndpoint,  action.serviceName,action.queryParams||{})
            return o.pipe(
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
            )
          },
          onError:(action,error)=>{
                return FeatureStateActions.loadFeatureStateFailure({error})
          }
        })
      )
  ); 

  callProcessServiceAction$=createEffect(()=>
  this.actions$.pipe(
     ofType(FeatureStateActions.doPostAPIAction),
     withLatestFrom(this.store.select(getFeatureState) ),
     //tap( ([action,state])=> console.log(` ${JSON.stringify(action)} :  ${JSON.stringify(state)}`) ),
     switchMap( ([action,state])=> this.apiservice.postAPI( action.replaceEndpoint,
        action.contextName,  action.service,
             {  ...action.postData,
               ...( action.processStates.map(s=>state[s]??'' )  )
               .reduce( (p,c)=>({...p, ...(Object.assign(p,c))   }), {} )
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
