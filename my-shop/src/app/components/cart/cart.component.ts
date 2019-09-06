import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from 'src/assets/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  get cartProducts(): IProduct[] { return this.cartService.getProducts() };

  constructor(
    private cartService: CartService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  removeFromCart(productTitle: string) {
    this.cartService.removeFromCart(productTitle);
    if(this.cartService.cartProduct === productTitle){
      this.router.navigate(['/cart'], {relativeTo: this.activatedRoute});
    }
  }

  showDetails(productTitle: string) {
    this.router.navigate(['/cart/product', productTitle], {relativeTo: this.activatedRoute});
    this.cartService.cartProduct = productTitle;
  }

  ngOnInit() {
  }

}
