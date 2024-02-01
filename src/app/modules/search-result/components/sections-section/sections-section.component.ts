import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SearchTypes } from 'src/app/shared/enums/search-types/search-types';
import { Category } from 'src/app/shared/models/category/category';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { Section } from 'src/app/shared/models/section/section';
import { RouterService } from 'src/app/shared/services/router/router.service';

@Component({
  selector: 'sections-section',
  templateUrl: './sections-section.component.html',
  styleUrls: ['./sections-section.component.scss']
})
export class SectionsSectionComponent implements OnInit, OnDestroy {

  // Inputs
  @Input() set data( items: Section[]) {
    this.sections = items;
    this.categories = [];
    this.sectionTitle = 'shared.sections';
  };
  @Input() set selectedSearchType(val: SearchTypes | null) {
    this.searchType = val
  }


  // props 
  fetchCriteria: any = {
    type: SearchTypes.Section
  };
  sections: Section[] = []
  searchTypes = SearchTypes;
  categories: Category[] = [];
  searchType: SearchTypes | null = null;
  sectionTitle: string | any = 'shared.sections';
  subscription: Subscription = new Subscription();

  constructor(
    private _HttpService: HttpService,
    private _RouterService: RouterService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.onQueryParamsChange();
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onSectionClick(section?: Section): void {
    this.sections = [];
    this.getCategories(section);
  }


  onCategoryClick(category?: Category): void {
    console.log(category);
  }


  getCategories(section: Section | undefined) {
    if (!section) return
    const query = {
      section: section.id
    }
    this.subscription.add(this._HttpService.get(APIs.getCategories, query).subscribe(({responseData}: HResponse ) => {
      this.sectionTitle = section.name;
      this.categories = responseData.items;
    }));
  }



  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams:any) => {

        if(!queryParams.type) return
        if (queryParams.text && JSON.parse(queryParams.type) == SearchTypes.Section) {
          this.filteredDataForWeb(queryParams);
        }

      })
    )
  }


  filteredDataForWeb(query: any): void {
    this.subscription.add(this._HttpService.get(APIs.filteredDataForWeb, query).subscribe(({responseData}: HResponse ) => {
      this.sections = responseData?.sections;
    }));
  }

}
