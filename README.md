# angular-usestate

Aim of this library is to reduce complexity in NGRX State Management and development time and keep the focus of the developer more on Business Logic and also to make the Application intuitive and declarative in nature by reducing excessive boilerplate.

### VERSION
Support for Angular V13+ 

### NOTE
This Library is built using NRWL/NX 

## EXAMPLE CODE
> Create Simple Variable State
```xml
<ng-container  useState="mymessage"  [value]="Hello World!!" >
        Output : {{ 'mymessage'|readState|async }}
</ng-container>
```

>Create NGRX Form State 
```xml
 <form useFormState="biodataform">
     <use-form-field name="firstname" label="First Name" ></use-form-field>
     <use-form-field name="lastname" label="Last Name"  ></use-form-field>
     <use-form-field name="birthdate"  fieldType="date" label="Birth Date" ></use-form-field>

     <button doPostAPIAction="savedata" >SAVE</button>
     This will Post Data inside Form to API 
 </form>
 FormState Output : {{'biodataform'|readState|async|json }}
```
>Create NGRX State from fetching API 
```xml
 <ng-container  useAPIState="activitydata" useEndpoint="https://www.boredapi.com/api/activity"  >
    {{'activitydata'|readState|async|json}}
 </ng-container>
```
You can specify the API-ENDPOINT in providers array : 
```javascript
    [providers]=[ {provide:API_ENDPOINT,useValue:'https://SOME-APIENDPOINT'} ]
```

> 