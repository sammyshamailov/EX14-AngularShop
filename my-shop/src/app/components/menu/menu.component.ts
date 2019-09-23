import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { MenuItems } from 'src/app/shared/models/menu-items';
import { User } from 'src/app/shared/models/user';
import { IProduct } from 'src/app/shared/models/iproduct';

import { UserService } from '../../core/services/user.service';
import { LocalizationService } from '../../core/services/localization.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() chosenPage = new EventEmitter<string>();
  menuItems = MenuItems;
  currentUser$: Observable<User>;
  currentCart$: Observable<IProduct[]>;
  get currLanguage(): string { return this.localizationService.currLanguage; }

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private localizationService: LocalizationService,
    private router: Router
  ) { }

  /**
   * function that emits when an item on menu is clicked.
   * It emits an output to app component for menu sliding.
   * @param menuItem a string representation of menu item.
   */
  menuItemClicked(menuItem: string): void {
    if (menuItem === this.menuItems.LogOut) {
      this.userService.logOut();
      this.router.navigate(['/home']);
    }
    this.chosenPage.emit('');
  }

  /**
   * function that emits when an language item is clicked.
   * It sends the requested lang to the service.
   * @param chosenLang a string representation of language.
   */
  changeLang(chosenLang: string): void {
    this.localizationService.changeCurrentLanguage(chosenLang);
  }

  ngOnInit() {
    this.currentUser$ = this.userService.usersObserv;
    this.currentCart$ = this.cartService.cart;
  }
}
