import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { _AbstractConstructor } from '@angular/material/core';

import { HomeService } from 'src/app/services/home.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  public loading: boolean = false;
  place:any;

  constructor(
    private _homeService:HomeService,
    private _snackBar: MatSnackBar,
    private _router:Router

  ){}

  ngOnInit(): void {
    this.place = new FormGroup({
      name: new FormControl('',[
        Validators.required,
      ]),
      type: new FormControl('',[
        Validators.required,
      ])
    });
  }

  onSubmit() {
    if(this.place.valid){
      console.log(this.place.value)
      this.loading = true
      let msg = ''
      this._homeService.createHome(this.place.value.name, this.place.value.type).subscribe({
        next: (res) => {
          msg = "Afegit correctament"
          console.log(res)

          this._snackBar.open(msg, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 10 * 1000,
            panelClass: ['success-snackbar']
          });

          this._router.navigate(["/place"]);
        },
        error: (error) => { 
          this.loading = false
          msg = error.message
          if (error.status == 0){
            msg = "No s'ha pogut connectar amb el servidor"
          }
          this._snackBar.open(msg, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 10 * 1000,
            panelClass: ['error-snackbar']
          });
        }
      
      })

    }
  }


}
