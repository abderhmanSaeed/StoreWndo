import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from "swiper/angular";
import { faLongArrowAltRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, SwiperOptions } from "swiper";
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { GridCard } from '../../models/grid-card/grid-card';
import { ActivatedRoute } from '@angular/router';
import { ShortsService } from '../../services/shorts/shorts.service';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'grid-view-slider',
  templateUrl: './grid-view-slider.component.html',
  styleUrls: ['./grid-view-slider.component.scss', './grid-view-slider.component.rtl.scss'],
})
export class GridViewSliderComponent implements OnInit,  OnDestroy {

  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;

  // props 
  page: number = 0;
  pageSize: number = 10;
  totalCount: number = 0;
  items: GridCard[] = [];
  itemsCountPerSlide = 10;
  slidesCount: number = 0;
  LanguagesEnum = Languages;
  currentCardIndex: number = -1
  filterdItems: GridCard[]  = []
  swiperConfig: SwiperOptions = { }
  faLongArrowAltLeft = faLongArrowAltLeft;
  faLongArrowAltRight = faLongArrowAltRight;
  subscription: Subscription = new Subscription();
  lang: Languages = (this._TranslateService.currentLang as Languages);

  fetchCriteria: any = {
    maxResultCount: 30,
    skipCount: 0,
  }


  constructor(
    private _HttpService: HttpService,
    private _ShortsService: ShortsService,
    private _ActivatedRoute: ActivatedRoute,
    private _TranslateService: TranslateService,
  ) { }


  ngOnInit(): void {
    this.onLangChange();
    this.setSwiperConfig();
    this.onQueryParamsChange();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onLangChange(): void {
    this.subscription.add( this._TranslateService.onLangChange.subscribe(({lang}: any) => {
      this.lang = (lang as Languages);
    }));
  }


  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams:any) => {
       
        this.page = 0
        this.items = [];
        this.slidesCount = 0
        this.filterdItems = [];
        this.fetchCriteria.skipCount = 0;

        if (queryParams?.section) {
          this.fetchCriteria.section = queryParams?.section;
          this._ShortsService.sectionChange$.next(queryParams?.section);
        }

        queryParams?.category ? this.fetchCriteria.category = queryParams?.category : delete this.fetchCriteria.category;
        if (this.fetchCriteria.hideLoader) {
          delete this.fetchCriteria.hideLoader;
        }

        this.getGridPreview(this.fetchCriteria);
      })
    )
  }


  getGridPreview(query: any): void {
    this.subscription.add(this._HttpService.get(APIs.getGridPreview, query).subscribe(({responseData}: HResponse ) => {
      if (responseData?.items.length) {
        this.items.push(...responseData?.items);
        this.totalCount = responseData?.totalCount;
        this.slidesCount = Math.ceil(responseData?.totalCount / this.pageSize);
        console.log(this.slidesCount, 'this.slidesCount');
        
        this.getItemsSlider(this.page, this.pageSize);
        this.fetchCriteria.skipCount += this.fetchCriteria.maxResultCount;
      }
    }));
  }


  setSwiperConfig(): void {
    this.swiperConfig = {
      virtual: true,  
      spaceBetween: 0,
      allowTouchMove: false,
      slidesPerView: 1,
      pagination: {
        // el: ".xx",   //페이징 태그 클래스 설정 
        type: 'progressbar'
      },
      navigation:true,
      // autoplay: {
      //   delay: 7000,
      // },
      speed: 600,
      // loop: true
    }
  }

  onSwiper(swiper: SwiperComponent) {
    // ....
  }


  slideNext(){
    this.swiper.swiperRef.slideNext(600);    
    if ((this.page+1) < this.slidesCount) {
      this.page +=1
      this.getItemsSlider(this.page, this.pageSize);   

      if (this.fetchCriteria.skipCount < this.totalCount) {

        this.fetchCriteria.hideLoader = true;
        this.getGridPreview(this.fetchCriteria);

      } else {
        const subtraction = this.totalCount - this.fetchCriteria.skipCount;
        if (subtraction) {
          this.fetchCriteria.skipCount = this.items.length
          this.getGridPreview(this.fetchCriteria);
        }
      } 
    }
  }
  

  slidePrev(){
    this.swiper.swiperRef.slidePrev(600);
    if (this.page > 0) {
      this.page -=1
      this.getItemsSlider(this.page, this.pageSize);
    }
  }


  getItemsSlider(pageNumber: number, pageSize: number) {
    let sourse = [...this.items];
    let result = sourse.splice( (pageNumber * pageSize), pageSize);
    this.filterdItems = [...result]
    return result;
  }



  onProductLikeChange(data: any): void {
    const productId = data.product.productId
    //Find index of specific object using findIndex method.    
    const objIndex = this.filterdItems.findIndex(((obj: GridCard) => obj.productId == productId));
    //Update object's isLiked property.
    this.filterdItems[objIndex].isLiked = data.isLiked;
  }


  onProductWishChange(data: any): void {
    const productId = data.product.productId
    //Find index of specific object using findIndex method.    
    const objIndex = this.filterdItems.findIndex(((obj: GridCard) => obj.productId == productId));
    //Update object's isLiked property.
    this.filterdItems[objIndex].isInWishList = data.isInWishList;
  }

}
