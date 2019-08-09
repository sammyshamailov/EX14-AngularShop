import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() isVisible: boolean;
  @Output() chosenPage = new EventEmitter<string>();

  constructor() { }

  menuItemClicked(e){
    this.chosenPage.emit(e.target.innerText);
  }

  ngOnInit() {
  }

}
