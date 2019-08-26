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

  getCategoryId(category: string): string {
    return this.getCategories().find(p => p.Title === category).id;
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

  writeToList(productDetails){
    const temp = JSON.stringify(this.products[0]);
    let product: IProduct = JSON.parse(temp);
    product.Title = productDetails.Title;
    product.Price = productDetails.Price as string;
    product.Image = productDetails.Image;
    product.BigImage = productDetails.BigImage;
    product.Description = productDetails.Description;
    product.CategoryId = this.getCategoryId(productDetails.Category);
    let productIndex: number = this.products.findIndex(p => p.Title === product.Title);
    if(productIndex !== -1){
      this.products[productIndex] = product;
    }
    else{
      this.products.push(product);
    }
  }
}
