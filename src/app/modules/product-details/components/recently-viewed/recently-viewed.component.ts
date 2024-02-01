import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { RecentViewed } from 'src/app/shared-modules/recently-viewed/models/recent-viewed-dto/recent-viewed';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss']
})
export class RecentlyViewedComponent implements OnInit, OnDestroy {

  // props 
  recentlyViewed: RecentViewed[] = [];
  subscription: Subscription = new Subscription();
  
  constructor(
    private _HttpService: HttpService,
  ) { }

 
  ngOnInit(): void {
    this.getRecentlyViewed();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
  getRecentlyViewed(): void {
    const query = {
      maxResultCount: 20
    }
    this.subscription.add(this._HttpService.get(APIs.getRecentlyViewed, query).subscribe(({responseData}: HResponse ) => {
      this.recentlyViewed = responseData?.items
    }));
  }
}
