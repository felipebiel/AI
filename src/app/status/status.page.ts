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
  public device: DeviceInterface;
  public bombaNoMomento: number;
  public nivelNoMomento: number;
  public contraSecoNoMomento: number;
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
  
    setTimeout(() => {
      this.getStatus();
      setInterval(() => {
        this.getStatus();
        //alert('BUSCANDO...')
      }, 3000);
    }, 1000);

  }

  getStatus() {
    //pega o id do user persistido e coloca na requisição
    this.deviceService.getDevice().subscribe(
      data => {
        
        this.device = (data as DeviceInterface);
        //alert(this.device.id);
        //pega o status da bomba no momento
        this.deviceService.getPumpAtMoment(this.device.id).subscribe(
          dataPump => {

            const responsePump = (dataPump as any);
            this.bombaNoMomento = responsePump.onOff;
            //alert(this.bombaNoMomento);
            //pega o status do nivel no momento
            this.deviceService.getLevelAtMoment(this.device.id).subscribe(
              dataLevel => {
                const responseLevel = (dataLevel as any);

                this.nivelNoMomento = responseLevel.currentLevel;
                //alert(responseLevel.currentLevel);
                //calculando nivel
                this.litrosPorNivel = this.device.reservoirCapacity / 4;
                this.litrosReservatorio = (this.nivelNoMomento + 1) * this.litrosPorNivel;
                this.porcentagemReservatorio = 100 * this.litrosReservatorio / this.device.reservoirCapacity;
                
                //pega o status do contra seco
                this.deviceService.getContraSecoAtMoment(this.device.id).subscribe(
                  dataContraSeco =>{
                    const responseContraSeco = (dataContraSeco as any);
                    this.contraSecoNoMomento = responseContraSeco.onOff;
                    //alert(this.contraSecoNoMomento);

                    this.progresso = false;
                  },
                  errorContraSeco =>{

                  }
                )
                //
              },
              errorLevel => {

              }
            )
          },
          errorPump => {

          }
        );
      },
      error => {
      }
    );
  }

  confirmarDesligarBomba() {
    this.presentAlertConfirm('Tem certeza que deseja fazer essa ação?');
  }

  confirmarLigarBomba(){
    this.presentAlertConfirmLigar("Tem certeza que deseha fazer essa ação?");
  }

  ligarBomba(){
    this.deviceService.commandDevice(this.device.id, "B1").subscribe(
      data => {
        this.presentAlert("O comando foi enviado para o dispositivo, assim que ele receber o comando o status será mudado, em caso de interferência na rede, o mesmo será descartado")
        this.getStatus();
      },
      error => {

      }
    );
  }


  desligarBomba() {
    this.deviceService.commandDevice(this.device.id, "B0").subscribe(
      data => {
        this.presentAlert("O comando foi enviado para o dispositivo, assim que ele receber o comando o status será mudado, em caso de interferência na rede, o mesmo será descartado")
        this.getStatus();
      },
      error => {

      }
    );
  }

  async presentAlertConfirmLigar(msg) {
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
            this.ligarBomba();
          }
        }
      ]
    });

    await alert.present();
  }

}
