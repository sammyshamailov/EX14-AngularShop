import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() isVisible = new EventEmitter<boolean>();
  isMenuVisible = false;

  constructor() { }

  /**
   * Reverts the menu visibility state and
   * emits the current visibilty state to app component.
   */
  RevertMenuState(): void {
    this.isVisible.emit(!this.isMenuVisible);
    this.isMenuVisible = !this.isMenuVisible;
  }

  ngOnInit() {
  }

}
