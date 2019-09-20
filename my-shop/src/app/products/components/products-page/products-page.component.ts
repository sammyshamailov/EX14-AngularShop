import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct } from 'src/app/shared/models/iproduct';
import { IProductCategory } from 'src/app/shared/models/iproduct-category';
import { User } from 'src/app/shared/models/user';

import { CartService } from '../../../services/cart.service';
import { DataService } from '../../../services/data.service';
import { UserService } from '../../../services/user.service';

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
   * Function for buy/remove button ngStyle.
   * @param product a product from the list.
   * @returns Remove image if in cart, else buy image.
   */
  setMyStyles(product: IProduct): {'background-image': string} {
    let styles = {
      'background-image': this.cartService.getProductState(product) ?
        "url('../../../../assets/icons/remove.svg')" :
        "url('../../../../assets/icons/buy.svg')"
    };
    return styles;
  }

  /**
   * Sets in dataService the selected product for details
   * and navigates to product component.
   * @param product The chosen product.
   */
  showDetailsPage(product: IProduct): void {
    this.dataService.productToShow = product;
    this.router.navigate(['/product', product.Title]);
  }

  /**
   * Sets in dataService the selected product for edit
   * and navigates to add/edit component.
   * @param product The chosen product for edit.
   */
  goToEditProduct(product: IProduct): void {
    this.dataService.setToEdit();
    this.dataService.setProductForEdit(product)
    this.router.navigate(['/add-edit']);
  }

  /**
   * Changes product state (add/remove from cart).
   * @param product The selected product.
   */
  changeProductState(product: IProduct) {
    this.cartService.getProductState(product)?
    this.cartService.removeFromCart(product):
    this.cartService.addToCart(product);
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
