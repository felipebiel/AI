import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EventoServiceService } from '../services/eventos/evento-service.service';
import { ClienteService } from '../services/cliente/cliente.service';

@Component({
  selector: 'app-evento',
  templateUrl: 'evento.page.html',
  styleUrls: ['evento.page.scss'],
  providers: [EventoServiceService, ClienteService]
})
export class EventoPage {

  data:boolean = false;
  page:number = 1;
    

  constructor(
    private storage: NativeStorage,
    private eventosService: EventoServiceService,
    private clienteSevice: ClienteService
    ) {
    setTimeout(() => {
      this.data = true;
      this.getEventos()
    }, 3000);
  }

  ionViewWillEnter(){
    this.storage.getItem('user').then(
      data => {
        const response = (data as any);
      },
      error => {
        console.log(error);
      }
    );

    this.clienteSevice.testeGet();
  }

  getEventos(){
    console.log(this.eventosService.getEventos(this.page));
  }

}
