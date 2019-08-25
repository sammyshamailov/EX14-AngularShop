import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { IProduct } from 'src/assets/models';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnChanges {

  private editForm: FormGroup;
  get categories(): string[] { return this.dataService.getCategoriesName() };
  categoriesNames: string[];
  @Input() editProduct: IProduct;


  constructor(
    fb: FormBuilder,
    private dataService: DataService
  ) {
    this.editForm = fb.group({
      Category: ['', Validators.required],
      Image: ['', Validators.required],
      BigImage: ['', Validators.required],
      Title: ['', Validators.required],
      Price: [0, [Validators.required, Validators.min(1)]],
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
    const temp = JSON.stringify(this.dataService.getProducts()[0]);
    let product: IProduct = JSON.parse(temp);
    product.Title = formModel.Title;
    product.Price = formModel.Price as string;
    product.Image = formModel.Image;
    product.BigImage = formModel.BigImage;
    product.Description = formModel.Description;
    product.CategoryId = this.dataService.getCategoryId(formModel.Category);
    this.dataService.writeToFile(product);
  }

  ngOnInit() {
    this.categoriesNames = this.categories;
    this.categoriesNames.splice(this.categoriesNames.findIndex(p => p === "All"), 1);
  }

  ngOnChanges() {
    if (this.editProduct) {
      this.editForm.setValue({
        Category: this.dataService.getProductCategory(this.editProduct.CategoryId),
        Image: this.editProduct.Image,
        BigImage: this.editProduct.BigImage,
        Title: this.editProduct.Title,
        Price: this.editProduct.Price,
        Description: this.editProduct.Description
      });
    }
  }

}
