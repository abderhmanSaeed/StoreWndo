import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentlyViewedComponent } from './recently-viewed.component';
import { RecentViewedCardComponent } from './components/recent-viewed-card/recent-viewed-card.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AukRatingModule } from '../auk-rating/auk-rating.module';
import { ImgPlaceholderModule } from '../img-placeholder/img-placeholder.module';
import { AddToCartModule } from '../add-to-cart/add-to-cart.module';
import { AddToFavModule } from '../add-to-fav/add-to-fav.module';
import { AukPriceModule } from '../auk-price/auk-price.module';
import { LikeModule } from '../like/like.module';
import { RouterModule } from '@angular/router';
import { ProductDetailsDialogModule } from '../product-details-dialog/product-details-dialog.module';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';


@NgModule({
  declarations: [
    RecentlyViewedComponent,
    RecentViewedCardComponent
  ],
  imports: [
    LikeModule,
    SharedModule,
    SwiperModule,
    CommonModule,
    RouterModule,
    VgCoreModule,
    AukPriceModule,
    AddToFavModule,
    AddToCartModule,
    AukRatingModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    ImgPlaceholderModule,
    ProductDetailsDialogModule,
  ],
  exports: [
    RecentlyViewedComponent,
  ]
})
export class RecentlyViewedModule { }
