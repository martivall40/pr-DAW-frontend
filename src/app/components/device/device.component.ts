import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

import { DeviceService } from 'src/app/services/device.service';
import { HomeService } from 'src/app/services/home.service';
// import { Device } from '../../models/device';
import { MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  breakpoint: number = 1

  mobileQueryTitle: MediaQueryList;
  mobileQueryImg: MediaQueryList;
  
  public id:string=""
  public title:string = ""
  public home:any = null
  // public devices:Array<Devices>=[]
  public devices:any=[]
  public img:any
  public loading:boolean = true
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private _route:ActivatedRoute,private _deviceService:DeviceService, private _snackBar: MatSnackBar,private _homeService:HomeService) {
    // titol responsive
    this.mobileQueryTitle = media.matchMedia('(max-width: 430px)');
    this.mobileQueryImg = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryTitle.addListener(this._mobileQueryListener);
    this.mobileQueryImg.addListener(this._mobileQueryListener);
  }

  ngOnInit(){
    this.onResize()

    this.img = {
      Plug: '../../../assets/img/place/home.jpg',
      plug: '../../../assets/img/place/home.jpg',
    }

    this._route.params.subscribe(params=>{
  
      this.id=params['id']
      console.log(params)
      if(this.id == undefined) {
        this.home=false
        this.title="Tots els dispositius"
        this.getAllDevices()
      }else{
        this.home=true
        this.title="Dispositius de la ubicació: ..."
        this.getHome(this.id)
        this.getDevicesByHomeId(this.id)
      }
    })
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


  // agafar tots els dispositius
  getAllDevices(){
    this.loading = true
    this._deviceService.getDevices().subscribe({
      next: (res) => {
        this.loading = false
        this.devices = res.device
        console.log(this.devices)
      },

      error: (error) => {
        this.loading = false
        let msg = error.message
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

  // agafar tots els dispositius de la ubicacio
  getDevicesByHomeId(id:string){
    this.loading = true
    this._deviceService.getDevicesByHome(id).subscribe({
      next: (res) => {
        this.loading = false
        this.devices = res.device
        console.log(this.devices)
      },

      error: (error) => {
        this.loading = false
        let msg = error.message
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

  getHome(id: string){
    this._homeService.getHome(id).subscribe({
      next: (res) => {
        this.home = res.home[0]
        this.title = `Dispositius de la ubicació: <b>${this.home.name}</b>`
        // console.log(res)
      },

      error: (error) => {
        let msg = error.message
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
