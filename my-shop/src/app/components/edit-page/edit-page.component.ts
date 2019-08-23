import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  editForm: FormGroup;
  get categories(): string[] { return this.dataService.getCategoriesName() };
  categoriesNames: string[];


  constructor(
    fb: FormBuilder,
    private dataService: DataService
  ) {
    this.editForm = fb.group({
      Category: '',
      Image: '',
      BigImage: '',
      Title: '',
      Price: '',
      Description: ''
    });
  }

  revert(): void {
    this.editForm.reset({
      Category: ['', Validators.required],
      Image: ['', Validators.required],
      BigImage: ['', Validators.required],
      Title: ['', Validators.required],
      Price: [0, [Validators.required, Validators.min(1)]],
      Description: ''
    });
  }

  ngOnInit() {
    this.categoriesNames = this.categories;
    this.categoriesNames.splice(this.categoriesNames.findIndex(p => p === "All"), 1);
  }

}
