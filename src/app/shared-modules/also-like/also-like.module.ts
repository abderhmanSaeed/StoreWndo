import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlsoLikeComponent } from './also-like.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AukCardCModule } from '../auk-card-c/auk-card-c.module';



@NgModule({
  declarations: [
    AlsoLikeComponent,
  ],
  imports: [
    SharedModule,
    SwiperModule,
    CommonModule,
    RouterModule,
    AukCardCModule,
  ],
  exports: [
    AlsoLikeComponent,
  ]
})
export class AlsoLikeModule { }
