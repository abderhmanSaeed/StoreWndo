import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPopupComponent } from './video-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    VideoPopupComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    VgCoreModule,
    MatDialogModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
  ],
  exports: [
    VideoPopupComponent,
  ]
})
export class VideoPopupModule { }
