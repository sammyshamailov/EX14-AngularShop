import { Component, OnInit } from '@angular/core';
import Product from '../../assets/static/product.json';
import Category from '../../assets/static/category.json';

export interface IProduct{
  CategoryId: string;
  Image: string;
  Title: string;
  Price: string;
  Description: string;
}

export interface IProductCategory{
  id: string;
  Title: string;
}
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  productsData: IProduct[] = Product;
  productsShown: IProduct[] = Product;
  categoryData: IProductCategory[] = Category;
  deatailsPageShown: boolean = false;
  chosenProduct: IProduct = Product[0];

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
    console.log(e);
    this.chosenProduct = this.productsData.find(p => p.Title === e.srcElement.childNodes[0].data)
    this.deatailsPageShown = !this.deatailsPageShown;
  }

  showProductsPage(){
    this.deatailsPageShown = !this.deatailsPageShown;
  }

  ngOnInit() {
  }

}
