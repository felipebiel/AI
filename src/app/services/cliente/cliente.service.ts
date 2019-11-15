import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserInterface } from 'src/app/interfaces/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //private url_base = "http://172.132.0.104:8090";
  //ANDERSON
  private url_base = "http://172.132.0.104:8090";

  public logado:boolean = false;
  private user:UserInterface;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage
  ) { 
    this.storage.getItem('user').then(
      data => {
        this.user = (data as UserInterface);
      });
  }


  loginCliente(form){
    return this.http.post(this.url_base+"/token/generate-token", form);    
  }

  loginOff(){
    return true;   

  }

  updateUser(form){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + this.user.token,
    });
 

    const request  = {
      username: this.user.username,
      password: form.password,
      firstname: form.firstname != undefined ? form.firstname : this.user.firstname,
      lastname: form.lastname != undefined ? form.lastname : this.user.lastname,
      email: this.user.email,
      amountOfPeopleInTheResidence: parseInt(form.qtd_moradores),
      firstAccess: form.firstAccess != undefined ? form.firstAccess : 0,
      enabled: true,
    }

    /*const request  = {
      username: 'admin',
      password: form.password,
      firstname: 'FELIPE',
      lastname: 'BIEL',
      email: 'felipe@biel.com',
      amountOfPeopleInTheResidence: form.qtd_moradores,
      firstAccess: 0,
      enabled: true,

    }*/
    
    //console.log(`${this.url_base}/api/user/updateUser/1`);
    //console.log(request)
    
    return this.http.put(`${this.url_base}/api/user/updateAdmin/${this.user.id}`, request, {headers});
  }

  testeGet(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + localStorage.getItem('token'),
    });
  
    this.http.get(this.url_base+"/api/user/users/1", {headers}).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}
