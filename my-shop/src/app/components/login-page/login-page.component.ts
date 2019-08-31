import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router) { }

  logIn() {
    if (this.userService.logIn(this.username, this.password)) {
      this.cartService.currentCart = this.userService.cartPlace;
      this.router.navigate(['/home']);
    }
    else {
      alert("incorrect username or password");
    }
  }

  ngOnInit() {
  }

}
