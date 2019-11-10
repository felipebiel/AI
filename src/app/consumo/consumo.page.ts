import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.page.html',
  styleUrls: ['./consumo.page.scss'],
})
export class ConsumoPage {
  @ViewChild('barChart', { static: false }) barChart;

  bars: any;
  colorArray: any;
  dias = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  listrosDia = [900, 850, 500, 30, 720, 350, 2000, 1000, 250, 850, 900, 1100, 1350, 959, 450, 3000, 1000, 600, 700, 230, 5690, 364, 874, 989, 987, 987, 1000, 1230, 351, 2200];
  constructor() { }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {


    let ctx = this.barChart.nativeElement;
    ctx.height = 380;
    //ctx.width = 900;
    //this.barChart.nativeElement
    this.bars = new Chart(ctx, {
      type: 'line',
      data: {
        //AQUI SERIA OS MESES
        labels: this.dias,
        datasets: [{
          label: 'Litros por dia',
          //AQUI SERIA OS LITROS
          data: this.listrosDia,
          backgroundColor: 'rgba(0,0,0,0)', 
          borderColor: 'rgb(23, 69, 128)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
        }
      }
    });
  }

}
