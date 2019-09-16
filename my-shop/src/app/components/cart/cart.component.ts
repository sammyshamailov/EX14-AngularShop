import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from 'src/models/iproduct';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

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

  removeFromCart(product: IProduct) {
    this.cartService.removeFromCart(product);
    if(this.cartService.cartProduct === product.id){
      this.router.navigate(['/cart'], {relativeTo: this.activatedRoute});
    }
  }

  showDetails(product: IProduct) {
    this.dataService.productToShow = product;
    this.router.navigate(['/cart/product', product.Title], {relativeTo: this.activatedRoute});
    this.cartService.cartProduct = product.id;
  }

  ngOnInit() {
    this.cartProducts$ = this.cartService.cart;
  }

}
