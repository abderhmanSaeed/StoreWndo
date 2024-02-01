import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { LocalizationService } from '../../shared/services/localization/localization.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent extends ComponentBase implements OnInit, OnDestroy {

  // props 
  sellerProfile: any = {};
  subscription: Subscription = new Subscription();

  constructor(
    translateService: TranslateService,
    private _ActivatedRoute: ActivatedRoute,
    LocalizationService: LocalizationService,
    private _BreadcrumbService: BreadcrumbService,
  ) {
    super( LocalizationService, translateService );
   }


  ngOnInit(): void {
    this.getSeller();
  }


  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setBreadcrumb(sellerName: string): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: sellerName,
        url: '/buyer-profile',
        active: true
      }
    ])
  }



  getSeller(): void {
    this.subscription.add( this._ActivatedRoute.data.subscribe((data: any) => {
      //...Do something with your data here...      
      this.sellerProfile = data?.sellerProfile?.responseData;   
      this.setBreadcrumb(this.sellerProfile?.name);
    }))
  }



}
