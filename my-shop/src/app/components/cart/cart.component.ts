import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';

import { IProduct } from '../../../models/iproduct';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts$: Observable<IProduct[]>;

  constructor(
    private cartService: CartService,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  /**
   * Removes the requested product from the cart.
   * @param product the requested product.
   */
  removeFromCart(product: IProduct): void {
    this.cartService.removeFromCart(product);
    //enter when the removed product was displayed in details page.
    if(this.cartService.cartProduct === product.id){
      this.router.navigate(['/cart'], {relativeTo: this.activatedRoute});
    }
  }

  /**
   * Shows details of selected product.
   * When product is clicked, the function emits and goes to product component.
   * @param product  the selected product.
   */
  showDetails(product: IProduct): void {
    this.dataService.productToShow = product;
    this.router.navigate(['/cart/product', product.Title], {relativeTo: this.activatedRoute});
    this.cartService.cartProduct = product.id;
  }

  ngOnInit() {
    this.cartProducts$ = this.cartService.cart;
  }

}
