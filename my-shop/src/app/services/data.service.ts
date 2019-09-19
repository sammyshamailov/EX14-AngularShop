import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IProduct } from 'src/app/shared/models/iproduct';
import { IProductCategory } from 'src/app/shared/models/iproduct-category';

import { CartService } from './cart.service';

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
  private latestId: number;

  /**
   * Sets a product that was chosen for details.
   */
  set productToShow(product: IProduct) {
    this.productShow = product;
  };

  /**
   * returns a product that was chosen for details.
   */
  get productToShow(): IProduct {
    return this.productShow;
  };

  /**
   * returns the current category that was chosen by the user.
   */
  get category(): string {
    return this.chosenCategory;
  };

  /**
   * returns new id for new product generated with the last product id.
   */
  get newProductId(): number {
    return ++this.latestId;
  };

  constructor(private http: HttpClient, private cartService: CartService) {
    this.loadProducts();
    this.loadCategories();
  }

  /**
   * Gets the products data and changes it accordingly.
   * @returns promise representation of the products list.
   */
  private getProductsPromise(): Promise<IProduct[]> {
    return this.http.get('../../assets/static/product.json')
      .pipe(
        map(json => json as IProduct[])
      )
      .toPromise()
      .catch(error => Promise.reject('error'));
  }

  /**
   * Loads products into the BehaviorSubject variable.
   */
  private loadProducts() {
    this.getProductsPromise()
      .then((o) => {
        this.products = o;
        this._products.next(o);
        this.latestId = o.length;
      });
  }

  /**
   * Gets the categories data and changes it accordingly.
   * @returns promise representation of the categories list.
   */
  private getCategoriesPromise(): Promise<IProductCategory[]> {
    return this.http.get('../../assets/static/category.json')
      .pipe(
        map(json => json as IProductCategory[])
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
  public setCategory(category: IProductCategory) {
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
  public setToEdit(): void {
    this.editProduct = !this.editProduct;
  }

  /**
   * Gets the state of editing an product.
   * @returns true if the user clicked on edit button.
   */
  public getToEdit(): boolean {
    return this.editProduct;
  }

  /**
   * Sets product for editing mode.
   * @param product this is the product that was selected for edit.
   */
  public setProductForEdit(product: IProduct): void {
    this.productToEdit = product;
  }

  /**
   * Gets product for editing mode.
   * @returns the product that needs to be edited.
   */
  public getProductForEdit(): IProduct {
    return this.productToEdit;
  }

  /**
   * Writes to the products list.
   * @param product the product that was added/edited
   */
  public writeToList(product: IProduct): void {
    let productIndex: number = this.products.findIndex(p => p.id === product.id);
    if (productIndex !== -1) {
      this.products[productIndex] = product;
      this.cartService.updateProduct(product);
    }
    else {
      this.products.push(product);
    }
    this._products.next(this.products);
  }

  /**
   * Gets category with the desired id and returns it.
   * @param categoryId the id of the desired category.
   * @returns the category object that has the same id .
   */
  public getCategory(categoryId: string): IProductCategory {
    let returnedCategory: IProductCategory;
    this.categoriesObserv.subscribe(
      categories => {
        returnedCategory = categories.find(category => category.id === categoryId)
      });
      return returnedCategory;
  }
}
