

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlashSalePageRoutingModule } from './flash-sale-page-routing.module';
import { FlashSalePageComponent } from './flash-sale-page.component';
import { AddToFavComponent } from 'src/app/shared-modules/add-to-fav/add-to-fav.component';
import { AddToFavModule } from 'src/app/shared-modules/add-to-fav/add-to-fav.module';
import { AukCardBModule } from 'src/app/shared-modules/auk-card-b/auk-card-b.module';



@NgModule({
  declarations: [
     FlashSalePageComponent,
],
imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    FlashSalePageRoutingModule,
    AddToFavModule,
    AukCardBModule
]
})
export class FlashSalepageModule { }
