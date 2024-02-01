import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToFavComponent } from './add-to-fav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthModule } from 'src/app/modules/auth/auth.module';



@NgModule({
  declarations: [
    AddToFavComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    AddToFavComponent
  ]
})
export class AddToFavModule { }
