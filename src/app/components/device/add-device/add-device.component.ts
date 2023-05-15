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
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  public loading: boolean = false;
  device:any;
  public id:any = undefined
  public home:any = null
  public title:string = "&nbsp;Afegir dispositiu a la ubicació ..."
  public provider:string|null = null

  constructor(private _route:ActivatedRoute,private _homeService:HomeService,private _snackBar:MatSnackBar){}

  ngOnInit(): void {
    this.device = new FormGroup({
      name: new FormControl('',[
        Validators.required,
      ]),
      typeString: new FormControl('',[
        Validators.required,
      ]),
      real: new FormControl(''),
      providerString: new FormControl(''),
      key: new FormControl(''),
    });



    this._route.params.subscribe(params=>{
  
      this.id=params['id']
      console.log(params)
      if(this.id == undefined) {
        this.home=false
        this.title="Tots els dispositius"
      }else{
        this.home=true
        this.title="Dispositius de la ubicació: ..."
        this.getHome(this.id)
      }
    })
  }

  onSubmit() {
    if(this.device.valid){
      console.log(this.device.value)
      // this.loading = true
      // this.authService.createUser(this.device.value.username, this.device.value.email, this.device.value.password).subscribe({
      //   next: (res)=>{
      //     this.loading = false
      //     // console.log(res)

      //     // solucionar problemes actualitzar var ngIf
      //     this.cdRef.detectChanges();

      //     let msg = "Usuari creat correctament"

      //     this.private .open(msg, 'X', {
      //       horizontalPosition: 'right',
      //       verticalPosition: 'top',
      //       duration: 10 * 1000,
      //       panelClass: ['success-snackbar']
            
      //     });

      //     this.tabNum = 0

      //   },
      //   error: (error)=>{
      //     let msg = "Hi ha hagut un problema"
      //     this.loading = false
      //     console.log(error)
      //     this.cdRef.detectChanges();

      //     if (error.status == 0){
      //       msg = "No s'ha pogut connectar amb el servidor"
      //     }else if (error.status == 401){
      //       msg = "Aquest email no està disponible"
      //     }else if (error.status == 500){
      //       msg = "Problema en crear usuari"
      //     }
          
      //     this.private .open(msg, 'X', {
      //       horizontalPosition: 'right',
      //       verticalPosition: 'top',
      //       duration: 10 * 1000,
      //       panelClass: ['error-snackbar']
      //     });
          
        // },
      // })
    }

  }

  onChangeProvider(value:any){
    // console.log(this.device.value.providerString)
    this.provider = this.device.value.providerString
  }

  getHome(id: string){
    this._homeService.getHome(id).subscribe({
      next: (res) => {
        this.home = res.home[0]
        this.title = `&nbsp;Afegir dispositiu a la ubicació: <b>${this.home.name}</b>`
        // console.log(res)
      },

      error: (error) => {
        let msg = error.error.message
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
