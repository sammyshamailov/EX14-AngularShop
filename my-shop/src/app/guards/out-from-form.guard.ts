import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { EditPageComponent } from '../components/edit-page/edit-page.component';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class OutFromFormGuard implements CanDeactivate<EditPageComponent> {

  constructor(private dataService: DataService) {}

  canDeactivate(
    component: EditPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if(component.isDirty){
      if(confirm("Are You Sure?")){
        if(this.dataService.getToEdit()){
          this.dataService.setToEdit();
        }
        return true;
      }
      return false;
    }
    return true;
  }
}
