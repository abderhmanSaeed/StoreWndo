import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LikeComponent } from './like.component';
import { AuthModule } from 'src/app/modules/auth/auth.module';



@NgModule({
  declarations: [
    LikeComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    LikeComponent
  ]
})
export class LikeModule { }
