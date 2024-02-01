import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecentlyViewedModule } from 'src/app/shared-modules/recently-viewed/recently-viewed.module';
import { YouMayAlsoLikeSectionComponent } from './components/you-may-also-like-section/you-may-also-like-section.component';
import { RecentlyViewedComponent } from './components/recently-viewed/recently-viewed.component';
import { AlsoLikeModule } from 'src/app/shared-modules/also-like/also-like.module';
import { CommentsRepliesComponent } from './components/comments-replies/comments-replies.component';
import { MainInfoComponent } from './components/main-info/main-info.component';
import { AddToFavModule } from 'src/app/shared-modules/add-to-fav/add-to-fav.module';
import { ProductSellerComponent } from './components/product-seller/product-seller.component';
import { FollowModule } from 'src/app/shared-modules/follow/follow.module';
import { BarRatingModule } from "ngx-bar-rating";
import { AukPriceModule } from 'src/app/shared-modules/auk-price/auk-price.module';
import { ProductLookupsComponent } from './components/product-lookups/product-lookups.component';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { ProductVideosComponent } from './components/product-videos/product-videos.component';
import { ProductVideoCardComponent } from './components/product-videos/components/product-video-card/product-video-card.component';
import { ImgPlaceholderModule } from 'src/app/shared-modules/img-placeholder/img-placeholder.module';
import { OwnerSmallCardModule } from 'src/app/shared-modules/owner-small-card/owner-small-card.module';
import { ProductFeatursComponent } from './components/product-featurs/product-featurs.component';
import { QuantityControlsModule } from 'src/app/shared-modules/quantity-controls/quantity-controls.module';
import { FormsModule } from '@angular/forms';
import { AukVideoModule } from 'src/app/shared-modules/auk-video/auk-video.module';
import { CommentComponent } from './components/comments-replies/components/comment/comment.component';
import { AddCommentComponent } from './components/comments-replies/components/add-comment/add-comment.component';
import { ReplyComponent } from './components/comments-replies/components/reply/reply.component';
import { VideoPopupModule } from 'src/app/shared-modules/video-popup/video-popup.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateProductDetailsLoader } from 'src/app/core/config/translate-loaders';
import { environment } from 'src/environments/environment';
import { ProductDetailsHomeComponent } from './pages/product-details-home/product-details-home.component';
import { ProductReviewsComponent } from './pages/product-reviews/product-reviews.component';
import { ProgressReviewsComponent } from './components/progress-reviews/progress-reviews.component';
import { StarsReviewsComponent } from './components/stars-reviews/stars-reviews.component';
import { ReviewsBarComponent } from './components/reviews-bar/reviews-bar.component';
import { StarsRatingModule } from 'src/app/shared-modules/stars-rating/stars-rating.module'; 
import { AddReviewModule } from 'src/app/shared-modules/add-review/add-review.module';


@NgModule({
  declarations: [
    ProductDetailsComponent,
    YouMayAlsoLikeSectionComponent,
    RecentlyViewedComponent,
    CommentsRepliesComponent,
    MainInfoComponent,
    ProductSellerComponent,
    ProductLookupsComponent,
    ProductGalleryComponent,
    ProductVideosComponent,
    ProductVideoCardComponent,
    ProductFeatursComponent,
    CommentComponent,
    AddCommentComponent,
    ReplyComponent,
    ProductDetailsHomeComponent,
    ProductReviewsComponent,
    ProgressReviewsComponent,
    StarsReviewsComponent,
    ReviewsBarComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    FollowModule,
    AlsoLikeModule,
    AukPriceModule,
    AddToFavModule,
    AukVideoModule,
    BarRatingModule,
    AddReviewModule,
    VideoPopupModule,
    ImgPlaceholderModule,
    OwnerSmallCardModule,
    RecentlyViewedModule,
    QuantityControlsModule,
    ProductDetailsRoutingModule,
    StarsRatingModule,
    TranslateModule.forChild({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateProductDetailsLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ]
})
export class ProductDetailsModule { }
