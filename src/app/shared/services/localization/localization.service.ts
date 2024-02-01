import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constant } from 'src/app/core/config/constant';
import { Languages } from '../../enums/languages/languages';
import { BrowserService } from '../browser-db/browser.service';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {

  private langSelected$: BehaviorSubject<string>;
  langChangeObserver: Observable<string>;
  constructor(
    private _BrowserService: BrowserService,
  ) {
    this.langSelected$ = new BehaviorSubject((Languages.AR as string));
    this.langChangeObserver = this.langSelected$.asObservable();
    this.setLanguage();
  }

  getSystemLang(): any {
    const local = this._BrowserService.getItem(Constant.locale);
    if (local) return local;
    else return Languages.AR;
  }

  setLanguage(lang?: string) {    
    this._BrowserService.setItem(
      Constant.locale,
      lang || this.getSystemLang()
    );    
    this.langSelected$.next(lang || this.getSystemLang());    
    this.getSystemLang() == Languages.AR
      ? this.chengeDir('rtl')
      : this.chengeDir('ltr');
  }

  chengeDir(custemDir: string) {
    document.documentElement.setAttribute('dir', custemDir);
  }

}