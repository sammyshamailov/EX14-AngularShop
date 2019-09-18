import { Component, OnInit } from '@angular/core';

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

  /**
   * Submits the details entered in contact form.
   * Emits on submit button click.
   */
  submitContact(): void {
    console.log("Email: ", this.email, "\nSubject: ", this.subject, "\nMessage: ", this.message);
  }

  /**
   * Logs choice of user from the confirm box.
   * @param message The choice of user.
   */
  printChoice(message: string): void {
    console.log(message);
  }

  ngOnInit() { }

}
