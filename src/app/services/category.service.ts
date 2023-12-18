import { Injectable } from '@angular/core';
import { DatabaseService } from './util/database.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private db!: SQLiteDBConnection;

  constructor(private databaseSV: DatabaseService) { 
    this.db = this.databaseSV.getDb();
  }

  async loadCategories(): Promise<Category[]>{
    let resp = (await this.db.query('SELECT * FROM categories ORDER BY active;')).values;
    if (resp) {
      return resp.map(category => {
        category.active     = category.active === 1;
        category.isRepeated = category.isRepeated === 1;
        return category;
      });
    } else {
      return [];
    }
    
  }

  async findById(id: number): Promise<Category> {
    let resp = (await this.db.query(`SELECT * FROM categories WHERE id = ${id};`)).values?.pop();
    resp.active     = resp.active === 1;
    resp.isRepeated = resp.isRepeated === 1;
    return resp;
  }

  async loadCategoriesActive(): Promise<Category[]> {
    let resp = (await this.db.query('SELECT * FROM categories WHERE active = true ORDER BY name;')).values;
    if (resp) {
      return resp.map(category => {
        category.active     = category.active === 1;
        category.isRepeated = category.isRepeated === 1;
        return category;
      });
    } else {
      return [];
    }
  }

  async addCategory(category: Category) {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = `
      INSERT INTO categories (name, icon, description, active, isRepeated, createdAt) VALUES (
        '${category.name}', 
        '${category.icon}', 
        '${category.description}', 
        true, 
        ${category.isRepeated}, 
        '${currentDate}'
      );`;
    await this.db.query(query);
  }

  async update(category: Category) {
    const query = `
      UPDATE 
        categories 
      SET 
        name = ${category.name},
        icon = ${category.icon},
        description = ${category.description},
        isRepeated = ${category.isRepeated},
      WHERE 
        id = ${category.id};`;
    await this.db.query(query);
  }

  async disable(id: number) {
    const query = `UPDATE categories SET active = false WHERE id = ${id};`;
    await this.db.query(query);
  }

  async enable(id: number) {
    const query = `UPDATE categories SET active = true WHERE id = ${id};`;
    await this.db.query(query);
  }
}

export interface Category {
  id:           number;
  name:         string;
  icon:         string;
  description?: string;
  isRepeated:   boolean;
  active:       boolean;
  createdAt?:   Date;
}
