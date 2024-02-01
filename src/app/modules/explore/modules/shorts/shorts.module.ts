import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortsComponent } from './shorts.component';
import { ShortsRoutingModule } from './shorts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SectionsComponent } from './components/sections/sections.component';
import { AukCardBModule } from 'src/app/shared-modules/auk-card-b/auk-card-b.module';
import { AukCardAModule } from 'src/app/shared-modules/auk-card-a/auk-card-a.module';
import { FlashSaleComponent } from './components/flash-sale/flash-sale.component';
import { SwiperModule } from 'swiper/angular';
import { ItemStatsComponent } from './components/item-stats/item-stats.component';

// Vediogular 
import { BarRatingModule } from "ngx-bar-rating";
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { ShortsSliderComponent } from './components/shorts-slider/shorts-slider.component';
import { GridViewSliderComponent } from './components/grid-view-slider/grid-view-slider.component';
import { GridViewCardComponent } from './components/grid-view-card/grid-view-card.component';
import { AddToCartModule } from 'src/app/shared-modules/add-to-cart/add-to-cart.module';
import { AddToFavModule } from 'src/app/shared-modules/add-to-fav/add-to-fav.module';
import { LikeModule } from 'src/app/shared-modules/like/like.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AukRatingModule } from 'src/app/shared-modules/auk-rating/auk-rating.module';
import { AukPriceModule } from 'src/app/shared-modules/auk-price/auk-price.module';
import { FormsModule } from '@angular/forms';
import { ProductFeaturesModule } from 'src/app/shared-modules/product-features/product-features.module';
import { ImgPlaceholderModule } from 'src/app/shared-modules/img-placeholder/img-placeholder.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateExploreLoader } from 'src/app/core/config/translate-loaders';
import { environment } from 'src/environments/environment';
import { ProductDetailsDialogModule } from 'src/app/shared-modules/product-details-dialog/product-details-dialog.module';

@NgModule({
  declarations: [
    ShortsComponent,
    FlashSaleComponent,
    ItemStatsComponent,
    ShortsSliderComponent,
    GridViewCardComponent,
    GridViewSliderComponent,
    SectionsComponent
  ],
  imports: [
    LikeModule,
    FormsModule,
    VgCoreModule,
    CommonModule,
    SwiperModule,
    SharedModule,
    AukCardAModule,
    AukRatingModule,
    MatDialogModule,
    AukPriceModule,
    AddToFavModule,
    AukCardBModule,
    BarRatingModule,
    AddToCartModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    ShortsRoutingModule,
    ImgPlaceholderModule,
    ProductFeaturesModule,
    ProductDetailsDialogModule,
    TranslateModule.forChild({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateExploreLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ]
})
export class ShortsModule { }
