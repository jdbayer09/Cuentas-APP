import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CategoryModal } from 'src/app/modals/category-modal/category.modal';
import { Category, CategoryService } from 'src/app/services/category.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categories: Category[] = [];
  loading: boolean = true;

  constructor(
    private categorySV: CategoryService,
    private utilSV: UtilService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { 

  }

  ngOnInit() {
    this.loadData();
  }

  async newCategory() {
    this.openModalCategory();
  }

  lockCategory(category: Category) {
    this.lockUnlockAction(category, 'lock');
  }
  unlockCategory(category: Category) {
    this.lockUnlockAction(category, 'unlock');
  }

  editCategory(category: Category) {
    this.openModalCategory({category});
  }

  private async openModalCategory(componentProps?: {category: Category}) {
    const modal = await this.modalCtrl.create({
      component: CategoryModal,
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


  private async lockUnlockAction(category: Category, type: 'lock' | 'unlock') {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación!',
      message: `¿Desea ${(type === 'lock'? 'bloquear': 'desbloquear')} la categoría ${category.name}?`,
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
                  await this.categorySV.disable(category.id);
                else
                  await this.categorySV.enable(category.id);

                this.utilSV.presentToast('success', '¡Se ' + (type === 'lock'? 'Bloquear': 'Desbloquear') + ' la categoría con éxito!').then(() => {
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
    this.categories = [];
    this.loading = true;
    setTimeout(async () => {
      this.categories = await this.categorySV.loadCategories();
      this.loading = false;
      if (event)
        event.target.complete();
    }, 1000);
  }

}
