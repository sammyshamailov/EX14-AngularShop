import { Injectable } from '@angular/core';
import { IProduct } from '../../models/iproduct';
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
  set cartProduct(productId: string) { this.cartSelectedProduct = productId };
  get cartProduct(): string { return this.cartSelectedProduct };

  constructor(
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

  getProductState(product: IProduct): boolean {
    return this.currentUserCart.find(p => p.id === product.id) ? true : false;
  }

  addToCart(product: IProduct) {
    this.currentUserCart.push(product);
  }

  removeFromCart(product: IProduct) {
    this.currentUserCart.splice(this.currentUserCart.findIndex(p => p.id === product.id), 1);
  }
}
