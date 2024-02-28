import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsDialogComponent } from './product-details-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFeaturesModule } from '../product-features/product-features.module';
// Vediogular 
import { BarRatingModule } from "ngx-bar-rating";
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { RouterModule } from '@angular/router';
import { ProductDetailsDialogMainInfoComponent } from './components/product-details-dialog-main-info/product-details-dialog-main-info.component';
import { AddToCartModule } from '../add-to-cart/add-to-cart.module';
import { LikeModule } from '../like/like.module';
import { AddToFavModule } from 'src/app/shared-modules/add-to-fav/add-to-fav.module';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MobileProductDetailsDialogComponent } from './components/responsive/mobile-product-details-dialog/mobile-product-details-dialog.component';


@NgModule({
  declarations: [
    AddCommentComponent,
    ProductDetailsDialogComponent,
    ProductDetailsDialogMainInfoComponent,
    MobileProductDetailsDialogComponent
  ],
  imports: [
    LikeModule,
    SharedModule,
    FormsModule,
    CommonModule,
    VgCoreModule,
    RouterModule,
    AddToFavModule,
    MatDialogModule,
    AddToCartModule,
    BarRatingModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    ProductFeaturesModule
  ],
  exports: [
    ProductDetailsDialogComponent
  ]
})
export class ProductDetailsDialogModule { }
