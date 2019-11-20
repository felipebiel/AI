import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EventoServiceService } from '../services/eventos/evento-service.service';
import { EventoInterface } from '../interfaces/EventoInterface';
import { DeviceService } from '../services/device/device.service';
import { DeviceInterface } from '../interfaces/DeviceInterface';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-evento',
  templateUrl: 'evento.page.html',
  styleUrls: ['evento.page.scss'],
  providers: [
    EventoServiceService,
    DeviceService,
  ]
})
export class EventoPage {

  data: boolean = false;
  page_inicio: number = 1;
  public eventos: Array<EventoInterface>;
  public device: DeviceInterface;

  constructor(
    private storage: NativeStorage,
    private eventosService: EventoServiceService,
    private deviceService: DeviceService,
  ) {
  }

  ionViewDidEnter(){
    setTimeout(() => {
      //pega o id do user persistido e coloca na requisição
      this.deviceService.getDevice().subscribe(
        data => {
          this.device = (data as DeviceInterface);
          //alert(this.device.id);
          this.getEventos();
          setInterval(() => {
            this.getEventos();
          }, 3000);         
        },
        error => {
        }
      );
      this.data = true;
    }, 1000);
    
  }

  getEventos() {
    this.eventosService.getEventos(this.page_inicio, this.device.id).subscribe(
      data=>{
        this.eventos = (data as Array<EventoInterface>);
        //alert(this.eventos);
        //this.data = true;
      }
    );
  }
}
