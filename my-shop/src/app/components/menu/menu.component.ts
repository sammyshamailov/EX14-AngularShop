import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuItems } from 'src/models/menu-items';
import { User } from '../../../models/user';

import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { LocalizationService } from 'src/app/services/localization.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() chosenPage = new EventEmitter<String>();
  menuItems = MenuItems;
  curentUser$: Observable<User>;
  get cartAmount(): number { return this.cartService.getProducts().length };
  get currLanguage(): string { return this.localizationService.currLanguage };

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private localizationService: LocalizationService
  ) { }

  menuItemClicked(menuItem) {
    if (menuItem.srcElement.title === this.menuItems.LogOut) {
      this.chosenPage.emit(this.menuItems.LogOut);
    }
    else {
      this.chosenPage.emit('');
    }
  }

  changeLang(chosenLang: string) {
    this.localizationService.changeLang(chosenLang);
  }

  ngOnInit() {
    this.curentUser$ = this.userService.usersObserv;
  }

}
