import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DeviceService } from '../services/device/device.service';
import { DeviceInterface } from '../interfaces/DeviceInterface';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.page.html',
  styleUrls: ['./consumo.page.scss'],
  providers: [DeviceService]
})
export class ConsumoPage {
  @ViewChild('barChart', { static: false }) barChart;

  bars: any;
  colorArray: any;
  dias:any = [];
  litrosDias:any = [];
  qtdDias = "...";

  private device: DeviceInterface;

  constructor(
    private deviceService: DeviceService,
    ) { }

  ionViewDidEnter() {
    
    setTimeout(() => {
      this.getConsumo();
     
    }, 1000);

    
  }

  getConsumo(){
    this.deviceService.getDevice().subscribe(
      data => {
        //alert(this.user.id);
        this.device = (data as DeviceInterface);
        //alert(this.device.id);
        //pega o ultimo log com o id do device
        this.deviceService.getConsumo30Dias(this.device.id).subscribe(
          data2 =>{
            //alert(data2);
            const diasTemp = [];
            const litrosTemp = []
              Object.keys(data2).forEach(function(key,index) {
                const dia = new Date(key);                
                diasTemp.push(dia.getDate().toString());
                litrosTemp.push(parseFloat(data2[key].replace(",", ".")));
              });
              this.dias = diasTemp;
              this.litrosDias = litrosTemp;
              this.createBarChart();
          },
          error2 =>{
          }
        )
      },
      error => {
      }
    );
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
          data: this.litrosDias,
          backgroundColor: 'rgba(23, 69, 128, 0.6)', 
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
