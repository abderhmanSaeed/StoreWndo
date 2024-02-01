import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikesRecievedComponent } from './likes-recieved.component';
import { LikeRecievedCardComponent } from './components/like-recieved-card/like-recieved-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    LikesRecievedComponent,
    LikeRecievedCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
  ],
  exports: [
    LikesRecievedComponent
  ]
})
export class LikesRecievedModule { }
