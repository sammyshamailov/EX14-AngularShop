import { Injectable } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

interface ICart
 {
  username: IProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  public readonly cart: Observable<IProduct[]> = this._cart.asObservable().pipe(shareReplay(1));
  private carts: ICart[] = [];
  private currentUserCart: IProduct[] = [];
  public cartAmount: number;

  private cartSelectedProduct: string;
  set cartProduct(productId: string) { this.cartSelectedProduct = productId };
  get cartProduct(): string { return this.cartSelectedProduct };

  constructor(private userService: UserService) {
    const userNames: string[] = this.userService.allUsers;
    for (let i: number = 0; i < this.userService.numOfUsers; i++) {
      this.carts[userNames[i]] = [];
    }
    this.userService.usersObserv.subscribe(user => {
      if (user) {
        this._cart.next(this.carts[user.Username]);
      }
      else{
        this._cart.next([]);
      }
    });
  }

  currentCart(currentUser: string): void {
    this.currentUserCart = this.carts[currentUser];
    this._cart.next(this.currentUserCart);
  }

  getProductState(product: IProduct): boolean {
    let temp: IProduct[];
    this.cart.subscribe(p => {
      temp = p;
    });
    return temp.find(p => p.id === product.id) ? true : false;
  }

  addToCart(product: IProduct) {
    this.currentUserCart.push(product);
    this._cart.next(this.currentUserCart);
  }

  removeFromCart(product: IProduct) {
    this.currentUserCart.splice(this.currentUserCart.findIndex(p => p.id === product.id), 1);
    this._cart.next(this.currentUserCart);
  }
}
