import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-configs',
  templateUrl: 'configs.page.html',
  styleUrls: ['configs.page.scss']
})
export class ConfigsPage {

  constructor(
    private storage: NativeStorage,
    public navController:NavController,
    
  ) {}

  public modo:string ="automatico";
  public nivel:string ="1";
  public automatico = true;

  mudarModo(){
    console.log(this.modo);
    if(this.modo == 'automatico'){
      this.automatico = true;
    }else{
      this.automatico = false;
    }
  }

  mudarNivel(){
    console.log(this.nivel);
  }

  goToTabs(){
    this.navController.navigateRoot('/tabs');
  }

}
