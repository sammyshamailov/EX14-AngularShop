import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() isVisible = new EventEmitter<boolean>();
  visible: boolean = false;

  constructor() { }

  /**
   * Determines whether menu is visible or not.
   * emits the current visibilty to app component.
   */
  isMenuVisible(): void {
    this.isVisible.emit(!this.visible);
    this.visible = !this.visible;
  }

  ngOnInit() {
  }

}
