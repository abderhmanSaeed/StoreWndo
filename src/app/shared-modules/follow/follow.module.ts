import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowComponent } from './follow.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FollowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FollowComponent
  ]
})
export class FollowModule { }
