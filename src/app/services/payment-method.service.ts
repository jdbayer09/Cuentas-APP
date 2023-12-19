import { Injectable } from '@angular/core';
import { DatabaseService } from './util/database.service';
import { UtilService } from './util/util.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  constructor(
    private databaseSV: DatabaseService,
    private utilSV: UtilService
  ) {}

  async loadAll(): Promise<PaymentMethod[]>{
    let resp: PaymentMethod[] = (await this.databaseSV.executeQuery('SELECT * FROM payment_methods ORDER BY active DESC;')).values;
    if (resp) {
      return resp.map(paymentMethod => {
        paymentMethod.active  = paymentMethod.active === 1;
        return paymentMethod;
      });
    } else {
      return [];
    }
    
  }

  async findById(id: number): Promise<PaymentMethod> {
    let resp: PaymentMethod = (await this.databaseSV.executeQuery(`SELECT * FROM payment_methods WHERE id = ${id};`)).values?.pop();
    resp.active = resp.active === 1;
    return resp;
  }

  async loadAllActive(): Promise<PaymentMethod[]> {
    let resp: PaymentMethod[] = (await this.databaseSV.executeQuery('SELECT * FROM payment_methods WHERE active = true ORDER BY name;')).values;
    if (resp) {
      return resp.map(paymentMethod => {
        paymentMethod.active     = paymentMethod.active === 1;
        return paymentMethod;
      });
    } else {
      return [];
    }
  }

  async insert(paymentMethod: PaymentMethod) {
    if (await this.validateExistPaymentMethodName(paymentMethod.name)) {
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const query = `
        INSERT INTO payment_methods (name, icon, color, active, createdAt) VALUES (
          '${paymentMethod.name}', 
          '${paymentMethod.icon}', 
          '${paymentMethod.color}', 
          true,
          '${currentDate}'
        );`;
      await this.databaseSV.executeQuery(query);
    } else {
      this.utilSV.presentToast('danger', `Ya existe un metodo de pago con el nombre "${paymentMethod.name}"`);
    }
  }

  private async validateExistPaymentMethodName(name: string): Promise<boolean> {
    let resp: PaymentMethod = (await this.databaseSV.executeQuery(`SELECT * FROM payment_methods WHERE name = '${name}';`)).values?.pop();
    if (resp) {
      return false;
    } else {
      return true;
    }
  }

  async update(paymentMethod: PaymentMethod) {
    const query = `
      UPDATE 
        payment_methods 
      SET 
        icon = '${paymentMethod.icon}',
        color = '${paymentMethod.color}'
      WHERE 
        id = ${paymentMethod.id};`;
    await this.databaseSV.executeQuery(query);
  }

  async disable(id: number) {
    const query = `UPDATE payment_methods SET active = false WHERE id = ${id};`;
    await this.databaseSV.executeQuery(query);
  }

  async enable(id: number) {
    const query = `UPDATE payment_methods SET active = true WHERE id = ${id};`;
    await this.databaseSV.executeQuery(query);
  }
}

export interface PaymentMethod {
  id:           number;
  name:         string;
  icon:         string;
  color:        string;
  active:       boolean | number;
  createdAt?:   Date;
}

