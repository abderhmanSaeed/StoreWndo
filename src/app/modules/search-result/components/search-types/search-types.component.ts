import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchTypes } from 'src/app/shared/enums/search-types/search-types';
import { searchTypes } from 'src/app/shared/lookups/search-types';
import { SearchType } from 'src/app/shared/models/search-type/search-type';

@Component({
  selector: 'search-types',
  templateUrl: './search-types.component.html',
  styleUrls: ['./search-types.component.scss']
})
export class SearchTypesComponent implements OnInit, OnDestroy {


  
  // inputs
  @Input() set term (val: string | null) {    
    this.searchTerm = val;
  };


  // outputs 
  @Output() typesChange: EventEmitter<SearchTypes | null> = new EventEmitter();

  // props
  queryParams: any = {};
  searchTypesEnum = SearchTypes;
  searchTerm: string | null = '';
  searchTypes: SearchType[] = searchTypes;
  subscription: Subscription = new Subscription();

  constructor(
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
        this.queryParams = queryParams;
      })
    )
  }

}
