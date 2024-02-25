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
    private responsiveService: ResponsiveService
    //  private _BreakpointsService: BreakpointsService,

  ) {
    super( LocalizationService, TranslateService );
  }

  ngOnInit(): void {
    // this.getBreakpoints();
    this.onLangChange();
    this.checkRoute();

    this.subscriptionMobile = this.responsiveService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }


  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onLangChange(): void {
    this.subscription.add( this._TranslateService.onLangChange.subscribe(({lang}: any) => {
      this.lang = (lang as Languages);
    }));
  }


  openResponsiveUC(): void {
    this._MatDialog.open(ResponsiveUCComponent, {
      width: '92%',
      disableClose: true,
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',
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
    if (this.routerService.hasRoute('buyer-profile') || this.routerService.hasRoute('seller') ) {
      this.draweState =  false;
      this.isOpening = false;
    }
  }

}
