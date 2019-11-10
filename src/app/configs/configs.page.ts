import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { DeviceService } from '../services/device/device.service';
import { UserInterface } from '../interfaces/UserInterface';


@Component({
  selector: 'app-configs',
  templateUrl: 'configs.page.html',
  styleUrls: ['configs.page.scss'],
  providers: [DeviceService]
})
export class ConfigsPage {

  constructor(    
    public navController:NavController,
    private deviceService: DeviceService,
    public toastController: ToastController
  ) { }

  public progresso: boolean = true;
  private id:number;
  public modo:string;
  public nivel:string;
  public reservoirCapacity:number;
  public automatico = true;

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Salvo com sucesso.',
      duration: 4000,
      position: 'bottom',
    });
    toast.present();
  }


  ionViewDidEnter(){
      //pega o id do user persistido e coloca na requisição
      this.deviceService.getDevice().subscribe(
        data => {
          //alert(this.user.id);
          const response_device = (data as any);
          this.id = response_device.id;
          this.modo = response_device.autoMode.toString();
          this.nivel = response_device.levelForActingAuto.toString();
          this.reservoirCapacity = response_device.reservoirCapacity;

          this.progresso = false;
        },
        error => {            
        }
      );     
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

  updateDevice(){

    const form = {
      modo: this.modo,
      nivel: this.nivel,
      reservoirCapacity: this.reservoirCapacity,
    }

    this.deviceService.updateDevice(this.id, form).subscribe(
      data => {
        this.presentToast();
      },
      error => {            
      }
    );   
  }

}
