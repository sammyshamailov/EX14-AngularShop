import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItems } from '../../../assets/models/index';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() chosenPage = new EventEmitter<String>();
  menuItems = MenuItems;
  get cartAmount(): number { return this.cartService.getProducts().length };
  get isLogged(): boolean { return this.userService.isLoggedIn };
  get isAdmin(): boolean { return this.userService.isAdmin };

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) { }

  menuItemClicked(menuItem: String) {
    if (menuItem.includes('Cart')) {
      this.chosenPage.emit('Cart');
    }
    else {
      this.chosenPage.emit(menuItem);
    }
  }

  ngOnInit() {
  }

}
