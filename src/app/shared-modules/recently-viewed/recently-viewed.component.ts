import { Component, Input, OnInit } from '@angular/core';


// import Swiper core and required modules
import SwiperCore, { Pagination, Lazy, SwiperOptions, Virtual, } from "swiper";
import { RecentViewed } from './models/recent-viewed-dto/recent-viewed';
// install Swiper modules
SwiperCore.use([Lazy, Pagination, Virtual ]);

@Component({
  selector: 'recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss']
})
export class RecentlyViewedComponent implements OnInit {

  // Inputs
  @Input() items: RecentViewed[] | [] = [];


  // props
  swiperConfig: SwiperOptions = { };


  constructor() { }

  ngOnInit(): void {
    this.setSwiperConfig();
  }


  setSwiperConfig(): void {
    this.swiperConfig = {
      virtual: true,
      // slidesPerView: 6,
      lazy: true,
      spaceBetween: 16,
      pagination: {
        clickable: true,
      },
      breakpoints: {
        0:{
          pagination: false
        },
        768: {
          slidesPerView: 2,
          pagination: false,
        },
        992: {
          slidesPerView: 4,
          pagination: false,
        },
        1400: {
          slidesPerView: 5
        },
        1600: {
          slidesPerView: 6
        }
      }
    }
  }

  onSwiper(swiper: any) {
    // console.log(swiper);
  }
}
