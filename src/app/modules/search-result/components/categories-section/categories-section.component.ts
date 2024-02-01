import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SearchTypes } from 'src/app/shared/enums/search-types/search-types';
import { Category } from 'src/app/shared/models/category/category';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { Section } from 'src/app/shared/models/section/section';

@Component({
  selector: 'categories-section',
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.scss']
})
export class CategoriesSectionComponent implements OnInit, OnDestroy {

  // Inputs
  @Input() categories: Category[] = [];

  // props 
  fetchCriteria: any = {
    type: SearchTypes.Category
  };
  searchTypes = SearchTypes;
  searchType: SearchTypes | null = null;
  subscription: Subscription = new Subscription();

  constructor(
    private _HttpService: HttpService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.onQueryParamsChange();
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams:any) => {
        if (queryParams.text && JSON.parse(queryParams.type) == SearchTypes.Category) {
          this.filteredDataForWeb(queryParams);
        }
      })
    )
  }


  filteredDataForWeb(query: any): void {
    this.subscription.add(this._HttpService.get(APIs.filteredDataForWeb, query).subscribe(({responseData}: HResponse ) => {
      this.categories = responseData?.categories;
    }));
  }

}
