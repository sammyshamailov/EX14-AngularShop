import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MenuItems } from '../../../assets/models/index';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: []
})
export class MenuComponent implements OnInit {

  @Output() chosenPage = new EventEmitter<String>();
  get menuItems(): string[] {return Object.values(MenuItems)};
  get cartAmount(): number {return this.cartService.getProducts().length};

  constructor(private cartService: CartService) { }

  menuItemClicked(e: String){
    if(e.includes('Cart')){
      this.chosenPage.emit('Cart');
    }
    else{
      this.chosenPage.emit(e);
    }
  }

  ngOnInit() {
  }

}
