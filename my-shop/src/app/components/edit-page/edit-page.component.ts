import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { IProduct } from 'src/assets/models';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  private editForm: FormGroup;
  private popupHidden: boolean = true;
  private categoriesNames: string[];
  private editProduct: IProduct;
  get categories(): string[] { return this.dataService.getCategoriesName(); };
  get CategoryForm(): AbstractControl { return this.editForm.get('Category'); };
  get ImageForm(): AbstractControl { return this.editForm.get('Image'); };
  get BigImageForm(): AbstractControl { return this.editForm.get('BigImage'); };
  get TitleForm(): AbstractControl { return this.editForm.get('Title'); };
  get PriceForm(): AbstractControl { return this.editForm.get('Price'); };
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

  onSubmit() {
    const formModel = this.editForm.value;
    this.dataService.writeToList(formModel);
    this.popupHidden = false;
  }

  closePopup() {
    this.popupHidden = true;
  }

  ngOnInit() {
    this.categoriesNames = this.categories;
    this.categoriesNames.splice(this.categoriesNames.findIndex(p => p === "All"), 1);
    if (this.dataService.getToEdit()) {
      this.editProduct = this.dataService.getProduct(this.dataService.getProductForEdit());
      this.editForm.setValue({
        Category: this.dataService.getProductCategory(this.editProduct.CategoryId),
        Image: this.editProduct.Image,
        BigImage: this.editProduct.BigImage,
        Title: this.editProduct.Title,
        Price: this.editProduct.Price,
        Description: this.editProduct.Description
      });
      this.dataService.setToEdit();
    }
  }
}
