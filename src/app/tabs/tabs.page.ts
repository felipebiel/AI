import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private menuCtrl: MenuController,
  ) {}


  ionViewWillEnter() {
    //desabilita o side menu no login
    this.menuCtrl.enable(true);
  }
}
