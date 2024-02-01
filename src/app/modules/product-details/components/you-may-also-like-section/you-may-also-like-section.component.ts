import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CardCData } from 'src/app/shared-modules/auk-card-c/models/card-c-data/card-c-data';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'you-may-also-like-section',
  templateUrl: './you-may-also-like-section.component.html',
  styleUrls: ['./you-may-also-like-section.component.scss']
})
export class YouMayAlsoLikeSectionComponent implements OnInit, OnDestroy {

  @Input() productId: string = '97a2c8a7-225c-41cc-96df-0020cc08f7fe'
  
  // props 
  maxResultCount: number = 20;
  alsoLikeItems: CardCData[] = [];
  subscription: Subscription = new Subscription();
  

  constructor(
    private _HttpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getSameProducts();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getSameProducts(): void {
    const query = {
      maxResultCount: this.maxResultCount,
    }
    this.subscription.add(this._HttpService.get(`${APIs.getSameProducts}/${this.productId}`, query).subscribe(({responseData}: HResponse ) => {
      this.alsoLikeItems = responseData?.items
      console.log(this.alsoLikeItems, 'this.alsoLikeItems');
    }));
  }

}
