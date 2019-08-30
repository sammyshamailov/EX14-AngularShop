import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../../assets/models/index';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  chosenProduct: IProduct;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) { }

  hideDetailsPage() {
    this.router.navigate(['../products']);
  }

  ngOnInit() {
    this.chosenProduct = this.dataService.getProduct(this.route.snapshot.paramMap.get(('title')));
  }

}
