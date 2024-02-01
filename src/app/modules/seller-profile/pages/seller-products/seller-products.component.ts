import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CardCData } from 'src/app/shared-modules/auk-card-c/models/card-c-data/card-c-data';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.scss']
})
export class SellerProductsComponent implements OnInit, OnDestroy {

  // props 
  products: any[] = [];
  sellerProfile: any = {};
  fetchCriteria: any = {
    maxResultCount: 12,
    isOffers: true
  }
  productsCount: number = 0;
  subscription: Subscription = new Subscription();
  
  // Paginator props 
  page:number = 1;
  perPage:number = 12;
  skipCount: number = 8;

  constructor(
    private _Router: Router,
    private _HttpService: HttpService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getSeller();
    this.onQueryParamsChange();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onPageChange(e: any): void {
    e--
    this.fetchCriteria.skipCount = e * this.perPage;
    this.filteredProductsForWeb(this.fetchCriteria);
  }

  getSeller(): void {
    this.subscription.add((this._ActivatedRoute?.parent as any).data.subscribe((data: any) => {
      this.products = [];
      this.sellerProfile = data?.sellerProfile?.responseData;   
      this.fetchCriteria.sellerIdd = this.sellerProfile?.id;
      this.productsCount = this.sellerProfile.offers;
      this.filteredProductsForWeb(this.fetchCriteria);
    }))
  }




  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams:any) => {
        let isOffers;
        if (queryParams?.['is-offers']) {
          isOffers = JSON.parse(queryParams?.['is-offers']);
        } else {
          isOffers = true;
        }
        this.fetchCriteria = {
          ...this.fetchCriteria,
          isOffers
        }
        this.filteredProductsForWeb(this.fetchCriteria);
      })
    )
  }

  filteredProductsForWeb(query: any): void {
    this.products = [];
    this.subscription.add(this._HttpService.get(APIs.filteredProductsForWeb, query).subscribe(( res : HResponse ) => {
      this.products = res.responseData;      
    }));
  }

  

}
