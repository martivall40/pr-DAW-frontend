import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  breakpoint: number = 1

  constructor(private _router: Router){}

  ngOnInit(){
    this.onResize()

  }

  onResize(event:Event|null=null) {
    const target:Event|any = event ? event.target : window
  
    if (target.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if (target.innerWidth >= 600) {
      this.breakpoint = 1;
    } else {
      this.breakpoint = 1;
    }
  
  }

  addPlace(){
    this._router.navigate(['/add-place']);
  }

  onClick(url:string){
    this._router.navigate([url]);
  } 
}
