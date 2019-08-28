import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItems } from '../../../assets/models/index';
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
  @Output() chosenLang = new EventEmitter<String>();
  language: string = "EN";
  menuItems = MenuItems;
  get cartAmount(): number { return this.cartService.getProducts().length };
  get isLogged(): boolean { return this.userService.isLoggedIn };
  get isAdmin(): boolean { return this.userService.isAdmin };

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private localizationService: LocalizationService
  ) { }

  menuItemClicked(menuItem: String) {
    if (menuItem.includes(this.localizationService.language["Cart"])) {
      this.chosenPage.emit(this.localizationService.language["Cart"]);
    }
    else if (menuItem === this.localizationService.language["Log Out"]) {
      this.userService.logOut();
      this.chosenPage.emit(this.menuItems.Home);
    }
    else {
      this.chosenPage.emit(menuItem);
    }
  }

  changeLang(chosenLang: string) {
    this.language = chosenLang;
    this.localizationService.changeLang(this.language);
    this.chosenLang.emit(this.language);
  }

  ngOnInit() {
  }

}
