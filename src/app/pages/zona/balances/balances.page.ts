import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Balance, BalancesService } from 'src/app/services/balances.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.page.html',
  styleUrls: ['./balances.page.scss'],
})
export class BalancesPage implements OnInit {

  private selectedMonth : number = new Date().getMonth() + 1;
  private selectedYear  : number = new Date().getFullYear();

  balances: Balance[] = [];
  totalBalance: number = 0;

  loading: boolean = true;

  constructor(
    private balanceSV: BalancesService,
    private alertCtrl: AlertController,
    private utilSV: UtilService
  ) { 
  }

  ngOnInit() {
    this.loadData();
  }

  async deleteBalance(balance: Balance) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación!',
      message: `¿Desea eliminar el ingreso ${balance.name}?`,
      buttons: [
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: async () => {
            const loading = await this.utilSV.getLoading();
            await loading.present();
            setTimeout(async () => {
              try {   
                await this.balanceSV.delete(balance.id);

                this.utilSV.presentToast('success', '¡Se elimino el ingreso con éxito!').then(() => {
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

  editBalance(balance: Balance) {

  }

  loadData(event?: any) {
    this.balances = [];
    this.totalBalance = 0;
    this.loading = true;
    setTimeout(async () => {
      this.balances = await this.balanceSV.loadAll(this.selectedMonth, this.selectedYear);
      this.totalBalance = await this.balanceSV.getTotal(this.selectedMonth, this.selectedYear);
      this.loading = false;
      if (event)
        event.target.complete();
    }, 1000);
  }

  selectMonth(month: number) {
    this.selectedMonth = month;
    this.loadData();
  }

  selectYear(year: number) {
    this.selectedYear = year;
    this.loadData();
  }



}
