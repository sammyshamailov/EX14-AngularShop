import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../assets/models/index';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  chosenProduct: IProduct;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location) { }

  hideDetailsPage() {
    this.location.back();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.chosenProduct = this.dataService.getProduct(params.get('title'));
    });
  }

}
