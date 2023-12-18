import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private categorySV: CategoryService) {
    this.categorySV.loadCategoriesActive().then(category => {
      console.log(category);
    });
    this.categorySV.findById(2).then(category => {
      console.log(category);
    });
  }

}
