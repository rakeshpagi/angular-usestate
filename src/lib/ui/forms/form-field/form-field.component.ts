import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormBuilder, FormGroupDirective } from '@angular/forms';
import   dayjs  from 'dayjs' 

//const dayjs=Dayjs


@Component({
  selector: 'use-form-field',
  templateUrl: './form-field.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements OnInit {

 
   
  formControl!:FormControl; 
  @Input()
  name!:string;

  @Input()
  small=false; 

  @Input()
  label!:string; 

  @Input()
  placeholder!:string; 

  @Input()
  autofocus=false;

  @Input()
  showdateIcon=true; 

  @Input()
  inputIcon!:string;

  @Input()
  showOnFocus=true; 

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

  datevalue:any

  invalid=false

  private _init=false; 

  constructor(private fb:FormBuilder,
      public formgroup:FormGroupDirective) {
          this.formControl=this.fb.control(this.value); 
      }
      
  ngOnInit(): void { 
       this._init=true;  
       
       if(this.name&&this.formgroup){
         this.formgroup.form.addControl(this.name,
            this.formControl
          ); 
        // this.formControl.setValue(this.value)
       }
       
       this.checkDate(); 
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
