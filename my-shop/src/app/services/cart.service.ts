import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IProduct } from 'src/assets/models';
import { UserService } from './user.service';

interface ICart {
  username: IProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carts: ICart[] = [];
  private currentUserCart: IProduct[] = [];
  private cartSelectedProduct: string;
  set cartProduct(title: string) { this.cartSelectedProduct = title };
  get cartProduct(): string { return this.cartSelectedProduct };

  constructor(
    private dataService: DataService,
    private userService: UserService) {
      const userNames: string[] = this.userService.allUsers.map(p => p.Username);
      for (let i: number = 0; i < this.userService.numOfUsers; i++) {
        this.carts[userNames[i]] = [];
      }

    }

  currentCart(currentUser: string): void {
    this.currentUserCart = this.carts[currentUser];
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
