import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { IProduct, MenuItems } from '../assets/models/index';
import { DataService } from './services/data.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, CartService],
  animations: [
    trigger("fade", [
    state("void", style({ opacity: 0 })),
    transition("void => *", [animate("0.5s ease-in-out")])
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class AppComponent implements OnInit {

  chosenPage: String;
  deatailsPageShown: boolean = false;
  chosenProduct: IProduct;
  menuItems = MenuItems;
  menuState: string = 'out';

  constructor(private dataService: DataService) { }

  updateVisibility(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  showChosenPage(e:String){
    this.chosenPage = e;
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
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
    this.chosenProduct = this.dataService.getProducts()[0];
  }
}
