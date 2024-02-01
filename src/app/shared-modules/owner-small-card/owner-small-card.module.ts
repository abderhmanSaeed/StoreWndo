import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerSmallCardComponent } from './owner-small-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OwnerSmallCardComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    OwnerSmallCardComponent
  ]
})
export class OwnerSmallCardModule { }
