import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.scss']
})
export class VideoPopupComponent implements OnInit, OnDestroy {



  // props 
  source: string = '';
  vgApiService!: VgApiService;
  subscription: Subscription = new Subscription();

  // booleans 
  isVideoLoading: boolean = true;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.source = this.data?.video?.urlPreview;
    this.source =  this.source ? this.source : this.data?.videosSurce;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPlayerReady(api: VgApiService) {
    this.vgApiService = api;
    this.subscription.add( this.vgApiService.subscriptions.canPlay.subscribe( (res: any) => {   
      this.isVideoLoading = false;
      this.playVideo();
    }))
  }

  playVideo() {
    this.vgApiService.play();
  }


}
