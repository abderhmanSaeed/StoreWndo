import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchTypesComponent } from './components/search-types/search-types.component';
import { SearchTypeCardComponent } from './components/search-type-card/search-type-card.component';
import { SearchResultStoreCardComponent } from './components/search-result-store-card/search-result-store-card.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AukCardCModule } from 'src/app/shared-modules/auk-card-c/auk-card-c.module';
import { FollowModule } from 'src/app/shared-modules/follow/follow.module';
import { SectionsSectionComponent } from './components/sections-section/sections-section.component';
import { StoresSectionComponent } from './components/stores-section/stores-section.component';
import { ImgPlaceholderModule } from 'src/app/shared-modules/img-placeholder/img-placeholder.module';
import { RecentlyViewedModule } from 'src/app/shared-modules/recently-viewed/recently-viewed.module';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { AukRatingModule } from 'src/app/shared-modules/auk-rating/auk-rating.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SearchResultComponent,
    SearchTypesComponent,
    SearchTypeCardComponent,
    SearchResultStoreCardComponent,
    SearchProductsComponent,
    SectionsSectionComponent,
    StoresSectionComponent,
    CategoriesSectionComponent,
  ],
  imports: [
    CommonModule,
    FollowModule,
    SharedModule,
    AukCardCModule,
    TranslateModule,
    AukRatingModule,
    FontAwesomeModule,
    ImgPlaceholderModule,
    RecentlyViewedModule,
    SearchResultRoutingModule,
  ]
})
export class SearchResultModule { }
