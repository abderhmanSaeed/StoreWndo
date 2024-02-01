import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { Subscription } from 'rxjs';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { VideoPopupComponent } from '../video-popup/video-popup.component';
import { Video } from 'src/app/shared/models/product/video/video';
import { ShortsService } from 'src/app/modules/explore/modules/shorts/services/shorts/shorts.service';
import { AukVideoService } from './services/auk-video/auk-video.service';
import { AukVideogularService } from 'src/app/shared/services/auk-videogular/auk-videogular.service';

@Component({
  selector: 'auk-video',
  templateUrl: './auk-video.component.html',
  styleUrls: ['./auk-video.component.scss']
})
export class AukVideoComponent implements OnInit, OnDestroy {

  // inputs 
  @Input() video!: Video;
  @Input() source: string = '';
  @Input() fullscreen: boolean = false;
  @Input() thmbnailClass: string = '';
  @Input() urlThumbnail: string = 'assets/media/layout/sidebar/ads/ad-img.jpg';
  
  @Input() set autoPlay(val: boolean) {
    this.isVideoLoading = val;
    this.isPlayed = val;
  }


  // booleans 
  isloop: boolean = true;
  isMuted: boolean = true;
  isPlayed: boolean = false;
  isPaused: boolean = false;
  isPlaying: boolean = false;
  isAutoplay: boolean = false;
  isVideoLoading: boolean = false;


  // props 
  faExpand = faExpand;
  vgApiService!: VgApiService;
  subscription: Subscription = new Subscription();


  constructor(
    private _MatDialog: MatDialog,
    private _ShortsService: ShortsService,
    private _AukVideoService: AukVideoService,
    private _AukVideogularService: AukVideogularService,
  ) { }

  ngOnInit(): void {
    this.shouldPauseVideoSubscription();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pauseShortsVideo() {
    this._ShortsService.shouldPauseVideo$.next(true);
  }


  shouldPauseVideoSubscription(): void {
    this.subscription.add( this._AukVideoService.shouldPauseVideo$.subscribe( (shouldPause: boolean) => {      
      if (shouldPause) {
        this.pause();
      }
    }))
  }

  onPlayerReady(api: VgApiService) {

    this.vgApiService = api;

    console.log(this.vgApiService.subscriptions);
    
   
    this.subscription.add( this.vgApiService.subscriptions.canPlay.subscribe( (res: any) => {   
      this._AukVideogularService.addVideo(api), 
      this.isVideoLoading = false;
      this.isPlayed = true;
    }));


    this.subscription.add( this.vgApiService.subscriptions.playing.subscribe( (res: any) => {   
      this.isVideoLoading = false;
      this.isPaused = false;
      this.isPlaying = true;
    }))


    this.subscription.add( this.vgApiService.subscriptions.pause.subscribe( (res: any) => {   
      this.isPaused = true;
      this.isPlaying = false;
    }))
  }



  pause(): void {
    if (this.isPlaying) {
      this.vgApiService.pause();
    }
  }


  play(): void {
    this._AukVideogularService.pauseAllVideos();
    this.pauseShortsVideo();
    this.isVideoLoading = true;
    this.isPlayed = true;
    if (this.isPaused) {
      this.vgApiService.play();
    }
  }


  onImgError(event: any){
    event.target.src = 'assets/media/logos/smile.svg'
  }


  expandVideo(): void {
    this.pause();
    this.openVideoPopup();
  }

  
  openVideoPopup(): void {
    this.pauseShortsVideo();
    this._AukVideogularService.pauseAllVideos();
    this._MatDialog.open(VideoPopupComponent, {
      width: '700px',
      maxWidth: '100%',
      panelClass: 'light-dialog',
      data: {
        videosSurce: this.source
      }
    });
  }
}
