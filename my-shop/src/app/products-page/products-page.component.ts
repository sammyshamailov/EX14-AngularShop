import { Component, OnInit } from '@angular/core';
import Product from '../../assets/static/product.json';

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

  products: IProduct[] = Product;

  constructor() { }

  ngOnInit() {
  }

}
