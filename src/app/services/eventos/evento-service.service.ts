import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class EventoServiceService {

  constructor(
    //private http: HttpClient,
    private storage: NativeStorage
  ) { }

  getEventos(page:number ){
    //EVENTO QUE BUSCA DA API OS EVENTOS
    return page;
  }
}
