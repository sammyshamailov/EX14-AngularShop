import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  email: string;
  subject: string;
  message = '';

  constructor() { }

  /**
   * Submits the details entered in contact form.
   * Emits on submit button click.
   */
  submitContactForm(): void {
    console.log('Email: ', this.email, '\nSubject: ', this.subject, '\nMessage: ', this.message);
  }

  /**
   * Logs choice of user from the confirm box.
   * @param message The choice of user.
   */
  printUserChoice(message: string): void {
    console.log(message);
  }

  ngOnInit() { }

}
