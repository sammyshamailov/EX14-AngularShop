import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from 'src/assets/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  get cartProducts(): IProduct[] { return this.cartService.getProducts() };

  constructor(
    private cartService: CartService,
    private router: Router) { }

  removeFromCart(productTitle: string) {
    this.cartService.removeFromCart(productTitle);
  }

  showDetailsPage(productTitle: String) {
    this.router.navigate(['/product', productTitle]);
  }

  ngOnInit() {
  }

}
