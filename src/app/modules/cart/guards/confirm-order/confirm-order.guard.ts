import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmOrderGuard implements CanActivate {

  constructor(
    private _Router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const stateRef: any = this._Router.getCurrentNavigation()?.extras?.state;    

      if(stateRef?.allowAccess) {
        return true
      } else {
        this._Router.navigate(['/cart'])
        return false
      }
  }
  
}
