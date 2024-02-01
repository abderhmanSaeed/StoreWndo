import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends ComponentBase implements OnInit {

  constructor(
    TranslateService: TranslateService,
    LocalizationService: LocalizationService,
  ) {
    super( LocalizationService, TranslateService );
   }

  ngOnInit(): void {
  }

}
