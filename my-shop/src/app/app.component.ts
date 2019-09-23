import { Component, OnInit } from '@angular/core';
import { MenuItems } from 'src/app/shared/models/menu-items';

import { componentSlider, menuSlider } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    menuSlider,
    componentSlider,
  ]
})
export class AppComponent implements OnInit {

  menuItems = MenuItems;
  menuState = 'out';

  constructor() {}

  /**
   * Updates menu visibility state.
   * Emits when hamburger/menu item is clicked.
   */
  updateMenuVisibilityState(): void {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  ngOnInit() {
  }
}
