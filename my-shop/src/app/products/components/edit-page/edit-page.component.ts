import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { IProductCategory } from 'src/app/shared/models/iproduct-category';
import { IProduct } from 'src/app/shared/models/iproduct';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  editForm: FormGroup;
  popupHidden: boolean = true;
  editProduct: IProduct;
  categories$: Observable<IProductCategory[]>;
  editProductCategory: IProductCategory;

  //getters for the form controls.
  get CategoryForm(): AbstractControl { return this.editForm.get('Category') };
  get ImageForm(): AbstractControl { return this.editForm.get('Image') };
  get BigImageForm(): AbstractControl { return this.editForm.get('BigImage') };
  get TitleForm(): AbstractControl { return this.editForm.get('Title') };
  get PriceForm(): AbstractControl { return this.editForm.get('Price') };
  get isDirty(): boolean { return this.editForm.dirty };

  constructor(
    fb: FormBuilder,
    private dataService: DataService
  ) {
    this.editForm = fb.group({
      Category: ['', Validators.required],
      Image: ['', Validators.required],
      BigImage: ['', Validators.required],
      Title: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(1)]],
      Description: ''
    });
  }

  /**
   * Resets the form to initial state.
   */
  revert(): void {
    this.editForm.reset({
      Category: '',
      Image: '',
      BigImage: '',
      Title: '',
      Price: '',
      Description: ''
    });
  }

  /**
   * function for sending the edited or new product to the service.
   */
  onSubmit(): void {
    const formModel = this.editForm.value;
    let product: IProduct = {
      Title: ` ${formModel.Title} `,
      Price: formModel.Price as string,
      Image: formModel.Image,
      BigImage: formModel.BigImage,
      Description: formModel.Description,
      CategoryId: formModel.Category.id,
      id: this.dataService.getToEdit() ? this.editProduct.id : (this.dataService.newProductId).toString()
    };
    //enter when the admin submitted an product edit.
    if (this.dataService.getToEdit()) {
      this.dataService.setToEdit();
    }
    this.dataService.writeToList(product);
    this.popupHidden = false;
  }

  /**
   * Closes popup when X pressed.
   */
  closePopup(): void {
    this.popupHidden = true;
  }

  ngOnInit() {
    this.categories$ = this.dataService.categoriesObserv;
    //enter when the admin wants to edit a product.
    if (this.dataService.getToEdit()) {
      this.editProduct = this.dataService.getProductForEdit();
      this.editForm.setValue({
        Category: this.dataService.getCategory(this.editProduct.CategoryId),
        Image: this.editProduct.Image,
        BigImage: this.editProduct.BigImage,
        Title: this.editProduct.Title.substring(1, this.editProduct.Title.length - 1),
        Price: this.editProduct.Price,
        Description: this.editProduct.Description
      });
      this.editForm.markAsDirty();
    }
  }
}

