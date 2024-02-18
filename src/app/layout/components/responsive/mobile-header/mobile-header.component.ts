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
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
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

// notifications
  notificationsCount: any = 0;

  // Lang
  LanguagesEnum = Languages;
  lang: Languages = (this._TranslateService.currentLang as Languages);
  languagesEnum = Languages;


  constructor(
    public authService: AuthService,
    private _CartService: CartService,
    private _MatDialog: MatDialog,
    private _TranslateService: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.menus.forEach(menu => {
      this.matIconRegistry.addSvgIcon(
        menu.title,
        this.domSanitizer.bypassSecurityTrustResourceUrl(menu.imgPath)
      );
    });
  }

  ngOnInit(): void {}

  showFiller = false;

  onCartItemsCountChange(): void {
    this,
      this.subscription.add(
        this._CartService.onCartItemsCountChange$.subscribe((res: number) => {
          this.cartItemsCount = res;
        })
      );
  }

  openSellDialog(): void {
    this._MatDialog.open(SellDialogComponent, {
      width: '550px',
      direction: this.lang == this.LanguagesEnum.EN ? 'ltr' : 'rtl',
      panelClass: 'gradient-dialog',
    });
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
}
