import { Component,OnInit } from '@angular/core';

import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  breakpoint: number = 1

  userIsAuthenticated:boolean = false;
  private authListenerSubs: Subscription = new Subscription

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.onResize()

    this.authService.autoAuthUser();

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onResize(event:Event|null=null) {
    const target:Event|any = event ? event.target : window

    if (target.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if (target.innerWidth >= 600) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 2;
    }

  }


  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }


}

