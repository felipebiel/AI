import { Component } from '@angular/core';
import { DeviceService } from '../services/device/device.service';
import { DeviceInterface } from '../interfaces/DeviceInterface';
import { LogService } from '../services/log/log.service';
import { LogMomentoInterface } from '../interfaces/LogMomentoInterface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-status',
  templateUrl: 'status.page.html',
  styleUrls: ['status.page.scss'],
  providers: [DeviceService, LogService]
})
export class StatusPage {

  public progresso: boolean = true;
  private device: DeviceInterface;
  private logMomento: LogMomentoInterface;
  public litrosPorNivel: number;
  public litrosReservatorio: number;
  public porcentagemReservatorio: number;


  constructor(
    private deviceService: DeviceService,
    private logService: LogService,
    public alertController: AlertController
  ) {

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
            this.desligarBomba();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Infomação',
      message: msg,
      buttons: ['Entendi']
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.getStatus();
    setInterval(() => {
      this.getStatus();
    }, 10000);
  }

  getStatus() {
    //pega o id do user persistido e coloca na requisição
    this.deviceService.getDevice().subscribe(
      data => {
        //alert(this.user.id);
        this.device = (data as DeviceInterface);
        //alert(this.device.id);
        //pega o ultimo log com o id do device
        this.logService.getAlarmMomento(this.device.id).subscribe(
          data2 => {
            this.logMomento = (data2 as LogMomentoInterface);

            //calculando nivel
            this.litrosPorNivel = this.device.reservoirCapacity / 4;
            this.litrosReservatorio = (this.logMomento.levelAtMoment + 1) * this.litrosPorNivel;
            this.porcentagemReservatorio = 100 * this.litrosReservatorio / this.device.reservoirCapacity;

            this.progresso = false;
          },
          error2 => {

          }
        )
      },
      error => {
      }
    );
  }

  confirmarDesligarBomba() {
    this.presentAlertConfirm('Tem certeza que deseja fazer essa ação?');
  }

  desligarBomba() {
    this.deviceService.commandDevice(this.device.id, "B0").subscribe(
      data =>{
        this.presentAlert("O comando foi enviado para o dispositivo, assim que ele receber o comando o status será mudado, em caso de interferência na rede, o mesmo será descartado")
        this.getStatus();
      },
      error =>{

      }
    );
  }

}
