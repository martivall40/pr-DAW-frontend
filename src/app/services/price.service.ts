import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
// import { Global } from './global';



@Injectable(
  { providedIn: "root" }
)
export class PriceService{

  public host:String;

  constructor(
      private _http:HttpClient
  ){
      this.host=environment.host;
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