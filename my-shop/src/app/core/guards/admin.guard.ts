import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user';
import { UserService } from '../services/user.service';


@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usersPromise: Promise<User[]> = this.userService.getUserPromise();
    let isAdmin: boolean;
    const currentUser: string = localStorage.getItem('user');
    return new Promise((resolve, reject) => {
      usersPromise.then(users => {
        isAdmin = currentUser ? users.find(user => user.Username === currentUser).isAdmin : false;
        if (!isAdmin) {
          this.router.navigate(['/home']);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}
