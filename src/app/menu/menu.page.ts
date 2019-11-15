import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private storage: NativeStorage,
    public navController:NavController
    ) { }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  logout(){
    //console.log("SAINDO");
    this.storage.remove("token");
    this.storage.remove("user");
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.navController.navigateRoot('/login');
  }

  redirectToConfiguracoes(){
    this.menu.toggle();
    this.navController.navigateForward('/configs')
  }

  redirectToMeusDados(){
    this.menu.toggle();
    this.navController.navigateForward('/meus-dados')
  }

  redirectToSobre(){
    this.menu.toggle();
    this.navController.navigateForward('/sobre')
  }

  redirectToEventos(){
    this.menu.toggle();
    this.navController.navigateForward('/tabs/evento')
  }

  redirectToConsumo(){
    this.menu.toggle();
    this.navController.navigateForward('/tabs/consumo')
  }

  redirectToStatus(){
    this.menu.toggle();
    this.navController.navigateForward('/tabs/status')
  }

}
