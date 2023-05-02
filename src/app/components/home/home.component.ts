import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  breakpoint: number = 1
  constructor(private _router: Router,) {}

  ngOnInit() {
    this.onResize()
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

  onClick(url:string){
    this._router.navigate([url]);
    
  }
}

