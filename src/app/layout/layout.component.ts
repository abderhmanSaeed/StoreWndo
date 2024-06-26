import { Component, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Languages } from '../shared/enums/languages/languages';
import { RouterService } from '../shared/services/router/router.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../shared/services/localization/localization.service';
import { ComponentBase } from '../shared/helpers/component-base.directive';
import { ResponsiveUCComponent } from '../shared/components/responsive-uc/responsive-uc.component';
import { MatDialog } from '@angular/material/dialog';
import { ResponsiveService } from '../shared/services/responsive/responsive.service';
import { environment } from 'src/environments/environment';
import { DownloadAppDialogComponent } from '../shared/components/download-app-dialog/download-app-dialog.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss', './layout.component.rtl.scss']
})
export class LayoutComponent extends ComponentBase implements OnInit {
  isMobile: boolean = false;
  // booleans
  draweState: boolean = true;
  isOpening: boolean = true;
  // isBpMax1200px: boolean = false;
  // isBpMax1400px: boolean = false;

  // props
  LanguagesEnum = Languages;
  lang: Languages = (this._TranslateService.currentLang as Languages);
  subscription: Subscription = new Subscription();

  subscriptionMobile: Subscription = new Subscription();

  constructor(
    private _MatDialog: MatDialog,
    public routerService: RouterService,
    TranslateService: TranslateService,
    LocalizationService: LocalizationService,
    private responsiveService: ResponsiveService,
    private translateService: TranslateService

    //  private _BreakpointsService: BreakpointsService,

  ) {
    super(LocalizationService, TranslateService);
  }

  ngOnInit(): void {
    // this.getBreakpoints();
    this.onLangChange();
    this.checkRoute();

    if (this.isWeb) {
      console.log('Accessed via web browser on a non-mobile device');
      // Perform actions for web access here, if necessary
    } else {
      // Show popup to prompt user to download the app
      const dialogRef = this._MatDialog.open(DownloadAppDialogComponent, {
        width: '250px',
        data: {
          message:
            this.lang == this.LanguagesEnum.EN ? 'Download our official app to enjoy mobile shopping better, Click here to download the app Now'
              : 'قم بتحميل تطبيقنا الرسمي للإستمتاع بتجربة التسوق عبر الهاتف المحمول بشكل أفضل، انقر هنا لتنزيل التطبيق الآن'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'ok') {
          // Redirect to app store
          this.redirectToAppStore();
        } else if (result === 'cancel') {
          // Close the dialog
          dialogRef.close();
        }
      });
    }
    this.subscriptionMobile = this.responsiveService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }


  redirectToAppStore(): void {
    if (this.isIOS) {
      window.location.href = environment.mobileAppIosUrl;
    } else if (this.isAndroid) {
      window.location.href = environment.mobileAppGooglePlayUrl;
    } else {
      console.log('Non-mobile device detected');
      // Optional: Handle other devices or show a message
    }
  }

  get isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  get isAndroid(): boolean {
    return /android/i.test(navigator.userAgent);
  }

  get isWeb(): boolean {
    // Assume web if not iOS or Android. Consider adding more checks for other devices if needed.
    return !this.isIOS && !this.isAndroid;
  }

  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onLangChange(): void {
    this.subscription.add(this._TranslateService.onLangChange.subscribe(({ lang }: any) => {
      this.lang = (lang as Languages);
    }));
  }


  openResponsiveUC(): void {
    this._MatDialog.open(ResponsiveUCComponent, {
      width: '92%',
      disableClose: true,
      direction: this.lang == this.LanguagesEnum.EN ? 'ltr' : 'rtl',
      panelClass: 'gradient-dialog',
    });
  }


  openedChange(e: any): any {
    this.draweState = e
  }

  openedStart(): any {
    this.isOpening = true;
  }

  closedStart(): any {
    this.isOpening = false;
  }

  // getBreakpoints(): void {
  //   this.isBpMax1200px = this._BreakpointsService.isBpMax1200px;
  //   if (this._BreakpointsService.isMobileDevice()) {
  //     this.openResponsiveUC();
  //   }
  // }

  checkRoute(): void {
    if (this.routerService.hasRoute('buyer-profile') || this.routerService.hasRoute('seller')) {
      this.draweState = false;
      this.isOpening = false;
    }
  }

}
