import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

import { IProduct } from '../../../models/iproduct';

import { DataService } from '../../services/data.service';


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

  /**
   * Hides details page.
   * If called from cart, then navigates to cart.
   * else goes to last location.
   */
  hideDetailsPage(): void {
    this.router.routerState.snapshot.url.includes('cart') ? this.router.navigate(['/cart']) : this.location.back();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.chosenProduct = this.dataService.productToShow;
    });
  }

  ngOnDestroy(){
    this.chosenProduct = null;
  }

}
