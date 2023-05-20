import { Component,OnInit } from '@angular/core';
import { PriceService } from 'src/app/services/price.service';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-graph-average',
  templateUrl: './graph-average.component.html',
  styleUrls: ['./graph-average.component.scss']
})
export class GraphAverageComponent implements OnInit{

  dataPoints:any = [];
  chart:any;
  public chartOptions:any
  
 
  constructor(private _priceService:PriceService,private _snackBar: MatSnackBar,) {  
  }
 
  ngOnInit(): void {

    this.chartOptions = {
      theme: "light2",
      zoomEnabled: true,
      exportEnabled: true,
      animationEnabled: true,

      title: {
        text:"Historial preu electricitat"
      },
      subtitles: [{
        text: "Loading Data...",
        fontSize: 24,
        horizontalAlign: "center",
        verticalAlign: "center",
        dockInsidePlotArea: true
      }],
      axisY: {
        title: "c€/KWh",
        prefix: "€"
      },
      data: [{
        type: "line",
        name: "Closing Price",
        yValueFormatString: "$#,###.00",
        xValueType: "dateTime",
        dataPoints: this.dataPoints
      }]
    }

    this.getPrices()
  }
  
 
  getChartInstance(chart: object) {
    this.chart = chart;
  }

  
  getPrices() {
    this._priceService.getPrices().subscribe({
      next: (response)=>{
        console.log(response)
        // this.prices = response.price
          console.log(response)
          let data = response.price;
          for(let i = 0; i < data.length; i++){
            this.dataPoints.push({x: new Date(data[i].date), y: Number(data[i].avg) });
          }
          this.chart.subtitles[0].remove();

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
    });
  }
}   
