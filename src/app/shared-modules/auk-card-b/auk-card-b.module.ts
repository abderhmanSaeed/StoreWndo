import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukCardBComponent } from './auk-card-b.component';
import { MatCardModule } from '@angular/material/card';
import { AukCardBPriceComponent } from './components/auk-card-b-price/auk-card-b-price.component';
import { AddToFavModule } from '../add-to-fav/add-to-fav.module';
import { AddToCartModule } from '../add-to-cart/add-to-cart.module';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { LikeModule } from '../like/like.module';
import { ImgPlaceholderModule } from '../img-placeholder/img-placeholder.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateSharedLoader } from 'src/app/core/config/translate-loaders';
import { environment } from 'src/environments/environment';




@NgModule({
  declarations: [
    AukCardBComponent,
    AukCardBPriceComponent
  ],
  imports: [
    LikeModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    AddToFavModule,
    MatRippleModule,
    AddToCartModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateSharedLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    ImgPlaceholderModule
  ],
  exports: [
    AukCardBComponent
  ]
})
export class AukCardBModule { }
