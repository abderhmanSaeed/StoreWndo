import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ExploreProduct } from '../../../models/explore-product/explore-product';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mobile-shorts-slider',
  templateUrl: './mobile-shorts-slider.component.html',
  styleUrls: ['./mobile-shorts-slider.component.scss'],
})
export class MobileShortsSliderComponent implements OnInit {
  @Input() exploreProducts: ExploreProduct[] = [];
  @Input() product: ExploreProduct | undefined;
  @Input() isVideoLoading: boolean = true;
  @Input() isPlaying: boolean = false;
  @Input() isAutoplay: boolean = false;
  @Output() onPlayVideo: EventEmitter<void> = new EventEmitter();
  @Output() onPlayerReady: EventEmitter<VgApiService> =
    new EventEmitter<VgApiService>();
  @Output() addedToCart: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('media', { static: false }) mediaElementRef!: ElementRef;

  faPlus = faPlus;

  @Output() onProductWishChange: EventEmitter<any> = new EventEmitter();
  @Output() onProductWishCountChange: EventEmitter<any> = new EventEmitter();
  @Output() onProductLikeChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onProductLikesCountChange: EventEmitter<number> = new EventEmitter();

  @Input() productIndex?:number;
  @Input() index?:number;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _HelperFunctionsService: HelperFunctionsService
  ) {
    this.initializeIcons();
  }

  ngOnInit(): void {}

  initializeIcons() {
    this.matIconRegistry.addSvgIcon(
      'open-box',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/open-box.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'pause',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/pause.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'offers',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/discount.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'like',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/like_2.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'comment',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/comment_3.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'feather-heart',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/heart_2.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'share',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/share.svg'
      )
    );
  }



  toggleVideoPlayback() {
    const video: HTMLVideoElement = this.mediaElementRef.nativeElement;

    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  playerReadyClick(api: VgApiService) {
    this.onPlayerReady.emit(api);
  }

  onOffers() {
    console.log('Offers clicked');
  }

  onAddedToCart(item: any, $event: boolean) {
    item.isInCart = $event;
  }

  copyProductDetailsLink(id: any): void {
    console.log("share")
    this._HelperFunctionsService.copy(environment.routes.productDetails + id).then( () => {
      this._MessagesService.openSuccessSnackBar(
        this._TranslateService.instant('shared.copied')
      , 3000)
    })
  }

  onImgError(event: any){
    event.target.src = 'assets/media/logos/smile.svg'
  }


}
