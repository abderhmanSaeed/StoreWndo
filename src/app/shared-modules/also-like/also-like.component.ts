import { Component, Input, OnInit } from '@angular/core';


// import Swiper core and required modules
import SwiperCore, { Pagination, Lazy, SwiperOptions, Virtual, } from "swiper";
import { CardCData } from '../auk-card-c/models/card-c-data/card-c-data';
// install Swiper modules
SwiperCore.use([Lazy, Pagination, Virtual ]);

@Component({
  selector: 'also-like',
  templateUrl: './also-like.component.html',
  styleUrls: ['./also-like.component.scss']
})
export class AlsoLikeComponent implements OnInit {

  // Inputs
  @Input() set items(data: CardCData[]) {
    this.alsoLikeItems = data;
  };


  // props
  swiperConfig: SwiperOptions = { };
  alsoLikeItems: CardCData[] | any = [];


  constructor() { }

  ngOnInit(): void {
    this.setSwiperConfig();
    console.log(this.items, 'items');

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
        0: {
          pagination: false,
        },
        768: {
          slidesPerView: 2,
          pagination: false,
        },
        992: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 3.45
        },
        1400: {
          slidesPerView: 4
        },
        1600: {
          slidesPerView: 5
        },
      }
    }
  }

  onSwiper(swiper: any) {
    // console.log(swiper);
  }
}
