import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {

  constructor(public navController:NavController,) { }

  ngOnInit() {
  }

  goToTabs(){
    this.navController.navigateRoot('/tabs');
  }

}
