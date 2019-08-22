import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IProduct } from 'src/assets/models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsInCart: IProduct[] = [];
  private carts: IProduct[][] = [];
  private currentCart: IProduct[] = [];

  constructor(
    private dataService: DataService,
    private userService: UserService) {
    for (let i: number = 0; i < this.userService.numOfUsers; i++) {
      this.carts[i] = new Array<IProduct>();
    }
  }

  getProducts(): IProduct[] {
    return this.productsInCart;
  }

  getProductState(title: string): boolean {
    return this.productsInCart.find(p => p.Title === title) ? true : false;
  }

  addToCart(title: string) {
    this.productsInCart.push(this.dataService.getProducts().find(p => p.Title === title));
  }

  removeFromCart(title: string) {
    this.productsInCart.splice(this.productsInCart.findIndex(p => p.Title === title), 1);
  }
}
