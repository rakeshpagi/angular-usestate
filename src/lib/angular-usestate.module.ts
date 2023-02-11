import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective, UseUnderlineDirective } from './directives/ui.directive';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFeatureState from './+state/feature-state.reducer';
import { FeatureStateEffects } from './+state/feature-state.effects';
import { UseApiStateDirective, UseFormStateDirective, UseStateDirective } from './directives/data.directive';
import { AddSysdatePipe, AssignObjectPipe, CallFunctionPipe, FilterArrayPipe, FilterLikeArrayPipe, GroupbyArrayPipe, IntegerRangePipe, MapObjectPipe, MapValuePipe, MergeArrayArrayPipe, ReadStatePipe, ResolveArrayPipe, ResolvePipe, SumOfPipe, TimeoutPipe, TypeOfPipe, UpdateEntityPipe } from './pipes/data.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './ui/forms/form-field/form-field.component';
import { DeleteApiActionDirective, PostAPIActionDirective, PutApiActionDirective, SetStateActionDirective } from './directives/action.directive';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature(
      fromFeatureState.FEATURE_STATE_FEATURE_KEY,
      fromFeatureState.reducer
    ),
    EffectsModule.forFeature([FeatureStateEffects]),
  ],
  declarations: [
    FormFieldComponent,
    UseUnderlineDirective,UseStateDirective,UseFormStateDirective,UseApiStateDirective,
          AutofocusDirective,
          SetStateActionDirective,PostAPIActionDirective,
            ReadStatePipe,SumOfPipe,FilterArrayPipe,
          FilterLikeArrayPipe,GroupbyArrayPipe,AssignObjectPipe,DeleteApiActionDirective,PutApiActionDirective,
        MapValuePipe,CallFunctionPipe, FormFieldComponent,TypeOfPipe,TimeoutPipe, UpdateEntityPipe,IntegerRangePipe,
        MapObjectPipe,ResolvePipe,ResolveArrayPipe,MergeArrayArrayPipe,
        AddSysdatePipe,
       ],
               
  exports: [
    FormFieldComponent,
    FormsModule,ReactiveFormsModule,
    UseFormStateDirective,UseApiStateDirective,
    AutofocusDirective,SetStateActionDirective,PostAPIActionDirective,DeleteApiActionDirective,PutApiActionDirective,
    UseUnderlineDirective,UseStateDirective,ReadStatePipe,
  SumOfPipe,FilterArrayPipe,FilterLikeArrayPipe,GroupbyArrayPipe,
AssignObjectPipe,MapValuePipe,CallFunctionPipe, FormFieldComponent,
    MapObjectPipe,ResolvePipe,ResolveArrayPipe,MergeArrayArrayPipe,
    TypeOfPipe,TimeoutPipe,UpdateEntityPipe,IntegerRangePipe,AddSysdatePipe
  ],
})
export class AngularUsestateModule {}
