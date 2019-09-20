import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IProduct } from 'src/app/shared/models/iproduct';

@Injectable()
export class CartService {
  private _cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  public readonly cart: Observable<IProduct[]> = this._cart.asObservable();

  private carts: IProduct[][] = [];
  private currentUserCart: IProduct[] = [];
  private usernames: string[] = []; //helper array for users cart indexing in carts array

  private cartSelectedProduct: string;
  set cartProduct(productId: string) { this.cartSelectedProduct = productId };
  get cartProduct(): string { return this.cartSelectedProduct };

  constructor() {
    if (localStorage.getItem('user')) {
      this.currentCart(localStorage.getItem('user'));
    }
  }

  /**
   * Sets the current cart for current logged user.
   * The carts array updates dynamically if the user has
   * logged for the first time.
   * @param currentUser The username of logged user.
   */
  public currentCart(currentUser: string): void {
    if (!this.usernames.find(username => username === currentUser)) {
      this.usernames.push(currentUser);
      this.carts[this.usernames.indexOf(currentUser)] = [];
    }
    this.currentUserCart = this.carts[this.usernames.indexOf(currentUser)];
    this._cart.next(this.currentUserCart);
  }

  /**
   * Returns the state of the product in cart.
   * @param product The selected product from the list.
   * @returns true if product in cart.
   */
  public getProductState(product: IProduct): boolean {
    let temp: IProduct[];
    this._cart.subscribe(p => {
      temp = p;
    });
    return temp.find(p => p.id === product.id) ? true : false;
  }

  /**
   * Adds product to cart.
   * @param product The selected product.
   */
  public addToCart(product: IProduct): void {
    this.currentUserCart.push(product);
    this._cart.next(this.currentUserCart);
  }

  /**
   * Removes product from cart.
   * @param product The selected product.
   */
  public removeFromCart(product: IProduct): void {
    this.currentUserCart.splice(this.currentUserCart.findIndex(p => p.id === product.id), 1);
    this._cart.next(this.currentUserCart);
  }

  /**
   * Updates edited product if in cart.
   * @param product The edited product.
   */
  public updateProduct(editedProduct: IProduct): void {
    for (let i: number = 0; i < this.carts.length; i++) {
      let productIndex: number = this.carts[i].findIndex(product => product.id === editedProduct.id);
      if (productIndex !== -1){
        this.carts[i][productIndex] = editedProduct;
      }
    }
  }
}
