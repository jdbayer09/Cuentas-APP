import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Category, CategoryService } from 'src/app/services/category.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category.modal.html',
  styleUrls: ['./category.modal.scss'],
})

export class CategoryModal implements OnInit {

  @Input() category?: Category;
  formCategory: FormGroup = this.formBuilder.group({
    name: [ '' , [Validators.required, Validators.minLength(3)] ],
    description: [ '' , [] ],
    icon: [ '' , [Validators.required] ],
    color: [ '' , [Validators.required] ],
    isRepeated: [false, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private utilSV: UtilService,
    private categorySV: CategoryService
  ) { 

  }

  ngOnInit() {
    if (this.category) {
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
      const newCategory: Category = this.formCategory.value;      
      await this.categorySV.insert(newCategory);
      this.utilSV.presentToast('success', '¡Se creo la categoría con éxito!').then(() => {
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
    if (!this.category) return;
    try {
      let newCategory: Category = this.formCategory.value;      
      newCategory.id = this.category.id;    

      await this.categorySV.update(newCategory);

      this.utilSV.presentToast('success', '¡Se actualizo la categoría con éxito!').then(() => {
        this.modalCtrl.dismiss({resp: true});
      });
    } catch (err) {
      console.error(err);
    }
  }

  close() {
    if(this.formCategory.pristine) {
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
    if (this.category) {
      this.formCategory = this.formBuilder.group({
        name: [ this.category.name , [Validators.required, Validators.minLength(3)] ],
        description: [ (this.category.description? this.category.description : '') , [] ],
        icon: [ this.category.icon , [Validators.required] ],
        color: [ this.category.color , [Validators.required] ],
        isRepeated: [this.category.isRepeated, Validators.required]
      });
      this.formCategory.controls['name'].disable();
    }
  }
}
