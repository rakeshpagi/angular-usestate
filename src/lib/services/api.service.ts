import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../constants';


@Injectable({providedIn: 'root'})
export class NgrxApiService {
    constructor(private http: HttpClient,@Optional() @Inject(API_ENDPOINT) private endpoint:string ) {

     }
    
    getAPI(  contextName:string, replaceEndpoint:string|undefined,  service:string|undefined,params:any):Observable<any>{
        return this.http.get(`${ replaceEndpoint? replaceEndpoint:this.endpoint||''}${contextName?'/'+contextName:''}/${service?'/'+service:''}`,
        {params})
    }
    postAPI(replaceEndpoint:string|undefined, 
        contextName:string|undefined, service:string|undefined,postData:any):Observable<any>{
        return this.http.post(`${replaceEndpoint? replaceEndpoint:this.endpoint||''}${contextName?'/'+contextName:''}${service?'/'+service:''}`,postData)
   }

}