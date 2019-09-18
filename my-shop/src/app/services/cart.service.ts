import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { IProduct } from '../../models/iproduct';

interface ICart {
  username: IProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  public readonly cart: Observable<IProduct[]> = this._cart.asObservable();
  private carts: ICart[] = [];
  private currentUserCart: IProduct[] = [];

  private cartSelectedProduct: string;
  set cartProduct(productId: string) { this.cartSelectedProduct = productId };
  get cartProduct(): string { return this.cartSelectedProduct };

  constructor(private http: HttpClient) {
    this.loadCarts();
  }

  /**
   * Gets the users data and changes it accordingly.
   * @returns Promise representation of the users list.
   */
  private getCartPromise(): Promise<ICart[]> {
    return this.http.get('../../assets/static/cart.json')
      .pipe(
        map(json =>  json as ICart[])
      )
      .toPromise()
      .catch((error) => Promise.reject('error'));
  }

  /**
   * Loads users into the the private list variable.
   */
  private loadCarts() {
    this.getCartPromise()
      .then((carts) => { 
        this.carts = carts;
        if(localStorage.getItem('user')){
          this.currentUserCart = this.carts[localStorage.getItem('user')];
          this._cart.next(this.currentUserCart);
        }
       });
  }

  /**
   * Sets the current cart for current logged user.
   * Called from menu component.
   * @param currentUser The username of logged user.
   */
  public currentCart(currentUser: string): void {
    this.currentUserCart = this.carts[currentUser];
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
}
