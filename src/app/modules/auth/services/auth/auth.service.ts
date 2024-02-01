import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Constant } from 'src/app/core/config/constant';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)


  constructor(
    private _BrowserService: BrowserService,
  ) { 
    this.authChange$.next(this._BrowserService.getItem(Constant?.userData))
  }



  get isAuthenticated(): boolean {
    return this._BrowserService.getItem(Constant.token);
  }
  

  get isGuest(): boolean {
    return this._BrowserService.getItem(Constant.guestToken);
  }
}
