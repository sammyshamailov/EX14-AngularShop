import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser = new BehaviorSubject(null);
  public readonly usersObserv: Observable<User> = this._currentUser.asObservable().pipe(shareReplay(1));
  private users: User[];

  private usernames: string[];
  get allUsers(): string[] { return this.usernames };

  private userListLength: number;
  get numOfUsers(): number { return this.userListLength };

  get isLoggedIn(): boolean { return localStorage.getItem('user') ? true : false; };

  constructor(private http: HttpClient) {
    this.loadUsers();
   }

  /**
   * Gets the users data and changes it accordingly.
   * @returns promise representation of the users list.
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
   * Loads users into the the private list variable.
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

  /**
   * function for logging in to the system.
   * @param username the username typed in form.
   * @param password the password typed in form.
   * @returns true if details are correct.
   */
  logIn(username: string, password: string): boolean {
    let user = this.users.find(p => p.Username === username && p.Password === password);
    if (user) {
      localStorage.setItem('user', username);
      this._currentUser.next(user);
      return true;
    }
    return false;
  }

  /**
   * Logs out from the system.
   */
  logOut(): void {
    localStorage.removeItem('user');
    this._currentUser.next(null);
  }
}
