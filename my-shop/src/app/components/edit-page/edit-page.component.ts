import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { IProduct } from 'src/models/iproduct';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  editForm: FormGroup;
  popupHidden: boolean = true;
  categoriesNames: string[];
  editProduct: IProduct;
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
    const tempProduct = JSON.stringify(this.dataService.getProducts()[0]);
    let product: IProduct = JSON.parse(tempProduct);
    product.Title = ` ${formModel.Title} `;
    product.Price = formModel.Price as string;
    product.Image = formModel.Image;
    product.BigImage = formModel.BigImage;
    product.Description = formModel.Description;
    product.CategoryId = this.dataService.getCategoryId(formModel.Category);
    product.id = this.dataService.getToEdit()? this.editProduct.id: `${this.dataService.productListLength + 1}`;
    this.dataService.setToEdit();
    this.dataService.writeToList(product);
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
        Title: this.editProduct.Title.substring(1,this.editProduct.Title.length-1),
        Price: this.editProduct.Price,
        Description: this.editProduct.Description
      });
      this.editForm.markAsDirty();
    }
  }
}
