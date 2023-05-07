import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

import { Home } from '../models/home';


@Injectable(
  { providedIn: "root" }
)
export class HomeService{

  public host:String;

  constructor(
      private _http:HttpClient
  ){
      this.host=environment.host;
  }

  // guardar ubicacio
  createHome(name:string, type:string): Observable<any>{
 
    let params = JSON.stringify({
      name: name,
      type: type
    });
    let headers = new HttpHeaders().set('Content-type','application/json')

    return this._http.post(this.host+'/api/home/create',params, {headers:headers})
  }
    
  // rebre tot
  getPrices():Observable<any>{
    return this._http.get(this.host+'/api/price/all')
  }

  // rebre ultim 
  getLastPrice():Observable<any>{
    return this._http.get(this.host+'/api/price/last')
  }


}