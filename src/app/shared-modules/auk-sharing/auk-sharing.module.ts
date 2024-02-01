import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukSharingComponent } from './auk-sharing.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AukSharingComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    AukSharingComponent
  ]
})
export class AukSharingModule { }
