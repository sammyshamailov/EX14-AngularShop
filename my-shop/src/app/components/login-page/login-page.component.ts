import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { MenuItems } from '../../../assets/models/index'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  private username: string;
  private password: string;
  @Output() backToHome = new EventEmitter<String>();

  constructor(private userService: UserService, private cartService: CartService) { }

  logIn(){
    if(this.userService.logIn(this.username, this.password)){
      this.cartService.currentCart = this.userService.cartPlace;
      this.backToHome.emit("goHome");
    }
    else{
      alert("incorrect username or password");
    }
  }

  ngOnInit() {
  }

}
