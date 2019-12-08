import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserInterface } from 'src/app/interfaces/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private url_base = "http://192.168.0.8:8090";
  private user: UserInterface;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
  ) {
    this.storage.getItem('user').then(
      data => {
        this.user = (data as UserInterface);
      });
  }

  getDevice() {
    return this.http.get(`${this.url_base}/api/device/deviceByUserId/${this.user.id}`);
  }

  updateDevice(id, form) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user.token,
    });


    const request = {
      autoMode: form.modo,
      idCont: 0,
      levelForActingAuto: form.nivel,
      reservoirCapacity: form.reservoirCapacity,
    }


    return this.http.put(`${this.url_base}/api/device/update/${id}`, request);
  }

  getLevelAtMoment(mac){
    return this.http.get(`${this.url_base}/api/logAPI/levelAtThePresentMoment?mac=${mac}`);
  }

  getPumpAtMoment(mac){
    return this.http.get(`${this.url_base}/api/logAPI/pumpAtThePresentMoment?mac=${mac}`);
  }

  getContraSecoAtMoment(mac){
    return this.http.get(`${this.url_base}/api/logAPI/contraSecoAtThePresentMoment?mac=${mac}`);
  }

  teste() {
    return true;
  }

  commandDevice(mac, comando) {
    //alert(`${this.url_base}/api/APP/writeComand?comando=${comando}&mac=${mac}`);
    ///api/APP/writeComand?comando=B0&mac=de%3A4f%3A22%3A36%3A99%3A18"
    return this.http.get(`${this.url_base}/api/APP/writeComand?comando=${comando}&mac=${mac}`);
  }

  getConsumo30Dias(mac){
    ///api/APP/getStatisticLast30Days?mac=
    return this.http.get(`${this.url_base}/api/APP/getStatisticLast30Days?mac=${mac}`);
  }
}
