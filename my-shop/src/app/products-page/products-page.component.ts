import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Product from '../../assets/static/product.json';
import Category from '../../assets/static/category.json';
import { IProduct, IProductCategory } from '../../assets/models/index';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  productsData: IProduct[];
  categoryData: IProductCategory[];
  productsShown: IProduct[];
  categories: string[] = ["All", "Smart Phones", "Smart Phone Accessories", "External Hard-Drives"];
  @Output() chosenProduct = new EventEmitter<IProduct>();

  constructor() { }

  showChosenCategory(name){
    this.productsShown = [];
    if(name !== "All"){
      let categoryId: string = this.categoryData.find(p => p.Title === name).id;
      this.productsShown = this.productsData.filter(p => p.CategoryId === categoryId);
    }
    else{
      this.productsShown = this.productsData;
    }
  }

  showDetailsPage(e){
    this.chosenProduct.emit(this.productsData.find(p => p.Title === e.srcElement.alt));
  }

  ngOnInit() {
    this.productsData = Product;
    this.categoryData = Category;
    this.productsShown = Product;
  }

}
