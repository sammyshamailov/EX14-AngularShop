import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuItems } from 'src/models/menu-items';
import { User } from '../../../models/user';
import { IProduct } from 'src/models/iproduct';

import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { Router } from '@angular/router';

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
  get currLanguage(): string { return this.localizationService.currLanguage };

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private localizationService: LocalizationService,
    private router: Router
  ) { }

  menuItemClicked(menuItem: string): void {
    if (menuItem === this.menuItems.LogOut) {
      this.userService.logOut();
      this.router.navigate(['/home']);
    }
    this.chosenPage.emit('');
  }

  changeLang(chosenLang: string): void {
    this.localizationService.changeLang(chosenLang);
  }

  ngOnInit() {
    this.currentUser$ = this.userService.usersObserv;
    this.currentCart$ = this.cartService.cart;
  }
}
