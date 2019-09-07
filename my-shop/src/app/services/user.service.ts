import { Injectable } from '@angular/core';
import Users from '../../assets/static/user.json'

interface User {
  Username: string;
  Password: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = Users;
  get numOfUsers(): number { return Users.length };
  get isLoggedIn(): boolean { return localStorage.getItem('user') ? true : false; };
  get isAdmin(): boolean {
    return localStorage.getItem('user')
      ? this.users.find(p => p.Username === localStorage.getItem('user')).isAdmin
      : false ;
  };
  get allUsers(): User[] { return this.users };
  get currentUser(): string { return localStorage.getItem('user'); }

  constructor() { }

  logIn(username: string, password: string): boolean {
    if (this.users.find(p => p.Username === username && p.Password === password)) {
      localStorage.setItem('user', username);
      return true;
    }
    return false;
  }

  logOut(): void {
    localStorage.removeItem('user');
  }
}
