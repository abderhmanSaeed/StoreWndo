import { Component, OnInit } from '@angular/core';

import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { ExploreView } from '../../enums/explore-view';
import { Section } from '../../../../shared/models/section/section';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-shorts',
  templateUrl: './shorts.component.html',
  styleUrls: ['./shorts.component.scss']
})
export class ShortsComponent extends ComponentBase implements OnInit {

  ExploreView = ExploreView;
  slectedSection: Section = {};
  currentView: ExploreView = ExploreView.Shorts;
  
  constructor(
    private _Router: Router,
    TranslateService: TranslateService,
    LocalizationService: LocalizationService,
    ) { 
      super( LocalizationService, TranslateService );
    }

  ngOnInit(): void {
  }

  
  onViewModeChanege({checked}: MatSlideToggleChange): void {
    if (checked) {
      this.currentView = ExploreView.Grid
    } else {
      this.currentView = ExploreView.Shorts
    }
  }

}
