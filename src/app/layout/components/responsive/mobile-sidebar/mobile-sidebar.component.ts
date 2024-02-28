import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { RouterService } from 'src/app/shared/services/router/router.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { ConfirmFor } from 'src/app/shared-modules/confirmation-dialog/enums/confirm-for/confirm-for';
import { Constant } from 'src/app/core/config/constant';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { ConfirmationService } from 'src/app/shared-modules/confirmation-dialog/services/confirmation/confirmation.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponents } from 'src/app/modules/auth/enums/auth-components';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';
import { BuyerProfileService } from 'src/app/modules/buyer-profile/servises/buyer-profile/buyer-profile.service';
import { User } from 'src/app/modules/auth/models/user/user';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { ExploreView } from 'src/app/modules/explore/enums/explore-view';
import { ViewModeService } from 'src/app/shared/services/view-mode/view-mode.service';

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss'],
})
export class MobileSidebarComponent implements OnInit {
  // inputs props
  @Input() draweState: boolean = false;
  @Input() openedStart: boolean = false;
  @Output() closeDrawer: EventEmitter<boolean> = new EventEmitter(false);
  @Input() lang: Languages = Languages.AR;

  // props
  currentRoute: string = '';
  //  selectedSectionId: number | null = null;
  //  nav1: any[] = DynamicAsideMenuConfig.menu1;
  subscription: Subscription = new Subscription();

  authComponents = AuthComponents;

  LanguagesEnum = Languages;
  languagesEnum = Languages;

  profileData: BuyerProfile | null = {};

  user: User | null = {};

  faChevronRight = faChevronRight;

  ExploreView = ExploreView;
  currentView: ExploreView = ExploreView.Shorts;

  constructor(
    public authService: AuthService,
    private _HttpService: HttpService,
    public routerService: RouterService,
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _BrowserService: BrowserService,
    private _ConfirmationService: ConfirmationService,
    private _Router: Router,
    private _MatDialog: MatDialog,
    private _BuyerProfileService: BuyerProfileService,
    private viewModeService: ViewModeService
  ) {}

  ngOnInit(): void {
    //  this.getAllData();
    //  this.onSectionChange();
    this.onAuthChange();
    this.lang = this._BrowserService.getItem(Constant.locale);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //  onSectionChange(): void {
  //    this.subscription.add(
  //      this._ShortsService.sectionChange$.subscribe( (id: number | null) => {
  //        this.selectedSectionId = id;
  //      })
  //    );
  //  }

  //  getAllData(): void {
  //    this.getSectionsWithCategories();
  //  }

  getBuyerProfile(): void {
    this.subscription.add(
      this._HttpService
        .get(APIs.getBuyerProfile)
        .subscribe(({ responseData }: HResponse) => {
          this.profileData = responseData;
          this._BuyerProfileService.profileData$.next(responseData);
        })
    );
  }

  /**
   *
   * @param svgURL
   * @returns
   */
  bindSvgIcon(svgURL: string): object {
    return {
      '-webkit-mask-image': `url(${svgURL})`,
      'mask-image': `url(${svgURL})`,
    };
  }

  //  getSectionsWithCategories(): void {
  //    this.subscription.add(this._HttpService.get(APIs.getSectionsWithCategories).subscribe((res: HResponse ) => {
  //      this.sections = res.responseData?.items;
  //    }));
  //  }

  logout(): void {
    this.subscription.add(
      this._HttpService.post(APIs.logout).subscribe((res: HResponse) => {
        this._BrowserService.deleteItem(Constant.token);
        this._BrowserService.deleteItem(Constant.userData);
        this.authService.authChange$.next(null);
        this._BrowserService.setItem(Constant.explorePages, []);
        this._MessagesService.openSuccessSnackBar(
          this._TranslateService.instant('meassges.loged-out'),
          3000
        );
        this.closeDrawer.emit()
        this._Router.navigate(['/explore']);
      })
    );
  }

  openLogoutConfirmationDialog(): void {
    this.subscription.add(
      this._ConfirmationService
        .openConfirmationDialog(ConfirmFor.Logout)
        .subscribe((confirmed) => {
          if (confirmed == ConfirmFor.Logout) {
            this.logout();
          }
        })
    );
  }



  ifIsAuthenticated(): void {
    if (this.authService.isAuthenticated) {
      // this.getCartItemsCount();
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

  onToggleLangChange(langCode: string): void {
    this.lang = langCode === 'en' ? Languages.EN : Languages.AR;
    this._BrowserService.setItem(Constant.locale, this.lang);
    window.location.reload();
  }

  closeSidebar() {
    this.closeDrawer.emit(true);
  }


  changeToOffersView(): void {
    this.viewModeService.changeView(ExploreView.Grid);
  }

}
