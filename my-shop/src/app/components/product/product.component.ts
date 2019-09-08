import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from 'src/models/iproduct';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  chosenProduct: IProduct;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  hideDetailsPage() {
    this.router.routerState.snapshot.url.includes('cart') ? this.router.navigate(['/cart']) : this.location.back();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.chosenProduct = this.dataService.getProduct(params.get('title'));
    });
  }

  ngOnDestroy(){
    this.chosenProduct = null;
  }

}
