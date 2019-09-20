import { Component, OnInit, Input } from '@angular/core';

import { IProductCategory } from 'src/app/shared/models/iproduct-category';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-category-choice',
  templateUrl: './category-choice.component.html',
  styleUrls: ['./category-choice.component.css']
})
export class CategoryChoiceComponent implements OnInit {

  @Input() categories: IProductCategory[];
  get chosenCategory(): string { return this.dataService.category }

  constructor(private dataService: DataService) { }

  /**
   * The function sends the selected category to the service
   * and product-list component sets the filtered products.
   * @param categoryName The selected category.
   */
  showChosenCategory(categoryName: string): void {
    this.dataService.setCategory(this.categories.find(p => p.Title === categoryName));
  }

  ngOnInit() { }
}
