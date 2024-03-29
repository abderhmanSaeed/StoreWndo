import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { RouterService } from 'src/app/shared/services/router/router.service';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuTrigger } from '@angular/material/menu';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';

@Component({
  selector: 'profile-aside',
  templateUrl: './profile-aside.component.html',
  styleUrls: ['./profile-aside.component.scss'],
})
export class ProfileAsideComponent extends ComponentBase implements OnInit {
  showFiller = false;

  isMobile: boolean = false;
  subscription: Subscription = new Subscription();
  subscriptionMobile: Subscription = new Subscription();

  LanguagesEnum = Languages;
  lang: Languages = this._TranslateService.currentLang as Languages;

  isOpening: boolean = true;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  icon = 'expand_more';

  constructor(
    TranslateService: TranslateService,
    LocalizationService: LocalizationService,
    private responsiveService: ResponsiveService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    super(LocalizationService, TranslateService);
    this.matIconRegistry.addSvgIcon(
      'my-profile-menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/media/svg/user-menu.svg')
    );
  }



  changeIcon() {
    this.trigger.menuClosed.subscribe(() => this.icon = 'expand_more');
    this.trigger.menuOpened.subscribe(() => this.icon = 'expand_less');

  }

  ngOnInit(): void {
    this.subscriptionMobile = this.responsiveService.isMobile$.subscribe(
      (isMobile) => {
        this.isMobile = isMobile;
      }
    );

    this.onLangChange();
    this.changeIcon()
  }

  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLangChange(): void {
    this.subscription.add(
      this._TranslateService.onLangChange.subscribe(({ lang }: any) => {
        this.lang = lang as Languages;
      })
    );
  }

  openedStart(): any {
    this.isOpening = true;
  }

  closedStart(): any {
    this.isOpening = false;
  }
}
