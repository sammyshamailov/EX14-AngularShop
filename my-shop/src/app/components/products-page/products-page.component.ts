import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { DataService } from 'src/app/services/data.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProductCategory } from 'src/models/iproduct-category';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy {

  // get categories(): string[] { return this.dataService.getCategoriesName(); };
  get isLogged(): boolean { return this.userService.isLoggedIn };
  get isAdmin(): boolean { return this.userService.isAdmin };
  products$: Observable<IProduct[]>;
  categories$: Observable<IProductCategory[]>;

  constructor(
    private dataService: DataService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) { }

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
   }

  ngOnDestroy(){
    //sending fictive category to show default all
    this.dataService.setCategory({id:'All', Title:'All'});
  }

}
