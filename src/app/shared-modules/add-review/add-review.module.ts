import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReviewComponent } from './add-review.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BarRatingModule } from "ngx-bar-rating";
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    AddReviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    BarRatingModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddReviewComponent,
  ]
})
export class AddReviewModule { }
