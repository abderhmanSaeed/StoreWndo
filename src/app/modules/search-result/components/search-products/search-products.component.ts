import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CardCData } from 'src/app/shared-modules/auk-card-c/models/card-c-data/card-c-data';
import { SearchTypes } from 'src/app/shared/enums/search-types/search-types';
import { sortByList } from 'src/app/shared/lookups/sort-by';
import { Breadcrumb } from 'src/app/shared/models/breadcrumb/breadcrumb';
import { DropdownItem } from 'src/app/shared/models/dropdown-item/dropdown-item';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { SortBy } from 'src/app/shared/models/sort-by/sort-by';

@Component({
  selector: 'search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {


  // inputs
  @Input() term: string | null = '';
  @Input() productsCount: number = 0;
  @Input() products: CardCData[] = [];
  @Input() set selectedSearchType(val: SearchTypes | null) {
    
  }


  // props 
  fetchCriteria: any = {
    maxResultCount: 10
  }
  queryParams: any;
  breadcrumb: Breadcrumb[] = [];
  sortItems: SortBy[] = sortByList;
  subscription: Subscription = new Subscription();

  // Paginator props 
  page:number = 1;
  perPage:number = 8;
  skipCount: number = 8;

  constructor(
    private _Router: Router,
    private _HttpService: HttpService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.fetchCriteria.text = this.term;
    this.onQueryParamsChange();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams:any) => {
        this.setBreadcrumb(queryParams);
        this.queryParams = queryParams;
        // let queries
        if (queryParams.text) {
          this.fetchCriteria = {
            maxResultCount: 10,
            ...queryParams
          }
          const searchType = JSON.parse(this.fetchCriteria.type);          
          if (searchType != SearchTypes.Category && searchType != SearchTypes.Subcategory) {
            delete this.fetchCriteria.type
          }
          this.filteredProductsForWeb(this.fetchCriteria);
        }
      })
    )
  }

  onPageChange(e: any): void {
    e--
    this.fetchCriteria.skipCount = e * this.perPage;
    this.filteredProductsForWeb(this.fetchCriteria);
  }


  filteredProductsForWeb(query: any): void {
    this.products = [];
    this.subscription.add(this._HttpService.get(APIs.filteredProductsForWeb, query).subscribe(( res : HResponse ) => {
      this.products = res.responseData;      
    }));
  }

  
  setBreadcrumb(queryParams: any): void {

    let breadcrumb: Breadcrumb[] = []
    if (queryParams['section-name']) {
      breadcrumb.push({
        name: queryParams['section-name'],
        url: '/search-results/sections'
      })
    }

    if (queryParams['category-name']) {
      breadcrumb.push({
        name: queryParams['category-name'],
        url: '/search-results/categories',
      })
    }

    
    if(breadcrumb[breadcrumb.length - 1]) breadcrumb[breadcrumb.length - 1].active = true;
    
    
    this.breadcrumb = [...breadcrumb];

  }



  onSortChange(item: any): void {
    this._Router.navigate([], {
      queryParams: {
        sortBy: item?.id
      },
      queryParamsHandling: 'merge',
    });
  }


}
