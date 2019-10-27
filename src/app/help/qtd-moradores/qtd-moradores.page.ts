import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qtd-moradores',
  templateUrl: './qtd-moradores.page.html',
  styleUrls: ['./qtd-moradores.page.scss'],
})
export class QtdMoradoresPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
