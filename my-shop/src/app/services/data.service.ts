import { Injectable } from '@angular/core';
import Category from '../../assets/static/category.json';
import { IProduct } from '../../models/iproduct';
import { IProductCategory } from '../../models/iproduct-category';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _products = new BehaviorSubject([]);
  public readonly productsObserv: Observable<IProduct[]> = this._products.asObservable();
  private products: IProduct[] = [];

  private _categories = new BehaviorSubject([]);
  public readonly categoriesObserv: Observable<IProductCategory[]> = this._categories.asObservable();
  
  private editProduct: boolean = false;
  private productToEdit: IProduct;
  private chosenCategory: string = 'All';
  private productShow: IProduct;

  set productToShow(product: IProduct) {
    this.productShow = product;
  };
  get productToShow(): IProduct {
    return this.productShow;
  };
  get category(): string {
    return this.chosenCategory;
  };
  get productListLength(): number {
    return this.products.length;
  };

  constructor(private http: HttpClient) {
    this.loadProducts();
    this.loadCategories();
  }

  /**
   * Gets the products data and changes it accordingly.
   * @returns promise representation of the products list.
   */
  getProductsPromise(): Promise<IProduct[]> {
    return this.http.get('../../assets/static/product.json')
      .pipe(
        map(json => json as IProduct[]),
        map(products => this.products = products),
        share()
      )
      .toPromise()
      .catch(error => Promise.reject('error'));
  }


  /**
   * Loads products into the BehaviorSubject variable.
   */
  private loadProducts() {
    this.getProductsPromise()
      .then((o) => { this._products.next(o); });
  }

  /**
   * Gets the categories data and changes it accordingly.
   * @returns promise representation of the categories list.
   */
  getCategoriesPromise(): Promise<IProductCategory[]> {
    return this.http.get('../../assets/static/category.json')
      .pipe(
        map(json => json as IProductCategory[]),
        share()
      )
      .toPromise()
      .catch(error => Promise.reject('error'));
  }


  /**
   * Loads categories into the BehaviorSubject variable.
   */
  private loadCategories() {
    this.getCategoriesPromise()
      .then((o) => { 
        this._categories.next(o); 
      });
  }


  /**
   * Sets the current category that was chosen by user.
   * @param categoryName chosen category from dropdown box.
   */
  setCategory(category: IProductCategory) {
    this.chosenCategory = category.Title;
    let shownProducts: IProduct[] = [];
    if (category.Title !== 'All') {
      shownProducts = this.products.filter(product => product.CategoryId === category.id);
    }
    else {
      shownProducts = this.products;
    }
    this._products.next(shownProducts);
  }


  /**
   * Sets the state for editing an product to true.
   * this add/edit page knows if the user wants to edit or add new product.
   */
  setToEdit(): void {
    this.editProduct = !this.editProduct;
  }

  /**
   * Gets the state of editing an product.
   * @returns true if the user clicked on edit button.
   */
  getToEdit(): boolean {
    return this.editProduct;
  }

  /**
   * Sets product for editing mode.
   * @param product this is the product that was selected for edit.
   */
  setProductForEdit(product: IProduct): void {
    this.productToEdit = product;
  }

  /**
   * Gets product for editing mode.
   * @returns the product that needs to be edited.
   */
  getProductForEdit(): IProduct {
    return this.productToEdit;
  }

  /**
   * Writes to the products list.
   * @param product the product that was added/edited
   */
  writeToList(product: IProduct) {
    let productIndex: number = this.products.findIndex(p => p.id === product.id);
    if (productIndex !== -1) {
      this.products[productIndex] = product;
    }
    else {
      this.products.push(product);
    }
    this._products.next(this.products);
  }

  getCategory(categoryId: string): IProductCategory {
    // return this.getCategories().find(p => p.Title === category).id;
    return this._categories.value.find(category => category.id === categoryId);
  }
}
