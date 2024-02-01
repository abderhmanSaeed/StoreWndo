import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActionTypes } from 'src/app/shared/enums/action-types/action-types';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';
import { DynamicHeaderMenuConfig } from './configs/dynamic-header-menu.config';
import { MatDialog } from '@angular/material/dialog';
import { SellDialogComponent } from './components/sell-dialog/sell-dialog.component';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { APIs } from 'src/app/core/config/apis';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { CartService } from 'src/app/modules/cart/services/cart/cart.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { User } from 'src/app/modules/auth/models/user/user';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';
import { BuyerProfileService } from 'src/app/modules/buyer-profile/servises/buyer-profile/buyer-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  @Input() draweState: boolean = false;
  @Input() openedStart: boolean = false;


  // Props 
  user: User | null = {};
  LanguagesEnum = Languages;
  actionTypes = ActionTypes;
  cartItemsCount: number = 0;
  languagesEnum = Languages;
  notificationsCount: any = 0;
  profileData: BuyerProfile | null = {};
  menue: any[] = DynamicHeaderMenuConfig.items
  subscription: Subscription = new Subscription();
  lang: Languages = (this._TranslateService.currentLang as Languages);

  // booleans 
  isDark: boolean = false;
  public isCollapsed: boolean = true;

  constructor(
    private _MatDialog: MatDialog,
    public authService: AuthService,
    private _CartService: CartService,
    private _HttpService: HttpService,
    private _SettingsService: SettingsService,
    private _TranslateService: TranslateService,
    private _BuyerProfileService: BuyerProfileService,
  ) { }

  ngOnInit(): void {
    this.onAuthChange();
    this.onLangChange();
    this.onProfileDataChange();
    this.onCartItemsCountChange();
  }


  onLangChange(): void {
    this.subscription.add( this._TranslateService.onLangChange.subscribe(({lang}: any) => {
      this.lang = (lang as Languages);
    }));
  }

  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


  toggleTheme(): void {
    this.isDark = !this.isDark;
    this._SettingsService.onThemeChange.next(this.isDark);
  }


  ifIsAuthenticated(): void {
    if (this.authService.isAuthenticated) {
      this.getCartItemsCount();
      this.getBuyerProfile();
    } else {
      this.profileData = null;
    }
  }


  getBuyerProfile(): void {
    this.subscription.add(this._HttpService.get(APIs.getBuyerProfile).subscribe(({responseData}: HResponse ) => {
      this.profileData = responseData;
      this.notificationsCount = responseData.notificationsCount;
      this._BuyerProfileService.profileData$.next(responseData);
    }));
  }


  onProfileDataChange(): void {
    this.subscription.add(this._BuyerProfileService.profileData$.subscribe( (profileData: BuyerProfile ) => {
      this.profileData = profileData;
      this.notificationsCount = profileData?.notificationsCount;
    }))
  }


  onAuthChange(): void {
    this.subscription.add(
      this.authService.authChange$.subscribe( (data: User | null) => {
        this.user = data;       
        this.ifIsAuthenticated(); 
      })
    )
  }


  onNavItemClick(naveName: string): void {

    switch (naveName) {
      case 'sell':
        this.openSellDialog();
        break;
    
      default:
        break;
    }
  }


  // onaAthChange


  openSellDialog(): void {
    this._MatDialog.open(SellDialogComponent, {
      width: '550px',
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',
      panelClass: 'gradient-dialog',
    });
  }


  onCartItemsCountChange(): void {
    this,this.subscription.add(
      this._CartService.onCartItemsCountChange$.subscribe( (res: number) => {
        this.cartItemsCount = res;
      })
    )
  }


  getCartItemsCount(): void {
    this,this.subscription.add(
      this._HttpService.get(APIs.getCartItemsCount).subscribe( (res: HResponse) => {
        this._CartService.onCartItemsCountChange$.next(res.responseData);
      })
    )
  }

}
