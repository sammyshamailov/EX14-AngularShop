import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isVisible: boolean = false;
  chosenPage: string = "Home";

  updateVisibility(){
    this.isVisible = !this.isVisible;
  }

  showChosenPage(e:string){
    this.chosenPage = e;
    console.log("app", e)
  }
}
