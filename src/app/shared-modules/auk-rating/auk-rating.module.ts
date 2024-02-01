import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukRatingComponent } from './auk-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AukRatingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    AukRatingComponent
  ]
})
export class AukRatingModule { }
