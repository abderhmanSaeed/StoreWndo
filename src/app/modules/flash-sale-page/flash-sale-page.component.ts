import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { ExploreProduct } from '../explore/modules/shorts/models/explore-product/explore-product';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { ActivatedRoute } from '@angular/router';
import { ShortsService } from '../explore/modules/shorts/services/shorts/shorts.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../shared/services/localization/localization.service';
import { Subscription } from 'rxjs';
import { Constant } from 'src/app/core/config/constant';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { APIs } from 'src/app/core/config/apis';

@Component({
  selector: 'app-flash-sale',
  templateUrl: './flash-sale-page.component.html',
  styleUrls: ['./flash-sale-page.component.scss'],
})
export class FlashSalePageComponent extends ComponentBase implements OnInit, OnDestroy {
  exploreProducts: ExploreProduct[] = [];

  subscription: Subscription = new Subscription();

  fetchCriteria: any = {
    maxResultCount: 6,
    skipCount: 0,
    pages: this._BrowserService.getItem(Constant.explorePages)
      ? this._BrowserService.getItem(Constant.explorePages)
      : [],
  };

  totalCount: number = 0;

  constructor(
    LocalizationService: LocalizationService,
    translateService: TranslateService,
    private _HttpService: HttpService,
    private _ShortsService: ShortsService,
    private _ActivatedRoute: ActivatedRoute,
    private _BrowserService: BrowserService,
    private _ChangeDetectorRef: ChangeDetectorRef,
    private _HelperFunctionsService: HelperFunctionsService,

  ) {
    super( LocalizationService, translateService );
  }

  ngOnInit(): void {
    this.onQueryParamsChange();
  }

  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams: any) => {
        this.exploreProducts = [];

        if (queryParams?.section) {
          this.fetchCriteria.section = queryParams?.section;
          this._ShortsService.sectionChange$.next(queryParams?.section);
        } else {
          this.fetchCriteria.section = null;
          this._ShortsService.sectionChange$.next(null);
        }

        queryParams?.category
          ? (this.fetchCriteria.category = queryParams?.category)
          : delete this.fetchCriteria.category;
        this.fetchCriteria.skipCount = 0;
        this.getExploreProducts(this.fetchCriteria);
      })
    );
  }

  getExploreProducts(payload: any, params?: any): void {

    this.subscription.add(
      this._HttpService
        .postByParams(APIs.getExploreProducts, params, payload)
        .subscribe(({ responseData }: HResponse) => {
          console.log('responseData:', responseData);
          if (responseData?.data?.items.length) {
            this.fetchCriteria.pages = this._BrowserService.setItem(
              Constant.explorePages,
              responseData.pages
            );
            this.exploreProducts.push(...responseData?.data?.items);
            this.totalCount = responseData?.data?.totalCount;
            this.fetchCriteria.skipCount += this.fetchCriteria.maxResultCount;
          }
        })
    );
  }

  onProductWishChange(isInWishList: any, product: any): void {
    const productId = product.id;
    //Find index of specific object using findIndex method.
    const objIndex = this.exploreProducts.findIndex((obj: any) => obj.id == productId);
    //Update object's isLiked property.
    this.exploreProducts[objIndex].isInWishList = isInWishList;
  }

  handleAddToCart(isAdded: boolean, item: any): void {
    item.isInCart = isAdded;
  }
}
