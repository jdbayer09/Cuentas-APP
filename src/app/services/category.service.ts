import { Injectable } from '@angular/core';
import { DatabaseService } from './util/database.service';
import { UtilService } from './util/util.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private databaseSV: DatabaseService,
    private utilSV: UtilService
  ) {}

  async loadCategories(): Promise<Category[]>{
    let resp: Category[] = (await this.databaseSV.executeQuery('SELECT * FROM categories ORDER BY active;')).values;
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
    let resp: Category = (await this.databaseSV.executeQuery(`SELECT * FROM categories WHERE id = ${id};`)).values?.pop();
    resp.active     = resp.active === 1;
    resp.isRepeated = resp.isRepeated === 1;
    return resp;
  }

  async loadCategoriesActive(): Promise<Category[]> {
    let resp: Category[] = (await this.databaseSV.executeQuery('SELECT * FROM categories WHERE active = true ORDER BY name;')).values;
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
    if (await this.validateExistCategoryName(category.name)) {
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const query = `
        INSERT INTO categories (name, icon, color, description, active, isRepeated, createdAt) VALUES (
          '${category.name}', 
          '${category.icon}', 
          '${category.color}',
          '${category.description}', 
          true, 
          ${category.isRepeated}, 
          '${currentDate}'
        );`;
      await this.databaseSV.executeQuery(query);
    } else {
      this.utilSV.presentToast('danger', `Ya existe una categoría con el nombre "${category.name}"`);
    }
  }


  private async validateExistCategoryName(name: string): Promise<boolean> {
    let resp: Category = (await this.databaseSV.executeQuery(`SELECT * FROM categories WHERE name = '${name}';`)).values?.pop();
    if (resp) {
      return false;
    } else {
      return true;
    }
  }

  async update(category: Category) {
    const query = `
      UPDATE 
        categories 
      SET
        icon = ${category.icon},
        color = ${category.color},
        description = ${category.description},
        isRepeated = ${category.isRepeated},
      WHERE 
        id = ${category.id};`;
    await this.databaseSV.executeQuery(query);
  }

  async disable(id: number) {
    const query = `UPDATE categories SET active = false WHERE id = ${id};`;
    await this.databaseSV.executeQuery(query);
  }

  async enable(id: number) {
    const query = `UPDATE categories SET active = true WHERE id = ${id};`;
    await this.databaseSV.executeQuery(query);
  }
}

export interface Category {
  id:           number;
  name:         string;
  icon:         string;
  color:        string;
  description?: string;
  isRepeated:   boolean | number;
  active:       boolean | number;
  createdAt?:   Date;
}
