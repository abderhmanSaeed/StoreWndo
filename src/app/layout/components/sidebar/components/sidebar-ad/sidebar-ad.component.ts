import { Component, OnDestroy, OnInit } from '@angular/core';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AdsService } from 'src/app/shared/services/ads/ads.service';

@Component({
  selector: 'sidebar-ad',
  templateUrl: './sidebar-ad.component.html',
  styleUrls: ['./sidebar-ad.component.scss']
})
export class SidebarAdComponent implements OnInit, OnDestroy {

  faVideo = faVideo;
  videoUrl: string = ''
  subscription: Subscription = new Subscription();


  // booleans 
  isPause: boolean = false;


  constructor(
    private _AdsService: AdsService,
  ) { }

  ngOnInit(): void {
    this.getAdsVideo();
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getAdsVideo(): void {
    this.subscription.add(
      this._AdsService.adsVideo$
      .subscribe({
        next: ( res: string ) => {          
          this.videoUrl = res;          
        }
      })
    )
  }


}
