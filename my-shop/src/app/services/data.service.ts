import { Injectable } from '@angular/core';
import Product from '../../assets/static/product.json';
import Category from '../../assets/static/category.json';
import { IProduct, IProductCategory } from '../../assets/models/index';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  products: IProduct[] = [];

  constructor() { 
    this.products = Product;
  }

  getProducts(): IProduct[]{
    return this.products;
  }

  getCategories(): IProductCategory[]{
    return Category as IProductCategory[];
  }

  getProductCategory(categoryId: string): string {
    return this.getCategories().find(p => p.id === categoryId).Title;
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

  writeToFile(product: IProduct){
    let productIndex: number = this.products.findIndex(p => p.Title === product.Title);
    if(productIndex){
      this.products[productIndex] = product;
    }
    else{
      this.products.push(product);
    }
    // writeFile('../../assets/static/product.json', JSON.stringify(products), (err) =>{
    //   if(err){
    //     console.log(err);
    //     return;
    //   };
    //   console.log("write completed");
    // });
  }
}
