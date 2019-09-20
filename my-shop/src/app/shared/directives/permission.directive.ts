import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {
  @Input('appPermission') message: string;
  @Output() confirmation = new EventEmitter<string>();

  constructor() { }

  @HostListener('click') onclick() {
    this.confirmation.emit(confirm(this.message) ? 'Yes' : 'No');
  }

}
