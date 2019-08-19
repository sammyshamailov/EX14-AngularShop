import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { IProduct } from '../assets/models/index';
import Product from '../assets/static/product.json';
import { MenuItems } from '../assets/models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [trigger("fade", [
    state("void", style({ opacity: 0 })),
    transition("void => *", [animate("0.5s ease-in-out")])
    ])]
})
export class AppComponent implements OnInit {

  isVisible: boolean = false;;
  chosenPage: string;
  deatailsPageShown: boolean = false;
  chosenProduct: IProduct;
  menuItems = MenuItems;;

  updateVisibility(){
    this.isVisible = !this.isVisible;
  }

  showChosenPage(e:string){
    this.chosenPage = e;
    this.isVisible = !this.isVisible;
    if(this.deatailsPageShown)
      this.deatailsPageShown = !this.deatailsPageShown;
  }

  showDetailsPage(product: IProduct){
    this.chosenProduct = product;
    this.deatailsPageShown = !this.deatailsPageShown;
  }

  hideDetailsPage(){
    this.deatailsPageShown = !this.deatailsPageShown;
  }

  ngOnInit(){
    this.chosenProduct = (Product as IProduct[])[0];
  }
}
