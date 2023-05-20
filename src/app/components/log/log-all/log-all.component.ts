import { Component,OnInit,ChangeDetectorRef,ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { LogService } from 'src/app/services/log.service';
// import { Home } from '../../models/home';
import { MatSnackBar} from '@angular/material/snack-bar';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-log-all',
  templateUrl: './log-all.component.html',
  styleUrls: ['./log-all.component.scss']
})
export class LogAllComponent implements OnInit {
  breakpoint: number = 1
  
  mobileQueryTitle: MediaQueryList;
  mobileQueryImg: MediaQueryList;

  public logs:any
  public type:any
  public loading:boolean = false

  dataSource: any;
  displayedColumns = ['date', 'name', 'home', 'status','deviceType', 'real'];

  private paginator: any;

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  private sort: any;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.dataSource.sort = ms;
  }

  // @ViewChild(MatPaginator) paginator:any
  // @ViewChild(MatSort) sort: any;


  private _mobileQueryListener: () => void;

  constructor(
      private changeDetectorRef: ChangeDetectorRef, 
      media: MediaMatcher,
      private _logService:LogService, 
      private _snackBar: MatSnackBar
    ) {

    this.type = {
      plug: 'Endoll',
      light: 'Llum',
      esp32: 'esp32',
    }

    // titol responsive
    this.mobileQueryTitle = media.matchMedia('(max-width: 430px)');
    this.mobileQueryImg = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryTitle.addListener(this._mobileQueryListener);
    this.mobileQueryImg.addListener(this._mobileQueryListener);

  }


  ngOnInit(){
    
    this.dataSource = new MatTableDataSource(this.logs);
    this.dataSource.sort = this.sort;
    
    this.onResize()
    this.getLogs()
  }



  applyFilter(event: any) {
    let filterValue = event.target.value
    filterValue = filterValue.trim() // treure espai en blanc
    filterValue = filterValue.toLowerCase()
    this.dataSource.filter = filterValue
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
  getLogs(){
    this.loading = true
    this._logService.getAllLogs().subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false
        this.logs = res.log
        console.log(this.logs)
        this.dataSource = new MatTableDataSource(this.logs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource)


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

