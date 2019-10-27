import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  constructor(public navController:NavController,) { }

  ngOnInit() {
  }


  goToTabs(){
    this.navController.navigateRoot('/tabs');
  }

}
