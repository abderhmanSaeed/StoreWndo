import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Seller } from 'src/app/modules/explore/modules/shorts/models/explore-product/explore-product';
import { SearchTypes } from 'src/app/shared/enums/search-types/search-types';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'stores-section',
  templateUrl: './stores-section.component.html',
  styleUrls: ['./stores-section.component.scss']
})
export class StoresSectionComponent implements OnInit {

  // inputs
  @Input() sellers: Seller[] = [];
  @Input() term: string | null = '';
  @Input() sellersCount: number = 0;


  // props 
  fetchCriteria: any = {
    maxResultCount: 10
  }
  subscription: Subscription = new Subscription();


  // Paginator props 
  page:number = 1;
  perPage:number = 10;
  skipCount: number = 8;

  constructor(
    private _HttpService: HttpService,
    private _ActivatedRoute: ActivatedRoute,
  ) {
  }




  ngOnInit(): void {
    this.fetchCriteria.text = this.term;
    this.onQueryParamsChange();
  }


  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams:any) => {
        if (queryParams.text && JSON.parse(queryParams.type) == SearchTypes.Seller) {
          this.filteredSellersForWeb(queryParams);
        }
      })
    )
  }
  

  onPageChange(e: any): void {
    e--
    this.fetchCriteria.skipCount = e * this.perPage;
    this.filteredSellersForWeb(this.fetchCriteria);
  }


  filteredSellersForWeb(query: any): void {
    this.subscription.add(this._HttpService.get(APIs.filteredSellersForWeb, query).subscribe(( res : HResponse ) => {
      this.sellers = res.responseData;
    }));
  }

}
