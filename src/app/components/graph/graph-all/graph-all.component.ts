import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Price } from 'src/app/models/price';
import { PriceService } from 'src/app/services/price.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ImgDialogComponent } from '../../shared-components/dialog/img-dialog/img-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-graph-all',
  templateUrl: './graph-all.component.html',
  styleUrls: ['./graph-all.component.scss']
})
export class GraphAllComponent implements OnInit {
  public prices:Array<Price> | null = null
  public loading:boolean = true

  public height:string = '450px';
  breakpoint: number = 1

  mobileQueryTitle: MediaQueryList;
  mobileQueryImg: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private _priceService:PriceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,

  ){

    // titol responsive
    this.mobileQueryTitle = media.matchMedia('(max-width: 430px)');
    this.mobileQueryImg = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryTitle.addListener(this._mobileQueryListener);
    this.mobileQueryImg.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getPrices()
    this.onResize()

  }

  onResize(event:Event|null=null) {
    const target:Event|any = event ? event.target : window

    if (target.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if (target.innerWidth <= 1000) {
      this.breakpoint = 2;
      this.height = `300px`
    } else if (target.innerWidth <= 1600) {
      this.breakpoint = 2;
      this.height = `350px`
    } else if (target.innerWidth <= 2000) {
      this.breakpoint = 2;
      this.height = `450px`
    }else if (target.innerWidth >= 2300) {
      this.breakpoint = 2;
      this.height = `550px`
    }else {
      this.breakpoint = 2;
    }

    console.log(target.innerHeight, target.innerWidth)

  }

  getPrices() {
    this.loading = true
    this._priceService.getPrices().subscribe({
      next: (response)=>{
        console.log(response)
        this.prices = response.price
        this.loading = false

      },
      error: (error)=>{
        console.error(error)
        this.loading = false
        let msg = "Hi ha hagut un problema"

        if (error.status == 0){
          msg = "No s'ha pogut connectar amb el servidor"
        }
        
        this._snackBar.open(msg, 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 10 * 1000,
          panelClass: ['error-snackbar']
        });
      },
    })
  }

  openDialog(image:string){
    // this.dialog.open(ImgDialogComponent, { data: { image } })

    const dialogRef = this.dialog.open(ImgDialogComponent, {
      data: { image },
    });
  }
}
