import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IProduct } from 'src/assets/models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carts: IProduct[][] = [];
  private currentUserCart: IProduct[] = [];
  set currentCart(cartPlace: number){
    this.currentUserCart = this.carts[cartPlace];
  }

  constructor(
    private dataService: DataService,
    private userService: UserService) {
    for (let i: number = 0; i < this.userService.numOfUsers; i++) {
      this.carts[i] = new Array<IProduct>();
    }
  }

  getProducts(): IProduct[] {
    return this.currentUserCart;
  }

  getProductState(title: string): boolean {
    return this.currentUserCart.find(p => p.Title === title) ? true : false;
  }

  addToCart(title: string) {
    this.currentUserCart.push(this.dataService.getProducts().find(p => p.Title === title));
  }

  removeFromCart(title: string) {
    this.currentUserCart.splice(this.currentUserCart.findIndex(p => p.Title === title), 1);
  }
}
