import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../../models/user';
import { map, first, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let usersPromise: Promise<User[]> = this.userService.getUserPromise();
    let isAdmin: boolean;
    let currentUser: string = localStorage.getItem('user');
    return new Promise((resolve, reject) => {
      usersPromise.then(users => {
        isAdmin = currentUser ? users.find(user => user.Username === currentUser).isAdmin : false;
        if (!isAdmin) {
          this.router.navigate(['/home']);
          resolve(false);
        }
        resolve(true);
      });
    })

    // let isAdmin: boolean;
    // return new Promise((resolve, reject) => {
    //   this.userService.usersObserv.toPromise()
    //     .then(o => {
    //       isAdmin = o ? o.isAdmin : false;
    //       if (!isAdmin) {
    //         this.router.navigate(['/home']);
    //         resolve(false);
    //       }
    //       resolve(true);
    //     })
    // })
  }

}
