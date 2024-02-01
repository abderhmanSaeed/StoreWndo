import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Mousewheel, Pagination, SwiperOptions, Keyboard, Autoplay } from "swiper";
import { SwiperComponent } from "swiper/angular";

import { VgApiService } from '@videogular/ngx-videogular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { ExploreProduct } from '../../models/explore-product/explore-product';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';
import { ShortsService } from '../../services/shorts/shorts.service';
import { ActivatedRoute } from '@angular/router';
import { AukVideoService } from 'src/app/shared-modules/auk-video/services/auk-video/auk-video.service';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { Constant } from 'src/app/core/config/constant';

// install Swiper modules
SwiperCore.use([Mousewheel, Pagination, Autoplay, Keyboard]);

@Component({
  selector: 'shorts-slider',
  templateUrl: './shorts-slider.component.html',
  styleUrls: ['./shorts-slider.component.scss']
})
export class ShortsSliderComponent implements OnInit, OnDestroy {

  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;

  // booleans
  isloop: boolean = true;
  isMuted: boolean = true;
  isPlaying: boolean = false;
  isAutoplay: boolean = false;
  slideChanged: boolean = false;
  isVideoLoading: boolean = true;


  totalCount: number = 0;
  vgApiService!: VgApiService;
  swiperConfig: SwiperOptions = { }
  exploreProducts: ExploreProduct[] = [];
  subscription: Subscription = new Subscription();
  fetchCriteria: any = {
    maxResultCount: 6,
    skipCount: 0,
    pages: this._BrowserService.getItem(Constant.explorePages) ? this._BrowserService.getItem(Constant.explorePages) : []
  }
  vgEndedSubscription: Subscription = new Subscription();

  constructor(
    private _HttpService: HttpService,
    private _ShortsService: ShortsService,
    private _ActivatedRoute: ActivatedRoute,
    private _BrowserService: BrowserService,
    private _ChangeDetectorRef: ChangeDetectorRef,
    private _AukVideoService: AukVideoService,
    private _HelperFunctionsService: HelperFunctionsService,
  ) { }

  ngOnInit(): void {
    this.setSwiperConfig();
    this.shouldPauseVideoSubscription();
    this.onQueryParamsChange();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams:any) => {
       
        this.exploreProducts= [];
       
        if (queryParams?.section) {
          this.fetchCriteria.section = queryParams?.section;
          this._ShortsService.sectionChange$.next(queryParams?.section);
        } else {
          this.fetchCriteria.section = null;
          this._ShortsService.sectionChange$.next(null);
        }

        queryParams?.category ? this.fetchCriteria.category = queryParams?.category : delete this.fetchCriteria.category;
        this.fetchCriteria.skipCount = 0;
        this.getExploreProducts(this.fetchCriteria);
      })
    )
  }


  getExploreProducts(payload: any, params?: any): void {
    this.isVideoLoading = true;
    this.subscription.add(this._HttpService.postByParams(APIs.getExploreProducts, params ,payload).subscribe(({responseData}: HResponse ) => {
      console.log('responseData:', responseData);
      if (responseData?.data?.items.length) {        
        this.fetchCriteria.pages = this._BrowserService.setItem(Constant.explorePages, responseData.pages);
        this.exploreProducts.push(...responseData?.data?.items);
        this.totalCount = responseData?.data?.totalCount;
        this.fetchCriteria.skipCount += this.fetchCriteria.maxResultCount;
      }
    }));
  }

  pauseAdsVideo() {
    this._AukVideoService.shouldPauseVideo$.next(true);
  }


  setSwiperConfig(): void {
    this.swiperConfig = {
      virtual: true,  
      spaceBetween: 0,
      allowTouchMove: false,
      direction: 'vertical',
      slidesPerView: 1,
      mousewheel: {
        invert: false,
        eventsTarget: '.shorts',
      },
      autoplay: this.isAutoplay ?  {
        delay: 7000,
      }: false,
      speed: 600,
      keyboard: {
        enabled: true,
        onlyInViewport: false
      }
    }
  }


  onSwiper(swiper: SwiperComponent) {
    // ....
  }


  onSlideChange(): void {
    this.sliderPaginationHandler();
    this.isVideoLoading = true;
    this.slideChanged = true;
  }


  shouldPauseVideoSubscription(): void {
    this.subscription.add( this._ShortsService.shouldPauseVideo$.subscribe( (shouldPause: boolean) => {
      if (shouldPause) {
        this.pauseVideo();
      }
    }))
  }


  onAutoPlayChange({checked}: MatSlideToggleChange): void {
    this.isAutoplay = checked;   
    this.toggleAutoplay();
  }


  toggleAutoplay(): void {

    if (this.isAutoplay) {

      if (this.vgApiService.isCompleted) this.slideNext()
      
      // 1. check if the current video is ended
      this.vgEndedSubscription = this.vgApiService.subscriptions.ended.subscribe( (val:any) => {
        // 2. call the slide next method 
        this.slideNext();
      })
           
      this.isloop = false;
    } else {      
      this.swiper.swiperRef.autoplay.stop()
      this.vgEndedSubscription.unsubscribe();
      this.isloop = true;
    }
    this.setSwiperConfig()
  }


  onPlayerReady(api: VgApiService) {
    this.vgApiService = api;
    
    this.subscription.add( this.vgApiService.subscriptions.canPlay.subscribe( (res: any) => {   

      if (this.slideChanged) {
        this.playVideo();
      }

      this.isVideoLoading = false;
      this._ChangeDetectorRef.detectChanges();      
    }))
    
    this.subscription.add( this.vgApiService.subscriptions.play.subscribe( (res: any) => {   
      this.pauseAdsVideo();
    }))

    console.log(this.vgApiService.subscriptions, 'subscriptions');
    

    this.subscription.add( this.vgApiService.subscriptions.playing.subscribe( (res: any) => {   
      this.isPlaying = true;
    }))

    this.subscription.add( this.vgApiService.subscriptions.pause.subscribe( (res: any) => {   
      this.isPlaying = false;
      this._ChangeDetectorRef.detectChanges();      
    }))

  }


  playVideo() {    
    // this.isVideoLoading = true;  
    this.vgApiService.play();
  }


  pauseVideo() {
    this.vgApiService.pause();
  }


  slideNext(){
    this.swiper.swiperRef.slideNext(600);
    this.toggleAutoplay();
    console.log('hello 1');
  }



  sliderPaginationHandler(): void {
    
    if (this._HelperFunctionsService.isNaturalNumber(((this.swiper.swiperRef.activeIndex+1) / 4)) && this.swiper.swiperRef.activeIndex > this.swiper.swiperRef.previousIndex) {
      if (this.fetchCriteria.skipCount < this.totalCount) {

        this.getExploreProducts(this.fetchCriteria, {hideLoader: true})
      } else {
        const subtraction = this.totalCount - this.fetchCriteria.skipCount;
        if (subtraction) {
          this.fetchCriteria.skipCount = this.exploreProducts.length
          this.getExploreProducts(this.fetchCriteria)
        }
      }
    } 
  }

  
  slidePrev(){
    this.swiper.swiperRef.slidePrev(600);
    this.toggleAutoplay();
  }



  onFollowingChange(state: any, product: any): void {
    console.log(state, product);
    const sellerId = product?.seller?.id
    this.exploreProducts.forEach( (product: ExploreProduct) => {
      if (product?.seller?.id == sellerId) {
        product.isFollowed = state;
      }
    });    
  }
  

  onProductWishChange(isInWishList: any, product: any): void {    
    const productId = product.id
    //Find index of specific object using findIndex method.    
    const objIndex = this.exploreProducts.findIndex(((obj: any) => obj.id == productId));
    //Update object's isLiked property.
    this.exploreProducts[objIndex].wishListData.isInWishList = isInWishList;
  }

  onProductLikeChange(state: any, product: any): void {
    console.log(state, product);
    const productId = product.id
    this.exploreProducts.forEach( (product: ExploreProduct) => {
      if (product?.id == productId) {
        product.isLiked = state;
      }
    });    
  }
  

}
