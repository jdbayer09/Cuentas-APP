import { Injectable } from '@angular/core';
import { DatabaseService } from './util/database.service';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {
  constructor(
    private databaseSV: DatabaseService
  ) {}

  async loadAll(month: number, year: number): Promise<Balance[]>{
    let resp: Balance[] = (await this.databaseSV.executeQuery(`SELECT * FROM balances WHERE month = ${month} AND year = ${year} ORDER BY createdAt;`)).values;
    return resp;
  }

  async getTotal(month: number, year: number): Promise<number>{
    let {total} = (await this.databaseSV.executeQuery(`SELECT sum(value) AS total FROM balances WHERE month = ${month} AND year = ${year} ORDER BY createdAt;`)).values.pop();
    return total;
  }

  async findById(id: number): Promise<Balance> {
    let resp: Balance = (await this.databaseSV.executeQuery(`SELECT * FROM balances WHERE id = ${id};`)).values?.pop();
    return resp;
  }

  async insert(balance: Balance) {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = `
      INSERT INTO balances (name, value, month, year, createdAt) VALUES (
        '${balance.name.toUpperCase()}', 
        ${balance.value}, 
        ${balance.month}, 
        ${balance.year},
        '${currentDate}'
      );`;
    await this.databaseSV.executeQuery(query);
  }

  async update(balance: Balance) {
    const query = `
      UPDATE 
        balances 
      SET 
        value = ${balance.value},
        name = '${balance.name}'
      WHERE 
        id = ${balance.id};`;
    await this.databaseSV.executeQuery(query);
  }

  async delete(id: number) {
    const query = `DELETE FROM balances WHERE id = ${id};`;
    await this.databaseSV.executeQuery(query);
  }

}

export interface Balance {
  id:           number;
  name:         string;
  value:        number;
  month:        number;
  year:         number;
  createdAt?:   Date;
}