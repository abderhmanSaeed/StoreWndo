import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarRatingModule } from "ngx-bar-rating";

import { StarsRatingComponent } from './stars-rating.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    StarsRatingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BarRatingModule
  ],
  exports: [
    StarsRatingComponent
  ]
})
export class StarsRatingModule { }
