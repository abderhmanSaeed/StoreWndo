import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CardCData } from 'src/app/shared-modules/auk-card-c/models/card-c-data/card-c-data';
import { RecentViewed } from 'src/app/shared-modules/recently-viewed/models/recent-viewed-dto/recent-viewed';
import { SearchTypes } from 'src/app/shared/enums/search-types/search-types';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { Category } from 'src/app/shared/models/category/category';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { Section } from 'src/app/shared/models/section/section';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { Seller } from '../explore/modules/shorts/models/explore-product/explore-product';
import { LocalizationService } from '../../shared/services/localization/localization.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent extends ComponentBase implements OnInit, OnDestroy {


  // props
  sellers: Seller[] = [];
  sections: Section[] = [];
  sellersCount: number = 0;
  productsCount: number = 0;
  term: string | null = null;
  recentlyViewed: RecentViewed[] = [];
  products: CardCData[] = [];
  categories: Category[] = [];
  searchResponse: HResponse | any = {
    responseData: {}
  };
  
  fetchCriteria: any = {}
  searchTypes = SearchTypes;
  selectedSearchType: SearchTypes | null = null
  subscription: Subscription = new Subscription();
  
  
  // booleans
  isFirstTime: boolean = true;
  isProductsSearch: boolean = false;

  constructor(
    translateService: TranslateService,
    private _HttpService: HttpService,
    private _ActivatedRoute: ActivatedRoute,
    LocalizationService: LocalizationService,
    private _BreadcrumbService: BreadcrumbService,
  ) { 
    super( LocalizationService, translateService );
  }

  ngOnInit(): void {
    this.getSearchResponseFromResolver();
    this.onQueryParamsChange();
    this.getRecentlyViewed();
  }


  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  
  setBreadcrumb(): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: 'breadcrumb.all-products',
        url: '/search-results'
      },
    ])

    if (this.term) {
      this._BreadcrumbService.addItem([
        {
          name: this.term,
          active: true
        }
      ])
    }
  }


  getSearchResponseFromResolver(): void {
    // this.searchResponse = this._ActivatedRoute.snapshot.data['searchResponse'];    
    // const { responseData } = this.searchResponse;
    // this.setResponseData(responseData)
    // this.term = this.searchResponse?.text; 
    // if (this.term) {
    //   this.fetchCriteria.text = this.term;
    // }   
  }


  setResponseData(responseData: any): void {
    if (!responseData) {

      this.sellers = [];
      this.products = [];
      this.sections = [];
      this.categories = [];
      this.sellersCount = 0;
      this.productsCount = 0;
      return
    }    
    this.sellers = responseData?.sellers;
    this.products = responseData?.products;
    this.sections = responseData?.sections;
    this.categories = responseData?.categories;
    this.sellersCount = responseData?.sellersCount;
    this.productsCount = responseData?.productsCount;
  }


  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams:any) => {
        
        if (queryParams.products == 'true') {
          this.isProductsSearch = true;
        } else {
          this.isProductsSearch = false;
        }
        
        queryParams?.text ? this.term = queryParams?.text : this.term = null;
        this.fetchCriteria.text = this.term;
        queryParams?.section
        queryParams?.type ? this.fetchCriteria.type = queryParams?.type : delete this.fetchCriteria.type;
        !this.fetchCriteria.text ? delete this.fetchCriteria.text : null;
        this.selectedSearchType = queryParams?.type;
   
        if (this.selectedSearchType == null) {          
          this.setResponseData(null);
          this.filteredDataForWeb(this.fetchCriteria);
        }
        this.isFirstTime = false;
        this.setBreadcrumb();

      })
    )
  }


  filteredDataForWeb(query: any): void {    
    this.subscription.add(this._HttpService.get(APIs.filteredDataForWeb, query).subscribe(({responseData}: HResponse ) => {
      this.setResponseData(responseData);
    }));
  }


  onTypesChange(type?: any ): void {
    this.selectedSearchType = type;
    this.isProductsSearch = false;
  }


  getRecentlyViewed(): void {
    const query = {
      maxResultCount: 20
    }
    this.subscription.add(this._HttpService.get(APIs.getRecentlyViewed, query).subscribe(({responseData}: HResponse ) => {
      this.recentlyViewed = responseData?.items
    }));
  }


  filteredProductsForWeb(query: any): void {
    this.subscription.add(this._HttpService.get(APIs.filteredProductsForWeb, query).subscribe(( res : HResponse ) => {
      this.products = res.responseData;
    }));
  }


}
