import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IProduct, IProductCategory } from '../../../assets/models/index';
import { DataService } from 'src/app/services/data.service.js';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: [DataService]
})
export class ProductsPageComponent implements OnInit {

  productsShown: IProduct[];
  @Output() chosenProduct = new EventEmitter<IProduct>();

  constructor(private dataService: DataService) { }

  get productsData(): IProduct[] {return this.dataService.getProducts()};
  get categoryData(): IProductCategory[] {return this.dataService.getCategories()};
  get categories(): string[] {return this.dataService.getCategoriesName()};

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

  ngOnInit() {
    this.productsShown = this.productsData;
  }

}
