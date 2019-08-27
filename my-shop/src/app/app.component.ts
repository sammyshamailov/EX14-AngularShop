import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { IProduct, MenuItems } from '../assets/models/index';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("fade", [
      transition("* => *", [
        style({ opacity: 0 }),
        animate("0.2s 0.4s ease-in")])
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
  editProduct: IProduct;
  chosenLang: String = "EN";

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private localizationService: LocalizationService) { }

  updateVisibility() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  showChosenPage(chosenPage: String) {
    this.editProduct = null;
    if (chosenPage === this.menuItems.LogOut) {
      this.userService.logOut();
      this.chosenPage = this.menuItems.Home;
      this.menuState = this.menuState === 'out' ? 'in' : 'out';
    }
    else {
      this.chosenPage = chosenPage;
      this.menuState = this.menuState === 'out' ? 'in' : 'out';
    }
    if (this.deatailsPageShown)
      this.deatailsPageShown = !this.deatailsPageShown;
  }

  changeLang(langauge: string){
    this.chosenLang = langauge;
  }

  showDetailsPage(product: IProduct) {
    this.chosenProduct = product;
    this.deatailsPageShown = !this.deatailsPageShown;
  }

  showEditPage(product: IProduct) {
    this.editProduct = product;
    this.chosenPage = this.localizationService.getTranslation(this.menuItems.Admin, '');
  }

  hideDetailsPage() {
    this.deatailsPageShown = !this.deatailsPageShown;
  }

  ngOnInit() {
    this.chosenProduct = this.dataService.getProducts()[0];
  }
}
