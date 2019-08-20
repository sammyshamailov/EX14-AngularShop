import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { IProduct, IProductCategory } from '../../../assets/models/index';
import { DataService } from 'src/app/services/data.service.js';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: []
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

  showDetailsPage(productTitle: String){
    this.chosenProduct.emit(this.productsData.find(p => p.Title === productTitle));
  }

  changeProductState(productTitle: String){
    let button: ElementRef =  this.buttons.find(button => button.nativeElement.value === productTitle);
    let status: boolean = this.cartService.getProductState(button.nativeElement.value);
    if(status){
      this.cartService.removeFromCart(button.nativeElement.value);
      button.nativeElement.innerHTML = 'Add';
    }
    else{
      this.cartService.addToCart(button.nativeElement.value);
      button.nativeElement.innerHTML = 'Remove';
    }
  }

  ngOnInit() {
    this.productsShown = this.productsData;
  }

  ngAfterViewInit(){
    this.buttons.forEach(button => button.nativeElement.innerHTML = this.cartService.getProductState(button.nativeElement.value)? 'Remove': 'Add');
  }

  ngAfterViewChecked() {
    this.buttons.forEach(button => button.nativeElement.innerHTML = this.cartService.getProductState(button.nativeElement.value)? 'Remove': 'Add');
  }

}
