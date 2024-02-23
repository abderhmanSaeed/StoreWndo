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

  constructor(
    public authService: AuthService,
    private _CartService: CartService,
    private _MatDialog: MatDialog,
    private _TranslateService: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private viewModeService: ViewModeService,
    private activatedRoute: ActivatedRoute
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
}
