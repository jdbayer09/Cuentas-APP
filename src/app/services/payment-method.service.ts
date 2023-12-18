import { Injectable } from '@angular/core';
import { DatabaseService } from './util/database.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private db!: SQLiteDBConnection;

  constructor(private databaseSV: DatabaseService) { 
    this.db = this.databaseSV.getDb();
  }

  async loadCategories(): Promise<PaymentMethod[]>{
    let resp = (await this.db.query('SELECT * FROM payment_methods ORDER BY active;')).values;
    if (resp) {
      return resp.map(paymentMethod => {
        paymentMethod.active     = paymentMethod.active === 1;
        return paymentMethod;
      });
    } else {
      return [];
    }
    
  }

  async findById(id: number): Promise<PaymentMethod> {
    let resp = (await this.db.query(`SELECT * FROM payment_methods WHERE id = ${id};`)).values?.pop();
    resp.active     = resp.active === 1;
    return resp;
  }

  async loadCategoriesActive(): Promise<PaymentMethod[]> {
    let resp = (await this.db.query('SELECT * FROM payment_methods WHERE active = true ORDER BY name;')).values;
    if (resp) {
      return resp.map(paymentMethod => {
        paymentMethod.active     = paymentMethod.active === 1;
        return paymentMethod;
      });
    } else {
      return [];
    }
  }

  async addpaymentMethod(paymentMethod: PaymentMethod) {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = `
      INSERT INTO payment_methods (name, icon, description, active, createdAt) VALUES (
        '${paymentMethod.name}', 
        '${paymentMethod.icon}', 
        '${paymentMethod.description}', 
        true,
        '${currentDate}'
      );`;
    await this.db.query(query);
  }

  async update(paymentMethod: PaymentMethod) {
    const query = `
      UPDATE 
        payment_methods 
      SET 
        name = ${paymentMethod.name},
        icon = ${paymentMethod.icon},
        description = ${paymentMethod.description}
      WHERE 
        id = ${paymentMethod.id};`;
    await this.db.query(query);
  }

  async disable(id: number) {
    const query = `UPDATE payment_methods SET active = false WHERE id = ${id};`;
    await this.db.query(query);
  }

  async enable(id: number) {
    const query = `UPDATE payment_methods SET active = true WHERE id = ${id};`;
    await this.db.query(query);
  }
}

export interface PaymentMethod {
  id:           number;
  name:         string;
  icon:         string;
  description?: string;
  active:       boolean;
  createdAt?:   Date;
}

