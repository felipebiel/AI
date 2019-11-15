import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { ClienteService } from '../services/cliente/cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserInterface } from '../interfaces/UserInterface';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
  providers: [ClienteService]
})

export class MeusDadosPage {

  fGroup: FormGroup;

  progresso: boolean = true;
  firstname_request = false;
  firstname_message = "";
  lastname_request = false;
  lastname_message = "";

  private user: UserInterface;

  constructor(
    public navController: NavController,
    private clienteService: ClienteService,
    private fBuilder: FormBuilder,
    private storage: NativeStorage,
    public toastController: ToastController,
    public alertController: AlertController
  ) {

    this.storage.getItem('user').then(
      data => {
        this.user = (data as UserInterface);
      });

    //iniciano o objeto FormGroup, com suas validações
    this.fGroup = this.fBuilder.group({
      'username': [null, Validators.compose([
        Validators.required,
      ])],
      'email': [null, Validators.compose([
        Validators.required,
      ])],
      'firstname': [null, Validators.compose([
        Validators.required,
      ])],
      'lastname': [null, Validators.compose([
        Validators.required,
      ])],
      'cpf': [null, Validators.compose([
        Validators.required,
      ])]
    });
  }

  async presentAlertConfirm(msg) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: msg,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.redefinirSenha();
          }
        }
      ]
    });

    await alert.present();
  }

  redefinirSenha(){
    this.clienteService.updateUser({firstAccess: 1}).subscribe(
      data => {
        this.logout();
      },
      error => {
       console.error(error);
      }
    );
  }

  confirmRedefinirSenha(){
    this.presentAlertConfirm('Para redefinir a senha é necessário saber a senha atual. Tem certeza que deseja fazer essa ação?');
  }

  logout(){
    //console.log("SAINDO");
    this.storage.remove("token");
    this.storage.remove("user");
    this.navController.navigateRoot('/login');
  }

  ionViewDidEnter() {

    this.firstname_request = false;
    this.firstname_message = "";
    this.lastname_request = false;
    this.lastname_message = "";

    
    this.fGroup.controls.username.setValue(this.user.username);
    this.fGroup.controls.email.setValue(this.user.email);
    this.fGroup.controls.firstname.setValue(this.user.firstname);
    this.fGroup.controls.lastname.setValue(this.user.lastname);
    this.fGroup.controls.cpf.setValue(this.user.cpf);

    this.progresso = false;
  }

  goToTabs() {
    this.navController.navigateRoot('/tabs');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Salvo com sucesso.',
      duration: 4000,
      position: 'bottom',
    });
    toast.present();
  }



  alterarUser() {
    this.tratarErros();
    if (this.fGroup.valid) {
      this.clienteService.updateUser(this.fGroup.value).subscribe(
        data => {
          
          this.presentToast();

          //depois de alterar o user troca o user do localstorange

          const response = (data as any);
          this.storage.setItem('user', response);

        },
        error => {
         console.error(error);
        }
      );
    }
  }

  tratarErros() {
    this.firstname_request = false;
    this.lastname_request = false;

    //console.log(this.fGroup.controls.password.errors.minlength != undefined);

    if (this.fGroup.controls.firstname.errors) {
      if (this.fGroup.controls.firstname.errors.required) {
        this.firstname_request = true;
        this.firstname_message = "Campo é obrigatório";
      }
    }

    if (this.fGroup.controls.lastname.errors) {
      if (this.fGroup.controls.lastname.errors.required) {
        this.lastname_request = true;
        this.lastname_message = "Campo é obrigatório";
      }
    }
  }


}
