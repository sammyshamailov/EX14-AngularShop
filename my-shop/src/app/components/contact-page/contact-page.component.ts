import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  email: string;
  subject: string;
  message: string = "";

  constructor() { }

  submitContact() {
    console.log("Email: ", this.email, "\nSubject: ", this.subject, "\nMessage: ", this.message);
  }

  printChoice(message: string) {
    console.log(message);
  }

  ngOnInit() {
  }

}
