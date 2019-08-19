import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { IProduct, IProductCategory } from '../../../assets/models/index';
import { DataService } from 'src/app/services/data.service.js';
import { CartService, IProductState } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: [DataService, CartService]
})
export class ProductsPageComponent implements OnInit, AfterViewInit, AfterViewChecked {

  productsShown: IProduct[];
  @Output() chosenProduct = new EventEmitter<IProduct>();
  @ViewChildren ('btn') buttons : QueryList<ElementRef>;
  get productsData(): IProduct[] {return this.dataService.getProducts()};
  get categoryData(): IProductCategory[] {return this.dataService.getCategories()};
  get categories(): string[] {return this.dataService.getCategoriesName()};

  constructor(private dataService: DataService, private cartService: CartService) { }

  showChosenCategory(name: string){
    this.productsShown = [];
    if(name !== "All"){
      let categoryId: string = this.categoryData.find(p => p.Title === name).id;
      this.productsShown = this.productsData.filter(p => p.CategoryId === categoryId);
    }
    else{
      this.productsShown = this.productsData;
    }
  }

  showDetailsPage(e){
    this.chosenProduct.emit(this.productsData.find(p => p.Title === e.srcElement.alt));
  }

  getProductStatus(title: string): boolean {
    return this.cartService.getProductState(title);
  }

  changeProductState(event){
    let button: ElementRef =  this.buttons.find(button => button.nativeElement.value === event.target.value);
    let status: boolean = this.getProductStatus(button.nativeElement.value);
    if(status){
      this.cartService.removeFromCart(button.nativeElement.value);
      button.nativeElement.innerHTML = 'add';
    }
    else{
      this.cartService.addToCart(button.nativeElement.value);
      button.nativeElement.innerHTML = 'remove';
    }
  }

  ngOnInit() {
    this.productsShown = this.productsData;
  }

  ngAfterViewInit(){
    this.buttons.forEach(button => button.nativeElement.innerHTML = this.cartService.getProductState(button.nativeElement.value)? 'remove': 'add');
  }

  ngAfterViewChecked() {
    this.buttons.forEach(button => button.nativeElement.innerHTML = this.cartService.getProductState(button.nativeElement.value)? 'remove': 'add');
  }

}
