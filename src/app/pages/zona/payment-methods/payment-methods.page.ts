import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PaymentMethodModal } from 'src/app/modals/payment-method-modal/payment-method.modal';
import { PaymentMethod, PaymentMethodService } from 'src/app/services/payment-method.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage implements OnInit {

  paymentMethods: PaymentMethod[] = [];
  loading: boolean = true;
  viewAddButton: boolean = true;

  constructor(
    private paymentMethodSV: PaymentMethodService,
    private utilSV: UtilService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async newPaymentMethod() {
    this.openModalPaymentMethod();
  }

  lockPaymentMethod(paymentMethod: PaymentMethod) {
    this.lockUnlockAction(paymentMethod, 'lock');
  }
  unlockPaymentMethod(paymentMethod: PaymentMethod) {
    this.lockUnlockAction(paymentMethod, 'unlock');
  }

  editPaymentMethod(paymentMethod: PaymentMethod) {
    this.openModalPaymentMethod({paymentMethod});
  }

  private async openModalPaymentMethod(componentProps?: {paymentMethod: PaymentMethod}) {
    const modal = await this.modalCtrl.create({
      component: PaymentMethodModal,
      backdropDismiss: false,
      componentProps,
      animated: true
    });
    await modal.present();
    const { resp } = (await modal.onDidDismiss()).data;

    if (resp) {
      setTimeout(() => {
        this.loadData();
      }, 100);
    }
  }


  private async lockUnlockAction(paymentMethod: PaymentMethod, type: 'lock' | 'unlock') {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación!',
      message: `¿Desea ${(type === 'lock'? 'bloquear': 'desbloquear')} el metodo de pago ${paymentMethod.name}?`,
      buttons: [
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: async () => {
            const loading = await this.utilSV.getLoading();
            await loading.present();
            setTimeout(async () => {
              try {   
                if (type === 'lock')
                  await this.paymentMethodSV.disable(paymentMethod.id);
                else
                  await this.paymentMethodSV.enable(paymentMethod.id);

                this.utilSV.presentToast('success', '¡Se ' + (type === 'lock'? 'Bloquear': 'Desbloquear') + ' el metodo de pago con éxito!').then(() => {
                  this.loadData();
                });                  
              } catch (err) {
                console.error(err);
              }
              loading.dismiss();
            }, 500);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button'
        }
      ]
    });

    await alert.present();
  }

  loadData(event?: any) {
    this.paymentMethods = [];
    this.loading = true;
    setTimeout(async () => {
      this.paymentMethods = await this.paymentMethodSV.loadAll();
      this.loading = false;
      if (event)
        event.target.complete();

      if (this.paymentMethods.length >= 50) {
        this.viewAddButton = false;
      }
    }, 1000);
  }

}
