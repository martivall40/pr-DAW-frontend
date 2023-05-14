import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';


@Injectable(
  { providedIn: "root" }
)
export class DeviceService{

  public host:String;

  constructor(
      private _http:HttpClient
  ){
      this.host=environment.host;
  }

  // guardar ubicacio
  createDevice(name:string, virtual:boolean, typeString:string, id:string): Observable<any>{
 
    let params = JSON.stringify({
      name: name,
      virtual: true,
      typeString: typeString
    });
    let headers = new HttpHeaders().set('Content-type','application/json')

    return this._http.post(this.host+'/api/device/create/'+id,params, {headers:headers})
  }

  getDevices(): Observable<any>{
    return this._http.get(this.host+'/api/device/all')
  }

  getDevicesByHome(id:string): Observable<any>{
    return this._http.get(this.host+'/api/device/home/'+id)
  }


  updateDevice(name:string, type:string, id:string): Observable<any>{
 
    let params = JSON.stringify({
      name: name,
      type: type
    });
    let headers = new HttpHeaders().set('Content-type','application/json')

    return this._http.put(this.host+'/api/device/'+id,params, {headers:headers})
  }

  /* getDevice(id:string): Observable<any>{
    return this._http.get(this.host+'/api/device/'+id)
  } */

  deleteDevice(id:string): Observable<any>{
    return this._http.delete(this.host+'/api/device/'+id)
  }

}