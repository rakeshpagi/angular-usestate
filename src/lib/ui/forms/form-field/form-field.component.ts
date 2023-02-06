import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroupDirective, ValidatorFn, ValidationErrors } from '@angular/forms';
import   dayjs  from 'dayjs' 

//const dayjs=Dayjs


@Component({
  selector: 'use-form-field',
  templateUrl: './form-field.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements OnInit,AfterViewInit {

 
   
  formControl!:FormControl; 
  @Input()
  name!:string;

  @Input()
  small=true; 

  @Input()
  errorMessage?:ValidationErrors|null

  @Input()
  label!:string; 

  @Input()
  placeholder!:string; 

  @Input()
  inputClass!:string

  @Input()
  autofocus=false;

  @Input()
  showdateIcon=true; 

  @Input()
  inputIcon!:string;

  @Input()
  errorClass=''

  @Input()
  minDate?:string
  @Input()
  maxDate?:string

  @Input()
  showOnFocus=true; 

  @Input()
  options:any[]=[]

  @Input()
  optionLabel?:string
  @Input()
  optionValue?:string

  @Input()
  set value(v:any){
      if(this.formControl){
        this.formControl.setValue(v); 
        console.log(`val:${v}`)
        this.checkDate(); 
      }

  }

  
  @Input()
  required=false

  @Input()
  fieldType='input'; 

  @Output()
  oninput=new EventEmitter()

  @Output()
  onchange=new EventEmitter()

  datevalue:any

  invalid=false

  private _init=false; 
  maxDateValidator:ValidatorFn =(control)=>{
      if(  control.value && dayjs(control.value).diff(  dayjs(this.maxDate) )>0 ){
         return {maxdate: this.errorMessage?.['maxdate']? this.errorMessage['maxdate']  : `${control.value} is greater than ${this.maxDate}`}
      }
      return null
  }
  minDateValidator:ValidatorFn =(control)=>{
      if(control.value && dayjs(control.value).diff(  dayjs(this.minDate) )<0 ){
         return {maxdate: this.errorMessage?.['mindate']? (this.errorMessage['mindate']) : `${control.value} is Less than ${this.maxDate}`}
      }
      return null
  }

  constructor(private fb:FormBuilder,
      public formgroup:FormGroupDirective) {
          this.formControl=this.fb.control(this.value); 
          
      }
      
  ngOnInit(): void { 
       this._init=true;  
       //If Not Present Then Only Add
       if(!this.formgroup.form.get(this.name))
        if(this.name&&this.formgroup){
          this.formgroup.form.addControl(this.name,
              this.formControl
            );           
          // this.formControl.setValue(this.value)
        }else{
          this.formControl=this.formgroup.form.get(this.name) as FormControl
        }
       
       this.checkDate(); 
  }
  ngAfterViewInit(): void {
       //console.log();
       if(this.fieldType==='date' && this.maxDate ){
            this.formControl.addValidators(  this.maxDateValidator )
       }
       if(this.fieldType==='date' && this.minDate ){
            this.formControl.addValidators(  this.minDateValidator )
       }
  }
  checkDate(){ 
       try{
       if(this.fieldType==='date' && this._init){
           //this.datevalue = this.value ; 
            this.datevalue= this.formControl.value?  dayjs(this.formControl.value).format('DD-MM-YYYY'):null;
       }
      }catch(e){
          // 
      }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
      //console.log(`fChange : ${this._init} :${this.name} = ${this.formControl.value}`); 
      if(this._init   && this.formgroup){
          console.log(changes)
          this.formControl.setValue(changes['value'].currentValue); 
          this.checkDate(); 
      }
  }
  updateDate(v:any){
   //      console.log(v); 
        const newvalue =    v? dayjs(v).format('YYYY-MM-DD'):null; // Corrected for Null Value V          
        this.formControl.patchValue(newvalue);
  }
}
