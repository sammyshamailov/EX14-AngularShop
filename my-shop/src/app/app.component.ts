import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { IProduct, MenuItems } from '../assets/models/index';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

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

  menuItems = MenuItems;
  menuState: string = 'out';

  constructor(
    private userService: UserService,
    private router: Router) { }

  updateVisibility() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  showChosenPage(chosenPage: String) {
    if(chosenPage === this.menuItems.LogOut){
      this.userService.logOut();
      this.router.navigate(['/home']);
    }
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  ngOnInit() {

  }
}
