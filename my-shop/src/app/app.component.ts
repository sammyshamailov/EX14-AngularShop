import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { MenuItems } from '../models/menu-items';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { slider } from './route-animations';

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

  constructor(
    private userService: UserService,
    private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  updateVisibility(event) {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  showChosenPage(chosenPage: String) {
    if (chosenPage === this.menuItems.LogOut) {
      this.userService.logOut();
      this.router.navigate(['/home']);
    }
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  ngOnInit() {
  }
}
