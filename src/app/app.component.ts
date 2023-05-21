import { Component,ChangeDetectorRef,OnDestroy,OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Subscription } from "rxjs";

import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy  {
  title = 'pr-DAW-frontend';

  userIsAuthenticated:boolean = false;
  private authListenerSubs: Subscription = new Subscription

  mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;

  constructor(private authService: AuthService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    // nav responsive
    this.mobileQuery = media.matchMedia('(max-width: 870px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
