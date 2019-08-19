import { Injectable } from '@angular/core';
import Product from '../../assets/static/product.json';
import Category from '../../assets/static/category.json';
import { IProduct, IProductCategory } from '../../assets/models/index';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getProducts(): IProduct[]{
    return Product as IProduct[];
  }

  getCategories(): IProductCategory[]{
    return Category as IProductCategory[];
  }

  getCategoriesName(): string[]{
    let categoriesName: string[] = [];
    let categories: IProductCategory[] = this.getCategories();
    categoriesName.push("All");
    for (let i = 0; i < categories.length; i++){
      if(!categoriesName.find(p => p === categories[i].Title)){
        categoriesName.push(categories[i].Title);
      }
    }
    return categoriesName;
  }
}
