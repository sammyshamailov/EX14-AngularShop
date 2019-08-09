import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-choice',
  templateUrl: './category-choice.component.html',
  styleUrls: ['./category-choice.component.css']
})
export class CategoryChoiceComponent implements OnInit {

  @Output() chosenCategory = new EventEmitter<string>();

  constructor() { }

  showChosenCategory(e){
    this.chosenCategory.emit(e.target.value);
  }

  ngOnInit() {
  }

}
