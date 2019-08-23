import { Injectable } from '@angular/core';
import Users from '../../assets/static/user.json'

interface User{
  Username: string;
  Password: string;
  isAdmin: boolean;
  cartPlace: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = Users;
  private isLogged: boolean = false;
  private currentUser: User;
  get numOfUsers(): number {return Users.length};
  get isLoggedIn(): boolean {return this.isLogged};
  get isAdmin(): boolean {return this.currentUser? this.currentUser.isAdmin: false;};
  get cartPlace(): number {return this.currentUser.cartPlace};

  constructor() {}

  logIn(username: string, password: string): boolean {
    this.currentUser = this.users.find(p => p.Username === username && p.Password === password);
    if(this.currentUser){
      console.log(this.cartPlace);
      this.isLogged = true;
      return true;
    }
    return false;
  }

  logOut(): void {
    this.isLogged = false;
    this.currentUser = null;
  }
}
