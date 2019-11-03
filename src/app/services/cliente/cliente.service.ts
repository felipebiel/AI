import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //private url_base = "http://172.132.0.104:8090";
  //ANDERSON
  private url_base = "http://172.132.0.104:8090";

  public logado:boolean = false;
  private token;
  private id;
  private username;
  private password;
  private firstname;
  private lastname;
  private email;
  private enabled;
  private adress;
  private amountOfPeopleInTheResidence;
  private firstAccess;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage
  ) { 
    this.storage.getItem('user').then(
      data => {
        const response = (data as any);
        this.id = response.id;
        this.username = response.username;
        this.email = response.email;
        this.firstname = response.firstname;
        this.lastname = response.lastname;
        this.enabled = response.enabled;
      });
  }


  loginCliente(form){
    let headers = { headers: 
      {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}

    return this.http.post(this.url_base+"/token/generate-token", form);
    
  }

  loginOff(){
    return true;   

  }

  updateUser(form){
    ///api/user/updateUser/1
    //console.log(form);

    //this.storage.getItem('token').then(data => this.token = data)

    this.token = localStorage.getItem('token');
    console.log(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + this.token,
    });
 

    const request  = {
      username: this.username,
      password: form.password,
      firstname: form.firstname != undefined ? form.firstname : this.firstname,
      lastname: form.lastname != undefined ? form.lastname : this.lastname,
      email: this.email,
      amountOfPeopleInTheResidence: parseInt(form.qtd_moradores),
      firstAccess: 0,
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
    
    return this.http.put(`${this.url_base}/api/user/updateAdmin/${this.id}`, request, {headers});
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
