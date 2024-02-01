import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { AccountSettings } from '../../models/account-settings/account-settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  // props 
  accountSettings: AccountSettings = {};
  subscription: Subscription = new Subscription();

  constructor(
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    private _NgxSpinnerService: NgxSpinnerService,
    private _BreadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.setBreadcrumb();
    this.getaccountSettings();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      },
      {
        name: 'breadcrumb.settings',
        url: '/buyer-profile/setting'
      }
    ])
  }


  getaccountSettings(): void {
    this.subscription.add(
      this._HttpService.get(APIs.accountSettings).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.accountSettings = res?.responseData;
          console.log(res);
        }
      })
    );
  }  



  onValueChange(changes: any): void {

    let isLangChanged: boolean = this.accountSettings?.language != changes.language;
    console.log(isLangChanged);
    
    const payload = {
      ...this.accountSettings, 
      ...changes,
    }
    
    this.updateaccountSettings(payload, isLangChanged);
  }


  updateaccountSettings(payload: AccountSettings, isLangChanged: boolean): void {
    this.subscription.add(
      this._HttpService.post(APIs.editaccountSettings, payload).subscribe( (res: HResponse) => {
        if (res?.isSuccess) {
          this.accountSettings = res?.responseData;
          if (isLangChanged) {
            this.onLangChange(this.accountSettings.language ? Languages.EN : Languages.AR)
          }
        }
      })
    );
  }

  onLangChange( lang: Languages): void {
    this._NgxSpinnerService.show();
    this._BrowserService.setItem(Constant.locale,lang)
    window.location.reload();
  }

}
