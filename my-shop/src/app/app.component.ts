import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { slider } from './route-animations';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { MenuItems } from 'src/app/shared/models/menu-items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-110%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    slider,
  ]
})
export class AppComponent implements OnInit {

  menuItems = MenuItems;
  menuState: string = 'out';

  constructor() {}

  /**
   * Returns the current activated route.
   * @param outlet The root outlet.
   * @returns The current activated route.
   */
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  /**
   * Updates visibility of menu.
   * Emits when hamburger/menu item is clicked.
   */
  updateVisibility(): void {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  ngOnInit() {
  }
}
