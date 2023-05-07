// import { Component,OnInit } from '@angular/core';
// import { FormGroup,FormControl,Validators } from '@angular/forms';

import { Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators,ValidatorFn, AbstractControl,ValidationErrors,NgForm,FormGroupDirective } from '@angular/forms';
import { _AbstractConstructor } from '@angular/material/core';

import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from 'src/app/auth/auth.service';

import { MatSnackBar} from '@angular/material/snack-bar';

import { HomeService } from 'src/app/services/home.service';

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
      let style = ''
      this._homeService.createHome(this.place.value.name, this.place.value.type).subscribe({
        next: (res) => {
          this.loading = false
          msg = "perf"
          style = 'success-snackbar'
          console.log(res)
        },
        error: (err) => {
          msg = err.message
          style = 'error-snackbar'
        },
        complete: () => {
          this._snackBar.open(msg, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 10 * 1000,
            panelClass: [style]
            
          });
        }
      
      })
    //   this.authService.createHome(this.place.value.name, this.place.value.type).subscribe({
    //     next: (res)=>{
    //       this.loading = false
    //       // console.log(res)

    //       // solucionar problemes actualitzar var ngIf
    //       this.cdRef.detectChanges();

    //       let msg = "Usuari creat correctament"

    //       this._snackBar.open(msg, 'X', {
    //         horizontalPosition: 'right',
    //         verticalPosition: 'top',
    //         duration: 10 * 1000,
    //         panelClass: ['success-snackbar']
            
    //       });

    //       this.tabNum = 0

    //     },
    //     error: (error)=>{
    //       let msg = "Hi ha hagut un problema"
    //       this.loading = false
    //       console.log(error)
    //       this.cdRef.detectChanges();

    //       if (error.status == 0){
    //         msg = "No s'ha pogut connectar amb el servidor"
    //       }else if (error.status == 401){
    //         msg = "Aquest email no està disponible"
    //       }else if (error.status == 500){
    //         msg = "Problema en crear usuari"
    //       }
          
    //       this._snackBar.open(msg, 'X', {
    //         horizontalPosition: 'right',
    //         verticalPosition: 'top',
    //         duration: 10 * 1000,
    //         panelClass: ['error-snackbar']
    //       });
          
    //     },
    //   })
    // }

    }
  }
}
