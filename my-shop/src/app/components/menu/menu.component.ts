import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, delay } from 'rxjs/operators';

import { MenuItems } from 'src/models/menu-items';
import { User } from '../../../models/user';

import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { IProduct } from 'src/models/iproduct';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() chosenPage = new EventEmitter<String>();
  menuItems = MenuItems;
  currentUser$: Observable<User>;
  currentCart$: Observable<IProduct[]>;
  temp;
  get currLanguage(): string { return this.localizationService.currLanguage };
  cartAmount: number;

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
    this.currentUser$ = this.userService.usersObserv;
    this.temp = this.cartService.cart.subscribe(p => this.cartAmount = p.length);
  }
}
