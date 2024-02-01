import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { CartService } from './services/cart/cart.service';
import { LocalizationService } from '../../shared/services/localization/localization.service';
import { Subscription } from 'rxjs';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { Constant } from 'src/app/core/config/constant';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends ComponentBase implements OnInit, OnDestroy {


  // Props 
  LanguagesEnum = Languages;
  subscription: Subscription = new Subscription();
  lang: Languages = (this._TranslateService.currentLang as Languages);

  constructor( 
    private _CartService: CartService,
    translateService: TranslateService,
    private _BrowserService: BrowserService,
    LocalizationService: LocalizationService,
    private _BreadcrumbService: BreadcrumbService,
  ) { 
    super( LocalizationService, translateService );
  }


  ngOnInit(): void {  
    this.onLangChange();
    this.setBreadcrumb();
    this._CartService.getUserCart();
  }


  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this._BrowserService.setItem(Constant.isNeededMultiplePayment, false);
    this._BrowserService.setItem(Constant.isHybridPayment, false);
    this._BrowserService.setItem(Constant.showHybridPayment, false);
  }

  onLangChange(): void {
    this.subscription.add( this._TranslateService.onLangChange.subscribe(({lang}: any) => {
      this.lang = (lang as Languages);
    }));
  }

  setBreadcrumb(): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: 'breadcrumb.cart',
        url: '/cart/check-out'
      }
    ])
  }

}
