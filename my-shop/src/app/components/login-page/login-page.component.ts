import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router) { }

  logIn() {
    if (this.userService.logIn(this.username, this.password)) {
      this.cartService.currentCart(this.username);
      this.router.navigate(['/home']);
    }
    else {
      alert("incorrect username or password");
    }
  }

  ngOnInit() {
  }

}
