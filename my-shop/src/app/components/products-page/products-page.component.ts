import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { IProductCategory } from '../../../models/iproduct-category';
import { DataService } from 'src/app/services/data.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  productsShown: IProduct[];
  get productsData(): IProduct[] { return this.dataService.getProducts(); };
  get categoryData(): IProductCategory[] { return this.dataService.getCategories(); };
  get categories(): string[] { return this.dataService.getCategoriesName(); };
  get isLogged(): boolean { return this.userService.isLoggedIn };
  get isAdmin(): boolean { return this.userService.isAdmin };

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

  showChosenCategory(name: string) {
    this.productsShown = [];
    if (name !== "All") {
      let categoryId: string = this.categoryData.find(p => p.Title === name).id;
      this.productsShown = this.productsData.filter(p => p.CategoryId === categoryId);
    }
    else {
      this.productsShown = this.productsData;
    }
  }

  showDetailsPage(productId: String) {
    this.router.navigate(['/product', productId]);
  }

  goToEditProduct(productId: string) {
    this.dataService.setToEdit();
    this.dataService.setProductForEdit(productId)
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
    this.productsShown = this.productsData;
  }

}
