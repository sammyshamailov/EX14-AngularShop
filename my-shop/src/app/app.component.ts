import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isVisible: boolean = false;
  chosenPage: string;

  updateVisibility(){
    this.isVisible = !this.isVisible;
  }

  showChosenPage(e:string){
    this.chosenPage = e;
    this.isVisible = !this.isVisible;
  }
}
