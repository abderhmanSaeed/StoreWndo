import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { LocalizationService } from '../../shared/services/localization/localization.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends ComponentBase implements OnInit, OnDestroy {


  // props 
  subscription: Subscription = new Subscription();

  constructor(
    translateService: TranslateService,
    LocalizationService: LocalizationService,
    private _ActivatedRoute: ActivatedRoute,
    private _BreadcrumbService: BreadcrumbService,
  ) {
    super( LocalizationService, translateService );
   }


  ngOnInit(): void {
    this.getAllData();
  }


  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getAllData(): void {
    this.getProducData();
  }


  getProducData(): void {
    this.subscription.add( this._ActivatedRoute.data.subscribe((data: any) => {
      //...Do something with your data here...
      this.setBreadcrumb(data?.productData?.responseData?.name);
    }))
  }


  setBreadcrumb(productName: string): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: productName,
        url: '/product',
        active: true
      },
    ])
  }

}
