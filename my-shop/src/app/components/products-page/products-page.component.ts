import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct } from '../../../models/iproduct';
import { IProductCategory } from '../../../models/iproduct-category';
import { User } from '../../../models/user';

import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy {

  products$: Observable<IProduct[]>;
  categories$: Observable<IProductCategory[]>;
  curentUser$: Observable<User>;

  constructor(
    private dataService: DataService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) { }

  /**
   * Sets my styles
   * @param product 
   * @returns  
   */
  setMyStyles(product: IProduct) {
    let styles = {
      'background-image': this.cartService.getProductState(product) ?
        "url('../../../assets/icons/remove.svg')" :
        "url('../../../assets/icons/buy.svg')"
    };
    return styles;
  }

  showDetailsPage(product: IProduct) {
    this.dataService.productToShow = product;
    this.router.navigate(['/product', product.Title]);
  }

  goToEditProduct(product: IProduct) {
    this.dataService.setToEdit();
    this.dataService.setProductForEdit(product)
    this.router.navigate(['/add-edit']);
  }

  changeProductState(product: IProduct) {
    if (this.cartService.getProductState(product)) {
      this.cartService.removeFromCart(product);
    }
    else {
      this.cartService.addToCart(product);
    }
  }

  ngOnInit() {
    this.products$ = this.dataService.productsObserv;
    this.categories$ = this.dataService.categoriesObserv;
    this.curentUser$ = this.userService.usersObserv;
   }

  ngOnDestroy(){
    //sending fictive category to show default all
    this.dataService.setCategory({id:'All', Title:'All'});
  }

}
