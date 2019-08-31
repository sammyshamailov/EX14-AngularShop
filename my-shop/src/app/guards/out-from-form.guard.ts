import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { EditPageComponent } from '../components/edit-page/edit-page.component';

@Injectable({
  providedIn: 'root'
})
export class OutFromFormGuard implements CanDeactivate<EditPageComponent> {

  canDeactivate(
    component: EditPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if(component.isDirty){
      return confirm("Are You Sure?")? true: false;
    }
    return true;
  }
}
