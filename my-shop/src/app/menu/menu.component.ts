import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MenuItems } from '../../assets/models/index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('slide', [
      state('out', style({ width: '*' })),
      transition('* => void', [
        style({width: '*'}),
        animate(1000, style({width: 0}))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {

  @Input() isVisible: boolean;
  @Output() chosenPage = new EventEmitter<string>();
  menuItems = MenuItems;
  get status (): string { return this.isVisible ? ' active': ' inactive'};

  constructor() { }

  menuItemClicked(e){
    this.chosenPage.emit(e.target.innerText);
  }

  ngOnInit() {
  }

}
