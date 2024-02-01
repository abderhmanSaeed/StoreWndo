import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'suggested-sellers',
  templateUrl: './suggested-sellers.component.html',
  styleUrls: ['./suggested-sellers.component.scss']
})
export class SuggestedSellersComponent implements OnInit, OnDestroy {

  // Inputs 
  @Input() sellerData: any = {};

  // props 
  suggestedSeller: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private _HttpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getSuggestedSellers();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getSuggestedSellers(): void {
    this.subscription.add(
      this._HttpService.get(`${APIs.getSuggestedSellers}/${this.sellerData?.id}`).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.suggestedSeller = res.responseData;
          console.log('suggestedSeller:', this.suggestedSeller);
        }
      })
    );
  }



}
