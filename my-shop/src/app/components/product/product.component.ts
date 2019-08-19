import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../../assets/models/index';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() chosenProduct: IProduct;
  @Output() deatailsPageShown = new EventEmitter<boolean>();

  constructor() { }

  hideDetailsPage(){
    this.deatailsPageShown.emit();
  }

  ngOnInit() {
  }

}
