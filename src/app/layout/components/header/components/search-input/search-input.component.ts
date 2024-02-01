import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { SearchResult } from 'src/app/shared/models/search-result/search-result';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {

  // booleans 
  noResult: boolean = false;
  isFocused: boolean = false;


  // props 
  recentSearch: string[] = [];
  searchResultCount: number = 8;
  searchResults: string[] = [];
  subscription: Subscription = new Subscription();

  // typeahead props 
  model: string = '';
  searching = false;
  searchFailed = false;

  constructor(
    private _HttpService: HttpService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.getAllData();
    this.onQueryParamsChange();
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllData(): void {
  }


  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams:any) => {        
        queryParams?.text ? this.model = queryParams?.text : this.model = '';
      })
    )
  }


  onSearchFocus(): void {
    this.isFocused = true;
    this.getRecentSearch();
  }


  getRecentSearch(): void {
    this.searching = true
    this.subscription.add(
      this._HttpService.get(APIs.getRecentSearch, {hideLoader: true})
      .pipe(
        finalize(() => (this.searching = false))
      )
      .subscribe( (res: HResponse) => {
        this.recentSearch = res.responseData;
      })
    )
  }


  clearRecentSearch(): void {
    this.searching = true
    this.subscription.add(
      this._HttpService.post(APIs.clearRecentSearch, {hideLoader: true})
      .pipe(
        finalize(() => (this.searching = false))
      )
      .subscribe( (res: HResponse) => {
        this.recentSearch = [];
      })
    )
  }



  searchAutoComplete(term: string) {
    if (term === '') {
      this.getRecentSearch();
      return of([]);
    }

    return this._HttpService
    .get(APIs.searchAutoComplete, {text: term, hideLoader: true}).pipe(
      map(response => response.responseData?.map((item: any) => item.name))
    );
  }


  search: any = (text$: Observable<string>) =>  
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.searchAutoComplete(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap((res) => {
        this.searching = false;
        this.searchResults = res;        
      })
    );


    onRecentTermClick(term: string): void {
      this.searching = true;  
      this.model = term;    
      this.subscription.add(
        this.searchAutoComplete(term).pipe(
          finalize( () => (this.searching = false))
          ).subscribe( res=> {
            this.searchResults = res;
          })
      )
    }
    

    closeSearchDropdown(name?: string): void {
      // this.model = name;
      this.isFocused = false;
    }


    seeAll(): void {
      this.isFocused = true;
      this.searchResultCount = this.searchResults.length
    }


    deletRecentSearchTxt(text: string, index: number): void {
      this.searching = true
      const query = {
        text,
        hideLoader: true
      }
      this.subscription.add(
        this._HttpService.delete(APIs.recentSearchText, query)
        .pipe(
          finalize(() => (this.searching = false))
        )
        .subscribe( (res: HResponse) => {
          this.recentSearch.splice(index, 1)
        })
      )
    }
}
