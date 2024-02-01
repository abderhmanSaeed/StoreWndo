import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from '../../models/http-response/http-response';

@Injectable({
  providedIn: 'root'
})
export class AdsService {


  subscription: Subscription = new Subscription();
  adsVideo$: BehaviorSubject<any | null> = new BehaviorSubject(null);
  adsBanner$: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(
    private _HttpService: HttpService,
  ) { }


  getAdsBanner(): void {
    this.subscription.add(
      this._HttpService.get(APIs.getAdsBanner)
      .subscribe({
        next: ( res: HResponse ) => {
          this.adsBanner$.next(res.responseData?.url)
        }
      })
    )
  }


  getAdsVideo(): void {
    this.subscription.add(
      this._HttpService.get(APIs.getAdsVideo)
      .subscribe({
        next: ( res: HResponse ) => {
          this.adsVideo$.next(res.responseData?.url)
        }
      })
    )
  }

}
