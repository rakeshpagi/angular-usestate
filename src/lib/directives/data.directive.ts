
import { AfterViewInit, Directive, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { readFeatureState } from '../+state/feature-state.selectors';
import { take } from 'rxjs';
import { loadAPIData, setFeatureState } from '../+state/feature-state.actions';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({ selector: '[useState]',exportAs:'useState' })
export class UseStateDirective implements OnInit {
    @Input('useState')
    stateName!:string; 

    constructor(private store:Store) {
            //
     }

     @Input()
     value:any 
 
      
      updateState(newValue:any){
              this.store.dispatch(setFeatureState({stateName:this.stateName,value:newValue}))
      }
      updateStateName( stateName:string,  newValue:any){
              this.store.dispatch(setFeatureState({stateName,value:newValue}))
      }
      updateStateAssign(newValue:any,assignObject:any){
              this.store.dispatch(setFeatureState({stateName:this.stateName,
                        value:{...newValue,...assignObject??{}} }))
      }
      extendArray(array:any[],addarray:any[]){
          return [...array,...addarray]
      }
      ngOnInit(): void {
          //console.log(`On Init of UseState : ${this.UseState} :${this.value} `); 
          //Restore Old State 
          if(this.stateName)
          this.store.select(readFeatureState(this.stateName)).pipe(take(1)).subscribe(v=>{
              if(v===undefined){
                       this.store.dispatch(setFeatureState({stateName:this.stateName,value:this.value}))
              }
          })
 
        //   if(this.stateName)
        //      this.updateState(this.value)
            //  this.store.dispatch(FeatureStateActions.setFeatureState({stat:this.UseState,value:this.value}))
    }
      
}


@Directive({ selector: '[useFormState]', exportAs:'useFormState',
        providers:[FormGroupDirective] })
export class UseFormStateDirective implements OnInit,AfterViewInit {

    _init=false;
    @Input('useFormState')
    stateName='form';//Default StateName=form
    @Input()
    action!:string ; 
    

    @Input()
    redirectOnAction!:string; 

    @Input()
    processStates=[]; 

    @Input()
    postData:any={}

    @Input()
    actionState=`action${this.stateName}`

    // Added for Inital PatchState 
    @Input()
    initialState!:any

    @Input()
    set patchValue(value:any){
             //console.log("patching Called ");
            if(this._init && this.formgroup){
                    this.formgroup.reset(); ///Clear the Form ; 
                    this.formgroup.form.patchValue(value);   
                                     
            }
    }

    //  @HostListener('submit')
    //  get submit(){
    //      return false; 
    //  }
    // autoSubmit=false; 

    @HostListener('change')
    change($event:any){
               ///  console.log("Updating Form ")
             this.doUpdateForm();
    }
    doUpdateForm(){
                     //console.log("Changing")
         this.store.dispatch(setFeatureState({stateName:this.stateName,
                value:this.formgroup.form.value}));
    }
     
    constructor(public formgroup:FormGroupDirective,private fb:FormBuilder,
                    private store:Store,private router:Router,
                    private activatedRoute:ActivatedRoute,
                        //@Optional() @Inject(ERP_APPLICATION) private appName:string 
                    ) {
                     this.formgroup.form = fb.group({});
                     //this.formgroup.form.addControl('name', fb.control('My TestName')  ) ;      
                     //console.log("Created FormState")                
     }
     // Created For Patching Value 
     ngOnInit(): void {
         this._init=true; 
     }
     ngAfterViewInit(): void {
             if(this.initialState && this.formgroup){
                       //  console.log("Patching Form State ");
                         this.formgroup.form.patchValue(this.initialState)
             }
     }
     doAction(){
            if(this.action){
                // console.log("inAction")
                // this.store.dispatch(ErpActions.callServiceACTION({
                //             appName:this.appName,
                //              service:this.action,processStates:[this.stateName,...this.processStates],
                //              setState:this.actionState,postData:this.postData,
                //             onComplete:async(r:any)=>{ this.onActionComplete(r) }   }))
            }
     }
     async onActionComplete(result:any){
            //console.log("Action Complete/Redirecting "+this.redirectOnAction); 
            if(this.redirectOnAction){                     
                     this.router.navigate([this.redirectOnAction],{relativeTo:this.activatedRoute})
             }
     }
}


@Directive({ selector: '[useAPIState]',
    exportAs:'useAPIState' })
export class UseApiStateDirective implements OnInit,OnChanges {
    @Input('useAPIState')
    stateName!:string; 
    @Input()
    processName!:string; 

    @Input()
    processGroup!:string; 
    @Input()
    contextName!:string; 

    @Input()
    params={}; 
    @Input()
    useEndpoint!:string;

    @Input()
    loadOnInit=true; 

    _init=false; 

    @Output()
    onloadData=new EventEmitter()

    constructor(private store:Store,
                // @Optional() @Inject(ERP_APPLICATION) private appName:string,
                // @Optional() @Inject(ERP_PROCESS_GROUP) private pg:string,
                // @Optional() @Inject(ERP_PROCESS_NAME) private pn:string  
                ) { 
            //
    }
    doAction(){
        
        this.store.dispatch(loadAPIData(
                {  useEndpoint:this.useEndpoint,
                    contextName:this.contextName,
                 useState:this.stateName,
                  queryParams:this.params, onComplete: async (r)=>{
                         this.loadComplete(r)
                  }  }))   
    }
    ngOnInit(): void {
            if(this.loadOnInit)
                this.doAction(); 
             this._init=true; 
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(this._init){
            console.log('API LOAD AGAIN '); 
            //console.log(changes)
            this.doAction(); 
        }
    }
     
    async loadComplete(result:any){
             
             this.onloadData.next(result)
    }
}
