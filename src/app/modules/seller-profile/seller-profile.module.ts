import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerProfileRoutingModule } from './seller-profile-routing.module';
import { SellerProfileComponent } from './seller-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SellerAsideComponent } from './components/seller-aside/seller-aside.component';
import { SellerMainInfoComponent } from './components/seller-main-info/seller-main-info.component';
import { BarRatingModule } from "ngx-bar-rating";
import { SellerStatsComponent } from './components/seller-stats/seller-stats.component';
import { SellerProductsComponent } from './pages/seller-products/seller-products.component';
import { GuestComponent } from './pages/guest/guest.component';
import { SuggestedSellersComponent } from './components/suggested-sellers/suggested-sellers.component';
import { SuggestedSellerCardComponent } from './components/suggested-seller-card/suggested-seller-card.component';
import { AukRatingModule } from 'src/app/shared-modules/auk-rating/auk-rating.module';
import { AukCardCModule } from 'src/app/shared-modules/auk-card-c/auk-card-c.module';
import { FollowModule } from 'src/app/shared-modules/follow/follow.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateSellerLoader } from 'src/app/core/config/translate-loaders';
import { environment } from 'src/environments/environment';
import { AukSharingModule } from 'src/app/shared-modules/auk-sharing/auk-sharing.module';
import { FollowersModule } from 'src/app/shared-modules/followers/followers.module';
import { FollowingModule } from 'src/app/shared-modules/following/following.module';
import { LikesRecievedModule } from 'src/app/shared-modules/likes-recieved/likes-recieved.module';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    GuestComponent,
    SellerAsideComponent,
    SellerStatsComponent,
    SellerProfileComponent,
    SellerMainInfoComponent,
    SellerProductsComponent,
    SuggestedSellersComponent,
    SuggestedSellerCardComponent,
  ],
  imports: [
    AuthModule,
    FollowModule,
    CommonModule,
    SharedModule,
    AukRatingModule,
    AukCardCModule,
    BarRatingModule,
    AukSharingModule,
    FollowersModule,
    FollowingModule,
    LikesRecievedModule,
    SellerProfileRoutingModule,
    TranslateModule.forChild({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateSellerLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ]
})
export class SellerProfileModule { }
