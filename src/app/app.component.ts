import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from './core/config/apis';
import { Constant } from './core/config/constant';
import { HttpService } from './core/services/http/http.service';
import { AuthService } from './modules/auth/services/auth/auth.service';
import { BrowserService } from './shared/services/browser-db/browser.service';
import { SettingsService } from './shared/services/settings/settings.service';
import { AdsService } from './shared/services/ads/ads.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {


  // Props 
  title = 'wndo';
  isLoaded: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
    private _Renderer2: Renderer2,
    private _AdsService: AdsService,
    private _HttpService: HttpService,
    private _AuthService: AuthService,
    private _BrowserService: BrowserService,
    private _SettingsService: SettingsService,
    @Inject(DOCUMENT) private _Document: Document,
    ) {
  }

  ngOnInit(): void {
    this.guestLogin();
    this.onThemeChange();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onThemeChange(): void {
    this.subscription.add(
      this._SettingsService.onThemeChange.subscribe((val: boolean) => {
        const hostClass = val ? 'theme-dark' : 'theme-light';
        this._Renderer2.setAttribute(this._Document.body, 'class', `${hostClass} mat-app-background mat-typography`);
      })
    )
  }


  guestLogin() {    
    if (!this._AuthService.isGuest && !this._AuthService.isAuthenticated) {
      this.subscription.add(this._HttpService.get(APIs.guestLogin).subscribe(( { responseData } ) => {
        if(responseData?.token) {
          this._BrowserService.setItem(Constant.guestToken, responseData?.token);
          this._BrowserService.setItem(Constant.explorePages, []);
          this.isLoaded = true;
          this._AdsService.getAdsVideo();
          this._AdsService.getAdsBanner();
        }
      }));      
    } else {
      this.isLoaded = true;
      this._AdsService.getAdsVideo();
      this._AdsService.getAdsBanner();
    }
  }



  

}
