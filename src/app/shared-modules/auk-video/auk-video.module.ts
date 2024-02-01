import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukVideoComponent } from './auk-video.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImgPlaceholderModule } from '../img-placeholder/img-placeholder.module';



@NgModule({
  declarations: [
    AukVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    ImgPlaceholderModule
  ],
  exports: [
    AukVideoComponent,
  ]
})
export class AukVideoModule { }
