import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { _AbstractConstructor } from '@angular/material/core';

import { HomeService } from 'src/app/services/home.service';
import { MatSnackBar} from '@angular/material/snack-bar';

import { ActivatedRoute } from '@angular/router';

// import { DeviceService } from 'src/app/services/device.service';
// import { Device } from '../../models/device';

@Component({
  selector: 'app-config-place',
  templateUrl: './config-place.component.html',
  styleUrls: ['./config-place.component.scss']
})
export class ConfigPlaceComponent implements OnInit {
  public loading: boolean = false;
  place:any;

  public id:string=""
  public home:any = null

  public title:string ="&nbsp;Configurar la ubicació: ..."

  constructor(
    private _homeService:HomeService,
    private _snackBar: MatSnackBar,
    private _router:Router,
    private _route:ActivatedRoute,


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

    this._route.params.subscribe(params=>{
  
      this.id=params['id']
      console.log(params)
      if(this.id != undefined) {
        this.home=true
        this.getHome(this.id)
      }

    })
  }

  onSubmit() {
    if(this.place.valid){
      console.log(this.place.value)
      this.loading = true
      let msg = ''
      this._homeService.updateHome(this.place.value.name, this.place.value.type, this.id).subscribe({
        next: (res) => {
          msg = "Actualitzat correctament"
          console.log(res)

          this._snackBar.open(msg, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 10 * 1000,
            panelClass: ['success-snackbar']
          });

          this._router.navigate(["/device/"+this.id]);
        },
        error: (error) => { 
          this.loading = false
          msg = error.error.message
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

  getHome(id: string){
    this._homeService.getHome(id).subscribe({
      next: (res) => {
        this.home = res.home[0]
        this.title = `&nbsp;Configurar la ubicació: <b>${this.home.name}</b>`
        this.place.controls.name.setValue(this.home.name);
        this.place.controls.type.setValue(this.home.type);

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

  onDelete(){
    // alert("a")
    console.log("aixo")


    /* this._homeService.deleteHome(this.id).subscribe({
      next: (res) => {
        this.home = res.home[0]
        this.title = `&nbsp;Configurar la ubicació: <b>${this.home.name}</b>`
        this.place.controls.name.setValue(this.home.name);
        this.place.controls.type.setValue(this.home.type);

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
    }) */
  }

}
