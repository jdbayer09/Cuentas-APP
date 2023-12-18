import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }


  getLoading() {
    return this.loadingCtrl.create({
      message: 'Cargando...',
      animated: true,
      spinner: 'bubbles',
      cssClass: 'loadingCss',
      mode: 'ios'
    });
  }

  async presentToast(color: string, msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      animated: true,
      color: color,
      position: 'top',
      duration: 2000
    });
    return toast.present();
  }
}
