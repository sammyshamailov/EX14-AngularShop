import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from 'src/assets/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  get cartProducts(): IProduct[] {return this.cartService.getProducts()};
  @Output() chosenProduct = new EventEmitter<IProduct>();

  constructor(private cartService: CartService) { }

  removeFromCart(productTitle: string){
    this.cartService.removeFromCart(productTitle);
  }

  showDetailsPage(productTitle: String){
    this.chosenProduct.emit(this.cartProducts.find(p => p.Title === productTitle));
  }

  ngOnInit() {
  }

}
