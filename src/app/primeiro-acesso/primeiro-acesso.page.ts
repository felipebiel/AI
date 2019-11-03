import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, MenuController } from '@ionic/angular';
import { QtdMoradoresPage } from '../help/qtd-moradores/qtd-moradores.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente/cliente.service';


@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.page.html',
  styleUrls: ['./primeiro-acesso.page.scss'],
  providers: [ClienteService]
})
export class PrimeiroAcessoPage {


  progresso: boolean = false;
  password_request = false;
  password_message = "";
  password_confirm_request = false;
  password_confirm_message = "";
  qtd_moradores_request = false;
  qtd_moradores_message = "";
  //variaveis de erro

  fGroup: FormGroup;

  constructor(
    public modalController: ModalController,
    public navController: NavController,
    private menuCtrl: MenuController,
    private fBuilder: FormBuilder,
    private clienteService: ClienteService,
  ) {

    //iniciano o objeto FormGroup, com suas validações
    this.fGroup = this.fBuilder.group({
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      'password_confirm': [null, Validators.compose([
        Validators.required,
      ])],
      'qtd_moradores': [null, Validators.compose([
        Validators.required,
      ])]
    });
  }



  async helpMoradores() {
    const modal = await this.modalController.create({
      component: QtdMoradoresPage
    });
    return await modal.present();
  }

  ionViewWillEnter() {
    //desabilita o side menu no login
    this.menuCtrl.enable(false);
  }

  prosseguir() {
    this.tratarErros();
    //console.log(this.fGroup.value.password);

    if (this.fGroup.valid) {
      this.progresso = !this.progresso;

      setTimeout(() => {

        this.clienteService.updateUser(this.fGroup.value).subscribe(
          data => {
            console.log(data);
            this.progresso = !this.progresso;
            this.menuCtrl.enable(true);
            //antes de redirecionar faz o login novamente para pegar o novo token com a senha mudada
            //this.navController.navigateRoot('/tabs');
            this.navController.navigateRoot('/tabs');
          },
          error => {
            console.error(error);
          }
        );
      }, 1000);
    }

  }

  tratarErros() {
    this.password_request = false;
    this.qtd_moradores_request = false;
    this.password_confirm_request = false;
    //se tiver erro de usuario

    //console.log(this.fGroup.controls.password.errors.minlength != undefined);

    if (this.fGroup.controls.password.errors) {
      if (this.fGroup.controls.password.errors.required) {
        this.password_request = true;
        this.password_message = "Campo é obrigatório";
      }

      if (this.fGroup.controls.password.errors.minlength != undefined) {

        this.password_request = true;
        this.password_message = "O campo deve ter no minimo 5 caracteres";
      }
    }

    if (this.fGroup.controls.password_confirm.errors) {
      if (this.fGroup.controls.password_confirm.errors.required) {
        this.password_confirm_request = true;
        this.password_confirm_message = "As senhas não conferem";
      }
    }
    //se tiver erro de senha
    if (this.fGroup.controls.qtd_moradores.errors) {
      if (this.fGroup.controls.qtd_moradores.errors.required) {
        this.qtd_moradores_request = true;
        this.qtd_moradores_message = "Campo é obrigatório";
      }
    }

    if (this.fGroup.value.password != this.fGroup.value.password_confirm) {
      this.password_confirm_request = true;
    }
  }

}
