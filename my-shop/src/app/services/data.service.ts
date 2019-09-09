import { Injectable } from '@angular/core';
import Product from '../../assets/static/product.json';
import Category from '../../assets/static/category.json';
import { IProduct } from '../../models/iproduct';
import { IProductCategory } from '../../models/iproduct-category';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private products: IProduct[] = [];
  private editProduct: boolean = false;
  private productToEdit: string;
  get productListLength(): number {return this.products.length};

  constructor() { 
    this.products = Product;
  }

  setToEdit(): void { this.editProduct = !this.editProduct; };
  getToEdit(): boolean { return this.editProduct;  };
  setProductForEdit(productId: string): void { this.productToEdit = productId; };
  getProductForEdit(): string { return this.productToEdit; };

  getProduct(productId: string): IProduct{
    return this.products.find(p => p.id === productId);
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

  writeToList(product: IProduct){
    let productIndex: number = this.products.findIndex(p => p.id === product.id);
    if(productIndex !== -1){
      this.products[productIndex] = product;
    }
    else{
      this.products.push(product);
    }
  }
}
