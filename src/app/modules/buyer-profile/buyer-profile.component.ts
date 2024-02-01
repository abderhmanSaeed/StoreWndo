import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { RouterService } from 'src/app/shared/services/router/router.service';
import { BuyerProfileService } from './servises/buyer-profile/buyer-profile.service';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { TranslateService } from '@ngx-translate/core';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.scss']
})
export class BuyerProfileComponent extends ComponentBase implements OnInit, OnDestroy {

  // props 
  profileData: BuyerProfile = {};
  subscription: Subscription = new Subscription();


  constructor(
    private _HttpService: HttpService,
    TranslateService: TranslateService,
    public routerService: RouterService,
    LocalizationService: LocalizationService,
    private _BreadcrumbService: BreadcrumbService,
    private _BuyerProfileService: BuyerProfileService,
  ) { 
    super( LocalizationService, TranslateService );
  }


  ngOnInit(): void {
    this.setBreadcrumb();
    this.getBuyerProfile();
  }


  setBreadcrumb(): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: 'breadcrumb.profile',
        url: '/buyer-profile'
      }
    ])
  }

  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBuyerProfile(): void {
    this.subscription.add(this._HttpService.get(APIs.getBuyerProfile).subscribe(({responseData}: HResponse ) => {
      console.log(responseData, 'responseData');
      this.profileData = responseData;
      this._BuyerProfileService.profileData$.next(responseData);
    }));
  }


}
