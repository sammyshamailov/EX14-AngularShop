import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MenuItems } from '../../../assets/models/index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: []
})
export class MenuComponent implements OnInit {

  @Output() chosenPage = new EventEmitter<string>();
  get menuItems(): string[] {return Object.values(MenuItems)};

  constructor() { }

  menuItemClicked(e){
    this.chosenPage.emit(e.target.innerText);
  }

  ngOnInit() {
  }

}
