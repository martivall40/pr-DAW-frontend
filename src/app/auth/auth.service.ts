import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"
import { Subject } from "rxjs"
import { Observable } from 'rxjs';


import { AuthData } from "./auth-data.model"

import { environment } from "../environments/environment"

@Injectable({ providedIn: "root" })
export class AuthService {
  host = environment.host

    private isAuthenticated = false
    private token: string = ''
    private tokenTimer:any
    private authStatusListener = new Subject<boolean>()

    constructor(
      private http: HttpClient, 
      private router: Router,
      ){}



    getToken() {
        return this.token;
    }

    setToken(token:string) {
      this.token = token;
  }

    getIsAuth() {
        return this.isAuthenticated;
    }


    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }


    // registrar usuari
    createUser(username: string, email: string, password: string):Observable<any>{
      const authData: AuthData = { username: username, email: email, password: password }
        return this.http
            .post(this.host+"/api/user/signup", authData)
            
    }


    // loguejar usuari
    loginCall(email: string, password: string):Observable<any>{
      const authData = { email: email, password: password };
      return this.http
        .post<{ token: string; expiresIn: number }>(
            this.host+"/api/user/login",
            authData
        )
        
    }

    login(response:any){
      const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      console.log(expirationDate);
      this.saveAuthData(this.token, expirationDate);
      this.router.navigate(["/"]);
    }



    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
          this.token = authInformation.token;
          this.isAuthenticated = true;
          this.setAuthTimer(expiresIn / 1000);
          this.authStatusListener.next(true);
        }
      }
    
      logout() {
        this.token = '';
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/signup"]);
      }
    
      private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
      }
    
      private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
      }
    
      private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
      }
    
      private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if (!token || !expirationDate) {
          return;
        }
        return {
          token: token,
          expirationDate: new Date(expirationDate)
        }
      }
}
