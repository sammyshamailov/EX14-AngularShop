import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IProduct } from 'src/assets/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsInCart: IProduct[] = [];

  constructor(private dataService: DataService) {}

  getProducts(): IProduct[]{
    return this.productsInCart;
  }

  getProductState(title: string): boolean{
    return this.productsInCart.find(p => p.Title === title)? true: false;
  }

  addToCart(title: string){
    this.productsInCart.push(this.dataService.getProducts().find(p => p.Title === title));
  }

  removeFromCart(title: string){
    this.productsInCart.splice(this.productsInCart.findIndex(p => p.Title === title), 1);
  }
}
