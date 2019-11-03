import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private url_base = "http://172.132.0.104:8090";

  constructor(
    private http: HttpClient
  ) { }

  getDevice(id){
    let headers = { headers: 
      {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}

    return this.http.get(`${this.url_base}/api/device/deviceByUserId/${id}`);
    
  }

  teste(){
    return true;
  }
}
