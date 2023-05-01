// import { Component,OnInit } from '@angular/core';
// import { FormGroup,FormControl,Validators } from '@angular/forms';

import { Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators,ValidatorFn, AbstractControl,ValidationErrors,NgForm,FormGroupDirective } from '@angular/forms';
import { _AbstractConstructor } from '@angular/material/core';

import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from 'src/app/auth/auth.service';

import { MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  public loading: boolean = false;
  place:any;

  constructor(){}

  ngOnInit(): void {
    this.place = new FormGroup({
      name: new FormControl('',[
        Validators.required,
      ])
    });
  }

  onAdd() {
    console.log("add");
    // if(this.place.valid){
    //   // console.log(this.signup.value)
    //   this.loading = true
    //   this.authService.createUser(this.signup.value.username, this.signup.value.email, this.signup.value.password).subscribe({
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

    //       // this._router.navigateByUrl('signup');
    //       // this._router.navigate(["/signup"]);
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
