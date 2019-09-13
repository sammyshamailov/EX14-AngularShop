import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, shareReplay } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser = new BehaviorSubject(null);
  public readonly usersObserv: Observable<User> = this._currentUser.asObservable().pipe(shareReplay(1));
  private users: User[];
  private usernames: string[];

  private userListLength: number;
  get numOfUsers(): number { return this.userListLength };

  get isLoggedIn(): boolean { return localStorage.getItem('user') ? true : false; };
  get isAdmin(): boolean {
    return localStorage.getItem('user')
      ? this.users.find(p => p.Username === localStorage.getItem('user')).isAdmin
      : false ;
  };
  get allUsers(): string[] { return this.usernames };
  

  constructor(private http: HttpClient) {
    this.loadUsers();
   }

  /**
   * Gets the products data and changes it accordingly.
   * @returns promise representation of the products list.
   */
  getUserPromise(): Promise<User[]> {
    return this.http.get('../../assets/static/user.json')
      .pipe(
        map(json => json as User[]),
      )
      .toPromise()
      .catch((error) => Promise.reject('error'));
  }

  /**
   * Loads products into the BehaviorSubject variable.
   */
  private loadUsers() {
    this.getUserPromise()
      .then((users) => { 
        this.users = users;
        this.userListLength = users.length;
        this.usernames = users.map(user => user.Username);
        let username = localStorage.getItem('user');
        username? this._currentUser.next(this.users.find(o => o.Username === username)): this._currentUser.next(null);
       });
  }

  logIn(username: string, password: string): boolean {
    let user = this.users.find(p => p.Username === username && p.Password === password);
    if (user) {
      localStorage.setItem('user', username);
      this._currentUser.next(user);
      return true;
    }
    return false;
  }

  logOut(): void {
    localStorage.removeItem('user');
    this._currentUser.next(null);
  }
}
