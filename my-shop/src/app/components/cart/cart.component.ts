import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from 'src/models/iproduct';
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

  removeFromCart(product: IProduct) {
    this.cartService.removeFromCart(product);
    if(this.cartService.cartProduct === product.id){
      this.router.navigate(['/cart'], {relativeTo: this.activatedRoute});
    }
  }

  showDetails(productId: string) {
    this.router.navigate(['/cart/product', productId], {relativeTo: this.activatedRoute});
    this.cartService.cartProduct = productId;
  }

  ngOnInit() {
  }

}
