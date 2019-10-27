import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EventoServiceService } from '../services/eventos/evento-service.service';

@Component({
  selector: 'app-evento',
  templateUrl: 'evento.page.html',
  styleUrls: ['evento.page.scss'],
  providers: [EventoServiceService]
})
export class EventoPage {

  data:boolean = false;
  page:number = 1;

  constructor(
    private storage: NativeStorage,
    private eventosService: EventoServiceService
    ) {
    setTimeout(() => {
      this.data = true;
      this.getEventos()
    }, 3000);
  }

  ionViewWillEnter(){
    localStorage.getItem('token');
  }

  getEventos(){
    console.log(this.eventosService.getEventos(this.page));
  }

}
