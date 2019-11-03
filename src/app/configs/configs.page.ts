import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { DeviceService } from '../services/device/device.service';


@Component({
  selector: 'app-configs',
  templateUrl: 'configs.page.html',
  styleUrls: ['configs.page.scss'],
  providers: [DeviceService]
})
export class ConfigsPage {

  constructor(
    private storage: NativeStorage,
    public navController:NavController,
    private deviceService: DeviceService
  ) {}

  public modo:string;
  public nivel:string;
  public automatico = true;


  ionViewWillEnter(){
    this.storage.getItem('user').then(
      data => {
        const response = (data as any);
        //pega o id do user persistido e coloca na requisição
          this.deviceService.getDevice(response.id).subscribe(
            data => {
              const response_device = (data as any);
              console.log(response_device);
              this.modo = response_device.autoMode.toString();
              this.nivel = response_device.levelForActingAuto.toString();
            },
            error => {
            
            }
          );
      });    
      
  }

  mudarModo(){
    if(this.modo == '1'){
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
