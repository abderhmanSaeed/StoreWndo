import { Component, OnInit } from '@angular/core';

import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { ExploreView } from '../../enums/explore-view';
import { Section } from '../../../../shared/models/section/section';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { TranslateService } from '@ngx-translate/core';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { Subscription } from 'rxjs';
import { ViewModeService } from 'src/app/shared/services/view-mode/view-mode.service';

@Component({
  selector: 'app-shorts',
  templateUrl: './shorts.component.html',
  styleUrls: ['./shorts.component.scss'],
})
export class ShortsComponent extends ComponentBase implements OnInit {
  ExploreView = ExploreView;
  slectedSection: Section = {};
  currentView: ExploreView = ExploreView.Shorts;

  // Mobile
  isMobile: boolean = false;

  subscription: Subscription = new Subscription();

  constructor(
    TranslateService: TranslateService,
    LocalizationService: LocalizationService,
    private responsiveService: ResponsiveService,
    private viewModeService: ViewModeService
  ) {
    super(LocalizationService, TranslateService);
  }

  ngOnInit(): void {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this.subscription.add(
      this.viewModeService.currentView$.subscribe((view) => {
        this.currentView = view;
      })
    );
  }

  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onViewModeChanege({ checked }: MatSlideToggleChange): void {
    if (checked) {
      this.currentView = ExploreView.Grid;
    } else {
      this.currentView = ExploreView.Shorts;
    }
  }
}
