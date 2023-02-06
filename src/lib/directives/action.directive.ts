import { Directive, Input, HostListener, Output, EventEmitter, Optional } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { doPostAPIAction, setFeatureState } from "../+state/feature-state.actions";
import { UseFormStateDirective } from "./data.directive";

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[setStateAction]' })
export class SetStateActionDirective {
    @Input('setStateAction')
    stateName!:string ;  

    @Input()
    value:any; 

    @Input()
    stateObject:any; 

    @HostListener('click')
    setState(){
        this.store.dispatch(setFeatureState({stateName:this.stateName,value:this.value})); 
        if(this.stateObject){
            Object.keys(this.stateObject).forEach( (k,i)=>{
                // 
                this.store.dispatch(setFeatureState({stateName:k,value: this.stateObject[k]  })); 
             }  )
        }
    }
    constructor(private store:Store) { }
};




// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[doPostAPIAction]' })
export class PostAPIActionDirective {
 
    @Input('doPostAPIAction')
    actionServiceName!:string; 

    @Input()
    actionsetState='onProcessActionState'

    @Input()
    processStates:string[]=[];  

    @Input()
    redirectAction!:string

    @Input()
    postData:any={}; 

    @Input()
    contextName!:string;

    @Input()
    resetFormOnComplete=true; 

    @Output()
    actionComplete=new EventEmitter<any>()
    
    @Output()
    onapiError=new EventEmitter<any>()


    @HostListener('click')
    onClick($event:any){
        // Add Confirmation Later
        this.doAction()
    }

    

    constructor(private store:Store, @Optional() private formState:UseFormStateDirective,
        private router:Router,
            private activatedRoute:ActivatedRoute,
            
            // @Optional() @Inject(ERP_APPLICATION) private appName:string,
            // @Optional() @Inject(ERP_PROCESS_GROUP) private processGroup:string,
            //  @Optional() @Inject(ERP_PROCESS_NAME) private processName:string 
              ) { }

    doAction(){ 
        if(this.formState){
            this.formState.doUpdateForm();
            this.processStates=[...this.processStates,this.formState.stateName]
        }        
        this.store.dispatch(doPostAPIAction(
            { contextName:this.contextName,  postData:this.postData,
                 processStates:this.processStates,service:this.actionServiceName,
                 setState:this.actionsetState,
                 onComplete:async (r)=>{
                     this.onActionComplete(r)
                 },
                 onError: async (error) =>{
                        console.error(error);
                        this.onapiError.emit(error)
                        //window.alert(error)
                 },
            }))
    }
    onActionComplete(result:any){
             console.log("Action Complete "+this.actionsetState);
             console.log(result);
             /// Clear the Form State : onComplete
             if(this.redirectAction){
                 this.router.navigate([this.redirectAction],{relativeTo:this.activatedRoute})
             }; 
             if(this.formState && this.resetFormOnComplete){
                this.formState.formgroup.form.reset();
             }
            
             this.actionComplete.next(result);              
    }
};