import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IProductCategory } from 'src/models/iproduct-category';

@Component({
  selector: 'app-category-choice',
  templateUrl: './category-choice.component.html',
  styleUrls: ['./category-choice.component.css']
})
export class CategoryChoiceComponent implements OnInit {

  @Input() categories: IProductCategory[];
  get chosenCategory(): string { return this.dataService.category}

  constructor(private dataService: DataService) { }

  showChosenCategory(categoryName: string){
    this.dataService.setCategory(this.categories.find(p => p.Title === categoryName));
  }

  ngOnInit() {
  }

}
