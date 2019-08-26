import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  private email: string;
  private subject: string;
  private message: string = "";

  constructor() { }

  submitContact(){
    console.log("Email: ", this.email, "\nSubject: ", this.subject, "\nMessage: ", this.message);
  }

  ngOnInit() {
  }

}
