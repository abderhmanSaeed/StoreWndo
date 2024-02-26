import { Component, OnInit } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ActionTypes } from 'src/app/shared/enums/action-types/action-types';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { CartService } from 'src/app/modules/cart/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { TranslateService } from '@ngx-translate/core';
import { SellDialogComponent } from '../../header/components/sell-dialog/sell-dialog.component';
import { DynamicHeaderMobileMenuConfig } from './configs/dynamic-header-mobile-menu.config';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthComponents } from 'src/app/modules/auth/enums/auth-components';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ExploreView } from 'src/app/modules/explore/enums/explore-view';
import { ViewModeService } from 'src/app/shared/services/view-mode/view-mode.service';
import { ActivatedRoute } from '@angular/router';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BuyerProfileService } from 'src/app/modules/buyer-profile/servises/buyer-profile/buyer-profile.service';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';
import { User } from 'src/app/modules/auth/models/user/user';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
  animations: [
    trigger('fadeInGrow', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('0.5s ease-in-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
    trigger('compositeAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: '0px', transform: 'translateX(-100%)' }),
        animate(
          '0.5s ease-in-out',
          style({ opacity: 1, height: '*', transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.5s ease-in-out',
          style({ opacity: 0, height: '0px', transform: 'translateX(100%)' })
        ),
      ]),
    ]),
  ],
})
export class MobileHeaderComponent implements OnInit {
  faTimesCircle = faTimesCircle;
  drawerState: boolean = true;
  public isCollapsed: boolean = true;

  menus: any[] = DynamicHeaderMobileMenuConfig.items;
  actionTypes = ActionTypes;

  // Cart
  cartItemsCount: number = 0;
  profileData: BuyerProfile | null = {};
  subscription: Subscription = new Subscription();
  queryParamsSubscription: Subscription = new Subscription();

  // notifications
  notificationsCount: any = 0;

  // Lang
  LanguagesEnum = Languages;
  lang: Languages = this._TranslateService.currentLang as Languages;
  languagesEnum = Languages;

  authComponents = AuthComponents;

  isOpenSearchInput = false;

  user: User | null = {};

  constructor(
    public authService: AuthService,
    private _CartService: CartService,
    private _MatDialog: MatDialog,
    private _TranslateService: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private viewModeService: ViewModeService,
    private activatedRoute: ActivatedRoute,
    private _HttpService: HttpService,
    private _BuyerProfileService: BuyerProfileService,
  ) {
    this.menus.forEach((menu) => {
      this.matIconRegistry.addSvgIcon(
        menu.title,
        this.domSanitizer.bypassSecurityTrustResourceUrl(menu.imgPath)
      );
    });
  }


  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      const isOffersView = params['offers'] === 'true';
      if (isOffersView) {
        this.viewModeService.changeView(ExploreView.Grid);
      } else {
        this.viewModeService.changeView(ExploreView.Shorts);
      }
    });

    this.onAuthChange();
    this.onProfileDataChange();
    this.onCartItemsCountChange();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCartItemsCountChange(): void {
    this,
      this.subscription.add(
        this._CartService.onCartItemsCountChange$.subscribe((res: number) => {
          this.cartItemsCount = res;
        })
      );
  }

  // changeToExploreView(): void {
  //   console.log('change view');
  //   this.viewModeService.changeView(ExploreView.Shorts);
  // }

  // onNavItemClick(naveName: string): void {
  //   switch (naveName) {
  //     case 'explore':
  //       this.changeToExploreView();
  //       break;

  //     default:
  //       break;
  //   }
  // }

  // Auth Modal
  openAuthDialog(authComponent: AuthComponents): void {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog',
      direction: this.lang == this.LanguagesEnum.EN ? 'ltr' : 'rtl',
      data: {
        authComponent,
      },
    });
  }

  toggleSearch(): void {
    this.isOpenSearchInput = !this.isOpenSearchInput;
  }

  onProfileDataChange(): void {
    this.subscription.add(
      this._BuyerProfileService.profileData$.subscribe(
        (profileData: BuyerProfile) => {
          this.profileData = profileData;
          this.notificationsCount = profileData?.notificationsCount;
        }
      )
    );
  }

  getBuyerProfile(): void {
    this.subscription.add(
      this._HttpService
        .get(APIs.getBuyerProfile)
        .subscribe(({ responseData }: HResponse) => {
          this.profileData = responseData;
          this.notificationsCount = responseData.notificationsCount;
          this._BuyerProfileService.profileData$.next(responseData);
        })
    );
  }

  getCartItemsCount(): void {
    this,
      this.subscription.add(
        this._HttpService
          .get(APIs.getCartItemsCount)
          .subscribe((res: HResponse) => {
            this._CartService.onCartItemsCountChange$.next(res.responseData);
          })
      );
  }

  ifIsAuthenticated(): void {
    if (this.authService.isAuthenticated) {
      this.getCartItemsCount();
      this.getBuyerProfile();
    } else {
      this.profileData = null;
    }
  }

  onAuthChange(): void {
    this.subscription.add(
      this.authService.authChange$.subscribe((data: User | null) => {
        this.user = data;
        this.ifIsAuthenticated();
      })
    );
  }


}
