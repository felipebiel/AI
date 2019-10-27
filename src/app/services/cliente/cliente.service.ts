import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url_base = "http://172.132.0.104:8090";
  //ANDERSON
  //private url_base = "http://192.168.0.16:8090";

  public logado:boolean = false;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage
  ) { }


  loginCliente(form){
    let headers = { headers: 
      {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}

    return this.http.post(this.url_base+"/token/generate-token", form);
    
  }

  loginOff(){
    return true;
  }

  testeGet(){
  
    this.http.get(this.url_base+"/api/user/lista").subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}
