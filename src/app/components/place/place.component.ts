import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { HomeService } from 'src/app/services/home.service';
import { Home } from '../../models/home';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  breakpoint: number = 1
  
  mobileQueryTitle: MediaQueryList;
  mobileQueryImg: MediaQueryList;

  public homes:Array<Home>=[]
  public img:any
  public loading:boolean = true


  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private _homeService:HomeService, private _snackBar: MatSnackBar) {
    

    // titol responsive
    this.mobileQueryTitle = media.matchMedia('(max-width: 430px)');
    this.mobileQueryImg = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryTitle.addListener(this._mobileQueryListener);
    this.mobileQueryImg.addListener(this._mobileQueryListener);
  }


  ngOnInit(){
    this.img = {
      Home: '../../../assets/img/place/home.jpg',
      Bedroom: '../../../assets/img/place/b2.jpg',
      Roof: '../../../assets/img/place/roof.jpg',
      Room: '../../../assets/img/place/room.jpg',
      Garage: '../../../assets/img/place/garage.png',
      Garden: '../../../assets/img/place/garden.jpg',
      Kitchen: '../../../assets/img/place/Kitchen.jpg',
    }
    this.onResize()
    this.getHomes()
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

  // agafar tots les ubicacions
  getHomes(){
    this.loading = true
    this._homeService.getHomes().subscribe({
      next: (res) => {
        this.loading = false
        this.homes = res.home
        console.log(this.homes)
      },

      error: (error) => {
        this.loading = false
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