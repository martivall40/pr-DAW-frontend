import { Component } from '@angular/core';
import { Price } from 'src/app/models/price';
import { PriceService } from 'src/app/services/price.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ImgDialogComponent } from '../../shared-components/dialog/img-dialog/img-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent {
  public price:Price | null = null

  constructor(
    private _priceService:PriceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,

  ){}

  ngOnInit() {
    this.getLastProject()
  }

  getLastProject() {
    this._priceService.getLastPrice().subscribe({
      next: (response)=>{
        // console.log(response)
        this.price = response.price[0]

      },
      error: (error)=>{
        console.error(error)
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
