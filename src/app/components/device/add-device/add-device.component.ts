import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { _AbstractConstructor } from '@angular/material/core';

import { MatSnackBar} from '@angular/material/snack-bar';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute,Router } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';

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

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _homeService:HomeService,
    private _snackBar:MatSnackBar,
    private _deviceService:DeviceService
  ){}

  ngOnInit(): void {
    this.device = new FormGroup({
      name: new FormControl('',[
        Validators.required,
      ]),
      typeString: new FormControl('',[
        Validators.required,
      ]),
      real: new FormControl(false),
      providerString: new FormControl(''),
      key: new FormControl(''),
    });



    this._route.params.subscribe(params=>{
  
      this.id=params['id']
      console.log(params)
      if(this.id == undefined) {
        this.home=false
        this.title="Error"
        this._router.navigate(['device'])
      }else{
        this.home=true
        this.title="&nbsp;Afegir dispositiu a la ubicació: ..."
        this.getHome(this.id)
      }
    })
  }

  onSubmit() {
    console.log(this.device)
    if(this.device.valid){
      console.log(this.device.value)
      this.loading = true
      let msg
      this._deviceService.createDevice(this.device.value, this.id).subscribe({
        next: (res) => {
          msg = "Afegit correctament"
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
