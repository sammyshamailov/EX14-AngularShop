import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { IProduct } from 'src/models/iproduct';
import { Observable } from 'rxjs';
import { IProductCategory } from 'src/models/iproduct-category';

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
    let product: IProduct = {
      Title: ` ${formModel.Title} `,
      Price: formModel.Price as string,
      Image: formModel.Image,
      BigImage: formModel.BigImage,
      Description: formModel.Description,
      CategoryId: formModel.Category.id,
      id: this.dataService.getToEdit() ? this.editProduct.id : (this.dataService.newProductId).toString()
    };
    if(this.dataService.getToEdit()){
      this.dataService.setToEdit();
    }
    this.dataService.writeToList(product);
    this.popupHidden = false;
  }

  closePopup() {
    this.popupHidden = true;
  }

  ngOnInit() {
    this.categories$ = this.dataService.categoriesObserv;
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
