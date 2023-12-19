import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { PaymentMethod, PaymentMethodService } from 'src/app/services/payment-method.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-payment-method-modal',
  templateUrl: './payment-method.modal.html',
  styleUrls: ['./payment-method.modal.scss'],
})
export class PaymentMethodModal implements OnInit {

  @Input() paymentMethod?: PaymentMethod;
  formPaymentMethod: FormGroup = this.formBuilder.group({
    name: [ '' , [Validators.required, Validators.minLength(3)] ],
    icon: [ '' , [Validators.required] ],
    color: [ '' , [Validators.required] ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private utilSV: UtilService,
    private paymentMethodSV: PaymentMethodService
  ) { 

  }

  ngOnInit() {
    if (this.paymentMethod) {
      this.buildFormUpdate();
    }
  }

  async save() {
    const loading = await this.utilSV.getLoading();
    await loading.present();
    setTimeout(async () => {
      await this.saveAction();
      loading.dismiss();
    }, 500);
  }

  private async saveAction() {
    try {
      const newPaymentMethod: PaymentMethod = this.formPaymentMethod.value;      
      await this.paymentMethodSV.insert(newPaymentMethod);
      this.utilSV.presentToast('success', '¡Se creo la el metodo de pago con éxito!').then(() => {
        this.modalCtrl.dismiss({resp: true});
      });
    } catch (err) {
      console.error(err);
    }
  }

  async update() {
    const loading = await this.utilSV.getLoading();
    await loading.present();
    setTimeout(async () => {
      await this.updateAction();
      loading.dismiss();
    }, 500);
  }
  private async updateAction() {
    if (!this.paymentMethod) return;
    try {
      let newPaymentMethod: PaymentMethod = this.formPaymentMethod.value;      
      newPaymentMethod.id = this.paymentMethod.id;    

      await this.paymentMethodSV.update(newPaymentMethod);

      this.utilSV.presentToast('success', '¡Se actualizo el metodo de pago con éxito!').then(() => {
        this.modalCtrl.dismiss({resp: true});
      });
    } catch (err) {
      console.error(err);
    }
  }

  close() {
    if(this.formPaymentMethod.pristine) {
      this.modalCtrl.dismiss({resp: false});
    } else {
      this.closeAction();
    }
  }

  private async closeAction() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación!',
      subHeader: 'Perderá todos los cambios.',
      message: '¿Desea continuar?',
      buttons: [
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            this.modalCtrl.dismiss({resp: false});
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


  private buildFormUpdate() {
    if (this.paymentMethod) {
      this.formPaymentMethod = this.formBuilder.group({
        name: [ this.paymentMethod.name , [Validators.required, Validators.minLength(3)] ],
        icon: [ this.paymentMethod.icon , [Validators.required] ],
        color: [ this.paymentMethod.color , [Validators.required] ]
      });
      this.formPaymentMethod.controls['name'].disable();
    }
  }
}
