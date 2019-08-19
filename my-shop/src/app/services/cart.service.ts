import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IProduct } from 'src/assets/models';

export interface IProductState {
  Title: string;
  inCart: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsState: IProductState[] = [];
  get productsStates(): IProductState[] {return this.productsState};

  constructor(private dataService: DataService) 
  {
    let products: IProduct[] = this.dataService.getProducts();
    for(let i = 0; i < products.length; i++){
      this.productsState.push({
        Title: products[i].Title, 
        inCart: false
      });
    }
  }

  getProductState(title: string): boolean{
    return this.productsState.find(p => p.Title === title).inCart;
  }

  addToCart(title: string){
    this.productsState.find(p => p.Title === title).inCart = true;
  }

  removeFromCart(title: string){
    this.productsState.find(p => p.Title === title).inCart = false;
  }
}
