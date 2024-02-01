import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { concatMap, of, Subscription } from 'rxjs';


import { Languages } from 'src/app/shared/enums/languages/languages';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { LocalizationService } from '../../shared/services/localization/localization.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { APIs } from 'src/app/core/config/apis';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { BuyerProfileService } from '../buyer-profile/servises/buyer-profile/buyer-profile.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends ComponentBase implements OnInit, OnDestroy {

  // Props 
  LanguagesEnum = Languages;
  notifications: any[] = [];
  notificationsCount: number = 0;
  fetchCriteria: any = {
    maxResultCount: 12,
  }
  subscription: Subscription = new Subscription();
  lang: Languages = (this._TranslateService.currentLang as Languages);

  // Paginator props 
  page:number = 1;
  perPage:number = 10;

  constructor( 
    translateService: TranslateService,
    private _HttpService: HttpService,
    LocalizationService: LocalizationService,
    private _MessagesService: MessagesService,
    private _BreadcrumbService: BreadcrumbService,
    private _BuyerProfileService: BuyerProfileService
  ) { super( LocalizationService, translateService ); }

  ngOnInit(): void {  
    this.getNotifications(this.fetchCriteria);
    this.onLangChange();
    this.setBreadcrumb();
    this.updateNotificationCount();
  }

  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLangChange(): void {
    this.subscription.add( this._TranslateService.onLangChange.subscribe(({lang}: any) => {
      this.lang = (lang as Languages);
    }));
  }

  getNotifications(query: any): void {
    this.subscription.add(
      this._HttpService.get(APIs.getNotifications, query).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.notifications = res.responseData.items;
          this.notificationsCount = res.responseData.totalCount;          
        }
      })
    );
  }  

  deleteNotificationCard(id: number | undefined): void {
    this.subscription.add(
      this._HttpService.delete(`${APIs.getNotifications}/${id}`)
      .pipe(
        concatMap( (res: HResponse) => {
          if (res.isSuccess) {
            this._MessagesService.openSuccessSnackBar(
              this._TranslateService.instant('notifications.notification-deleted-message')
            , 3000)
            return this._HttpService.get(APIs.getNotifications, this.fetchCriteria)
          } else {
            return of([])
          }
        }))
        .subscribe((res: HResponse ) => {
          if (res?.isSuccess) {
            this.notifications = res.responseData?.items;
            this.notificationsCount = res.responseData.totalCount;          
          }
      })
    );
  }

  clearAll(): void {
    this.subscription.add(
      this._HttpService.delete(APIs.clearAllNotifications)
      .pipe(
        concatMap( (res: HResponse) => {
          if (res.isSuccess) {
            this._MessagesService.openSuccessSnackBar(
              this._TranslateService.instant('notifications.notification-clearAll-message')
            , 3000)
            return this._HttpService.get(APIs.getNotifications, this.fetchCriteria)
          } else {
            return of([])
          }
        }))
        .subscribe((res: HResponse ) => {
          if (res?.isSuccess) {
            this.notifications = res.responseData?.items;
            this.notificationsCount = res.responseData.totalCount;          
          }
      })
    );
  }


  updateNotificationCount(): void {
    const profileData =  this._BuyerProfileService.profileData$.getValue();
    if (profileData) {
      profileData.notificationsCount = 0;
    }
    this._BuyerProfileService.profileData$.next(profileData);
  }


  setBreadcrumb(): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: 'breadcrumb.notifications',
        url: '/notifications'
      }
    ])
  }


  onPageChange(e: any): void {
    e--
    this.fetchCriteria.skipCount = e * this.perPage;
    this.getNotifications(this.fetchCriteria);
  }


}
