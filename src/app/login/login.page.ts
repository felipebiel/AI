import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente/cliente.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserInterface } from '../interfaces/UserInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ClienteService]
})
export class LoginPage implements OnInit {

  progresso: boolean = false;
  //variaveis de erro
  usuario_request = false;
  senha_request = false;
  login_request = false;

  user: UserInterface;

  fGroup: FormGroup;

  constructor(
    public navController: NavController,
    private fBuilder: FormBuilder,
    private clienteService: ClienteService,
    private storage: NativeStorage,
    private menuCtrl: MenuController
  ) {
    //iniciano o objeto FormGroup, com suas validações
    this.fGroup = this.fBuilder.group({
      'username': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required,
      ])]
    });

    
  }

  ngOnInit() {
    //this.clienteService.testeGet();
  }

  //É acionado ao entrar em uma página antes de se tornar a ativa
  ionViewDidEnter() {

    this.storage.getItem('user').then(
      data => {
        this.user = (data as UserInterface);
        let token = this.user.token;
        //console.log(token);
        if (token != null) {
          //habilita o menu novamente ao redirecionar
          this.menuCtrl.enable(true);
          this.navController.navigateRoot('/tabs');
        }
    });
    //alert();
    //desabilita o side menu no login
    this.menuCtrl.enable(false);   

  }

  login() {
    this.tratarErros();
    //se não tiver erro
    if (this.fGroup.valid) {
      this.progresso = !this.progresso;

      this.clienteService.loginCliente(this.fGroup.value).subscribe(
        data => {
          console.log(data);
          this.user = (data as UserInterface);
          //se login OK salva no storange o token e retorna true
          const response = (data as any);
          this.storage.setItem('token', response.token);
          localStorage.setItem('token', response.token);
          this.storage.setItem('user', response);

          if (this.user.firstAccess == 1) {
            this.navController.navigateRoot('/primeiro-acesso');
          } else {

            this.navController.navigateRoot('/tabs');
          }
          //
          this.progresso = !this.progresso;
        },
        error => {
          this.login_request = true;
          this.progresso = !this.progresso;
        }
      );
    }
  }

  loginOff() {

    //feito para simular o login sem acesso
    this.tratarErros();
    //se não tiver erro
    if (this.fGroup.valid) {
      this.progresso = !this.progresso;
      if (this.clienteService.loginOff()) {
        setTimeout(() => {
          this.storage.setItem('token', 'TOKEN DE TESTE LA LA LA');
          this.progresso = !this.progresso;
          //habilita o menu ao redirecionar
          this.menuCtrl.enable(true);
          this.navController.navigateRoot('/tabs');
          //this.navController.navigateRoot('/primeiro-acesso');
        }, 2000);
      }
    }

  }

  tratarErros() {
    this.usuario_request = false;
    this.senha_request = false;
    this.login_request = false;
    //se tiver erro de usuario
    if (this.fGroup.controls.username.errors) {
      if (this.fGroup.controls.username.errors.required) {
        this.usuario_request = true;
      }
    }
    //se tiver erro de senha
    if (this.fGroup.controls.password.errors) {
      if (this.fGroup.controls.password.errors.required) {
        this.senha_request = true;
      }
    }
  }

}
