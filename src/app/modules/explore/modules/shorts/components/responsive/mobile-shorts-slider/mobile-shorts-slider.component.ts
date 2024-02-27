import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
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
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Subscription } from 'rxjs';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsDialogComponent } from 'src/app/shared-modules/product-details-dialog/product-details-dialog.component';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { Constant } from 'src/app/core/config/constant';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { MobileProductDetailsDialogComponent } from 'src/app/shared-modules/product-details-dialog/components/responsive/mobile-product-details-dialog/mobile-product-details-dialog.component';

@Component({
  selector: 'app-mobile-shorts-slider',
  templateUrl: './mobile-shorts-slider.component.html',
  styleUrls: ['./mobile-shorts-slider.component.scss'],
})
export class MobileShortsSliderComponent implements OnInit {
  @ViewChild('media', { static: false }) mediaElementRef!: ElementRef;

  @Input() product: ExploreProduct | undefined;

  @Output() addedToCart: EventEmitter<boolean> = new EventEmitter();
  @Output() onProductWishChange: EventEmitter<any> = new EventEmitter();
  @Output() onProductWishCountChange: EventEmitter<any> = new EventEmitter();
  @Output() onProductLikesCountChange: EventEmitter<number> =
    new EventEmitter();
  @Output() onProductLikeChange: EventEmitter<boolean> = new EventEmitter();

  // Icon
  faPlus = faPlus;

  subscription: Subscription = new Subscription();

  lang: Languages = Languages.AR;

  isVideoLoading: boolean = true;
  vgApiService!: VgApiService;
  toggleVideoPlay: string = 'shared.auto';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _HelperFunctionsService: HelperFunctionsService,
    private _HttpService: HttpService,
    private _MatDialog: MatDialog,
    private _BrowserService: BrowserService,
    private _ChangeDetectorRef: ChangeDetectorRef
  ) {
    this.initializeIcons();
  }

  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

  toggleVideoPlayback(): void {
    const video: HTMLVideoElement = this.mediaElementRef.nativeElement;
    if (video.paused) {
      video.play();
      this.toggleVideoPlay = 'shared.pause';
    } else {
      video.pause();
      console.log('stop');
      this.toggleVideoPlay = 'shared.auto';
    }
  }

  onPlayerReady(api: any) {
    this.vgApiService = api;

    this.subscription.add(
      this.vgApiService.subscriptions.canPlay.subscribe((res: any) => {
        if (this.vgApiService.getMediaById(this.product?.id)) {
          this.vgApiService.play();
        }

        this.isVideoLoading = false;
        this._ChangeDetectorRef.detectChanges();
      })
    );
  }

  onOffers() {
    console.log('Offers clicked');
  }

  onAddedToCart(item: any, $event: boolean) {
    item.isInCart = $event;
  }

  copyProductDetailsLink(id: any): void {
    console.log('share');
    this._HelperFunctionsService
      .copy(environment.routes.productDetails + id)
      .then(() => {
        this._MessagesService.openSuccessSnackBar(
          this._TranslateService.instant('shared.copied'),
          3000
        );
      });
  }

  onImgError(event: any) {
    event.target.src = 'assets/media/logos/smile.svg';
  }

  openGridCardPerviewDialog(data: any): void {
    this._MatDialog.open(MobileProductDetailsDialogComponent, {
      width: '100%',
      // maxWidth: '100%',
      data,
      direction: this.lang == Languages.AR ? 'rtl' : 'ltr',
      panelClass: 'product-details-dialog',
    });
  }

  getProductDetails(productId: any): void {
    this.subscription.add(
      this._HttpService
        .get(`${APIs.getProductDetails}/${productId}`)
        .subscribe((res: HResponse) => {
          this.openGridCardPerviewDialog(res.responseData);
        })
    );
  }

  onExpandClick(productId: any): void {
    if (productId) {
      this.getProductDetails(productId);
    }
  }
}
