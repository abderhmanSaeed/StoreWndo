import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukCardAComponent } from './auk-card-a.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { AddToCartModule } from '../add-to-cart/add-to-cart.module';
import { AddToFavModule } from '../add-to-fav/add-to-fav.module';
import { FollowModule } from '../follow/follow.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AukRatingModule } from '../auk-rating/auk-rating.module';
import { AukCardAPriceComponent } from './components/auk-card-a-price/auk-card-a-price.component';
import { LikeModule } from '../like/like.module';
import { SellerComponent } from './components/seller/seller.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ImgPlaceholderModule } from '../img-placeholder/img-placeholder.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateSharedLoader } from 'src/app/core/config/translate-loaders';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AukCardAComponent,
    AukCardAPriceComponent,
    SellerComponent
  ],
  imports: [
    LikeModule,
    PipesModule,
    FollowModule,
    CommonModule,
    RouterModule,
    MatCardModule,
    AddToFavModule,
    MatRippleModule,
    AddToCartModule,
    AukRatingModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateSharedLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    FontAwesomeModule,
    ImgPlaceholderModule
  ],
  exports: [
    AukCardAComponent,
  ]
})
export class AukCardAModule { }
