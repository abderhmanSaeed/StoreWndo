import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukCardCComponent } from './auk-card-c.component';
import { AddToFavModule } from '../add-to-fav/add-to-fav.module';
import { AddToCartModule } from '../add-to-cart/add-to-cart.module';
import { AukPriceModule } from '../auk-price/auk-price.module';
import { AukRatingModule } from '../auk-rating/auk-rating.module';
import { ImgPlaceholderModule } from '../img-placeholder/img-placeholder.module';
import { LikeModule } from '../like/like.module';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { OwnerSmallCardModule } from '../owner-small-card/owner-small-card.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AukCardCComponent
  ],
  imports: [
    LikeModule,
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    AddToFavModule,
    AukPriceModule,
    AukRatingModule,
    AddToCartModule,
    MatRippleModule,
    OwnerSmallCardModule,
    ImgPlaceholderModule,
  ],
  exports: [
    AukCardCComponent
  ]
})
export class AukCardCModule { }
