import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';


@Injectable(
  { providedIn: "root" }
)
export class LogService{

  public host:String;

  constructor(
      private _http:HttpClient
  ){
      this.host=environment.host;
  }


  getAllLogs(): Observable<any>{
    return this._http.get(this.host+'/api/log/all')
  }



  getDeviceLogs(id:string): Observable<any>{
    return this._http.get(this.host+'/api/log/device')
  }

  getProviderLogs(id:string): Observable<any>{
    return this._http.get(this.host+'/api/log/provider')
  }
}