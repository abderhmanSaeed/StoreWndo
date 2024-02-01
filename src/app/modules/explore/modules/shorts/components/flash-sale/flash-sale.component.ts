import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { AdsService } from 'src/app/shared/services/ads/ads.service';
import { environment } from 'src/environments/environment';

// import Swiper core and required modules
import SwiperCore, { Pagination, Lazy, SwiperOptions, Virtual, } from "swiper";
import { FlashSale } from '../../models/explore-product/explore-product';

// install Swiper modules
SwiperCore.use([Lazy, Pagination, Virtual ]);
@Component({
  selector: 'flash-sale',
  templateUrl: './flash-sale.component.html',
  styleUrls: ['./flash-sale.component.scss'],
})
export class FlashSaleComponent implements OnInit, OnDestroy {

  @Input() items: FlashSale[] | [] = [];


  // Props 
  bannerUrl: string = ''
  swiperConfig: SwiperOptions = { };
  subscription: Subscription = new Subscription();
  mainRippleColor: string = environment.mainRippleColor

  constructor(
    private _AdsService: AdsService,
  ) { }


  ngOnInit(): void {
    this.getAdsBanner();
    this.setSwiperConfig();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  setSwiperConfig(): void {
    this.swiperConfig = {
      virtual: true,  
      slidesPerView: 2,
      lazy: true,
      spaceBetween: 16,
      pagination: {
        clickable: true,
      }
    }
  }


  onSwiper(swiper: any) {
    // console.log(swiper);
  }


  getAdsBanner(): void {
    this.subscription.add(
      this._AdsService.adsBanner$
      .subscribe({
        next: ( res: string ) => {          
          this.bannerUrl = res;
        }
      })
    )
  }



  onProductWishChange(isInWishList: any, product: any): void {    
    const productId = product.id
    //Find index of specific object using findIndex method.    
    const objIndex = this.items.findIndex(((obj: any) => obj.id == productId));
    //Update object's isLiked property.
    this.items[objIndex].isInWishList = isInWishList;
  }

}
