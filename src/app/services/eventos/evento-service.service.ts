import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class EventoServiceService {
  private url_base = "http://192.168.0.8:8090";

  constructor(
    private http: HttpClient,
    private storage: NativeStorage
  ) { }

  getEventos(page:number, mac){
    //EVENTO QUE BUSCA DA API OS EVENTOS
    //alert(mac);
    return this.http.get(`${this.url_base}/api/logAPI/listaLogALL?limInf=${page}&limSup=10&mac=${mac}`);  
  }
}
