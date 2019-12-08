import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private url_base = "http://192.168.0.8:8090";

  constructor(
    private http: HttpClient,
    //private storage: NativeStorage, 
    ) { 

    }

  getAlarmMomento(mac){
    return this.http.get(`${this.url_base}/api/logAPI/pumpAtThePresentMoment?mac=${mac}`);    
  }
}
