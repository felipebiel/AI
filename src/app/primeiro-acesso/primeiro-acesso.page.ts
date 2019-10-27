import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, MenuController } from '@ionic/angular';
import { QtdMoradoresPage } from '../help/qtd-moradores/qtd-moradores.page';


@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.page.html',
  styleUrls: ['./primeiro-acesso.page.scss'],
})
export class PrimeiroAcessoPage implements OnInit {


  progresso:boolean = false;
  //variaveis de erro


  constructor(
    public modalController: ModalController,
    public navController:NavController,
    private menuCtrl: MenuController
    ) { }

  ngOnInit() {
  }

  async helpMoradores(){
    const modal = await this.modalController.create({
      component: QtdMoradoresPage
    });
    return await modal.present();
  }

  ionViewWillEnter(){
    //desabilita o side menu no login
    this.menuCtrl.enable(false);
  }

  prosseguir(){

    this.progresso = !this.progresso;
    
    setTimeout(() => {
      this.progresso = !this.progresso;
      //habilita o menu ao redirecionar
      this.menuCtrl.enable(true);
      //this.navController.navigateRoot('/tabs');
      this.navController.navigateRoot('/tabs');
    }, 2000);
    
  }

}
