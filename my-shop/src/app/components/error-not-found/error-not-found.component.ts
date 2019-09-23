import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-not-found',
  templateUrl: './error-not-found.component.html',
  styleUrls: ['./error-not-found.component.css']
})
export class ErrorNotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  /**
   * Navigates to home component when 42 image is clicked.
   */
  moveToHomePage(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
