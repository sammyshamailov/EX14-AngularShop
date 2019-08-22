import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit, AfterViewChecked, Renderer2 } from '@angular/core';
import { IProduct, IProductCategory } from '../../../assets/models/index';
import { DataService } from 'src/app/services/data.service.js';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: []
})
export class ProductsPageComponent implements OnInit, AfterViewInit, AfterViewChecked {

  productsShown: IProduct[];
  @Output() chosenProduct = new EventEmitter<IProduct>();
  @ViewChildren('btn') buttons: QueryList<ElementRef>;
  get productsData(): IProduct[] { return this.dataService.getProducts() };
  get categoryData(): IProductCategory[] { return this.dataService.getCategories() };
  get categories(): string[] { return this.dataService.getCategoriesName() };
  get isLogged(): boolean {return this.userService.isLoggedIn};
  get isAdmin(): boolean {return this.userService.isAdmin};

  constructor(
    private dataService: DataService,
    private cartService: CartService,
    private userService: UserService,
    private renderer: Renderer2
  ) { }

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

  showDetailsPage(productTitle: String) {
    this.chosenProduct.emit(this.productsData.find(p => p.Title === productTitle));
  }

  changeProductState(productTitle: String) {
    let button: ElementRef = this.buttons.find(button => button.nativeElement.value === productTitle);
    let status: boolean = this.cartService.getProductState(button.nativeElement.value);
    if (status) {
      this.cartService.removeFromCart(button.nativeElement.value);
      button.nativeElement.style.backgroundImage = "url('../../../assets/icons/buy.svg')";
    }
    else {
      this.cartService.addToCart(button.nativeElement.value);
      button.nativeElement.style.backgroundImage = "url('../../../assets/icons/remove.svg')";
    }
  }

  ngOnInit() {
    this.productsShown = this.productsData;
  }

  ngAfterViewInit() {
    this.buttons.forEach(button => this.cartService.getProductState(button.nativeElement.value)
      ? this.renderer.setStyle(button.nativeElement, "background-image", "url('../../../assets/icons/remove.svg')")
      : this.renderer.setStyle(button.nativeElement, "background-image", "url('../../../assets/icons/buy.svg')"));
  }

  ngAfterViewChecked() {
    this.buttons.forEach(button => this.cartService.getProductState(button.nativeElement.value)
      ? this.renderer.setStyle(button.nativeElement, "background-image", "url('../../../assets/icons/remove.svg')")
      : this.renderer.setStyle(button.nativeElement, "background-image", "url('../../../assets/icons/buy.svg')"));
  }

}
