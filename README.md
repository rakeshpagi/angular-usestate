# angular-usestate

Aim of this library is to reduce complexity in NGRX State Management and development time and keep the focus of the developer more on Business Logic and also to make the Application intuitive and declarative in nature by reducing excessive boilerplate.

### VERSION
Support for Angular V13+ 

### NOTE
This Library is built using NRWL/NX. 
Install Using : npm i --legacy-peer-deps angular-usestate in case Using incompatible versions. 
### Install Dependencies --legacy-peer-deps
- @ngrx/store
- @ngrx/effects
- @ngrx/entity
- @ngrx/router-store

### Pre-Requisite Setup in Root Module
- StoreModule.forRoot({})
- EffectsModule.forRoot({})
- HttpClientModule

## EXAMPLE CODE
> Create Simple Variable State
```xml
<ng-container  useState="mymessage"  [value]="'Hello World!!'" >
        Output : {{ 'mymessage'|readState|async }}
</ng-container>
```

>Create NGRX Form State 
```xml
 <form useFormState="biodataform" #form=useFormState > 
     <use-form-field name="firstname" label="First Name" ></use-form-field>
     <use-form-field name="lastname" label="Last Name"  ></use-form-field>
     <use-form-field name="birthdate"  fieldType="date" label="Birth Date" ></use-form-field>
     <use-form-field  #description name="description"  fieldType="any" label="Birth Date" >
         <textarea [formControl]="description.formControl"  >
         </textarea>
     </use-form-field>
    
     <button doPostAPIAction="savedata" [postData]="{someOtherParam:'YES'}" (actionComplete)="alert('Saved..');" >SAVE</button>
     <button (click)="form.reset()" >RESET</button>
    <hr>
     *** This will Post Data inside Form State + [postData] attribute payload to API : Amazing Ya .. 
 </form>
 FormState Output : {{'biodataform'|readState|async|json }}
```
>Create NGRX State from fetching API 
```xml
 <ng-container  useAPIState="activitydata" useEndpoint="https://www.boredapi.com/api/activity"  >
    Multiple API can be Nested 
    <ng-container  useAPIState="masters" contextName="admin" processName="getmasters" (onapiError)="myErrorHandler()" >
            <!-- This will call >  API_ENDPOINT/admin/getmasters -->        
         API Data Example :     
        {{'activitydata'|readState|async|json}}
         <hr>
         Masters : 
        {{'masters'|readState|async|json}}
    </ng-container>

     To Update Any State Variable You can do this  
     <button setSetAction="masters" [value]="SomeNewValue" ></button>

 </ng-container>
```
### UseFull Data Pipes
- sumOf
- filterArray
- filterLikeArray
- groupBy
- assignObject
- mapValue
- extendArray
 
You can specify the API-ENDPOINT in providers array : 
```javascript
    [providers]=[ {provide:API_ENDPOINT,useValue:'https://SOME-APIENDPOINT'} ]
```

## Contribute
[Github](https://github.com/rakeshpagi/angular-usestate)