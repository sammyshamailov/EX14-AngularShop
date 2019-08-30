import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-category-choice',
  templateUrl: './category-choice.component.html',
  styleUrls: ['./category-choice.component.css']
})
export class CategoryChoiceComponent implements OnInit {

  @Output() chosenCategory = new EventEmitter<string>();
  @Input() categories: string[];

  constructor() { }

  showChosenCategory(categoryName: string){
    this.chosenCategory.emit(categoryName);
  }

  ngOnInit() {
  }

}
