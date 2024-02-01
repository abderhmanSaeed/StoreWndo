import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { Constant } from '../../config/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  // props
  languagesEnum = Languages;
  lang: Languages = Languages.AR;

  constructor(
    private _MatDialog: MatDialog,
    private _BrowserService: BrowserService
  ) {
    this.lang = this._BrowserService.getItem(Constant.locale);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this._BrowserService.getItem(Constant.token);
    if (token) {
      return true;
    } else {
      this.openAuthDialog();
      return false
    }
  }

  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog',
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });
  }
  
}
