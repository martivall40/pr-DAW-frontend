import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent {

  constructor(private _router: Router){}


  addPlace(){
    this._router.navigate(['/add-place']);

  }
}
