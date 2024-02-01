import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ExploreProduct } from 'src/app/modules/explore/modules/shorts/models/explore-product/explore-product';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { APIs } from 'src/app/core/config/apis';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { TranslateService } from '@ngx-translate/core';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Constant } from 'src/app/core/config/constant';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { Languages } from 'src/app/shared/enums/languages/languages';

@Component({
  selector: 'auk-card-a',
  templateUrl: './auk-card-a.component.html',
  styleUrls: ['./auk-card-a.component.scss']
})
export class AukCardAComponent implements OnInit {


  // Inputs props
  @Input() data: ExploreProduct = {
    wishListData: {
      isInWishList: false,
      wishListCount: 0
    }
  };

  // outputs props 
  @Output() addedToCart: EventEmitter<boolean> = new EventEmitter();
  @Output() onProductWishChange: EventEmitter<any> = new EventEmitter();
  @Output() onFollowingChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onProductLikeChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onProductWishCountChange: EventEmitter<any> = new EventEmitter();
  @Output() onProductLikesCountChange: EventEmitter<number> = new EventEmitter();


  // props 
  faStar = faStar;
  languagesEnum = Languages;
  lang: Languages = Languages.AR;
  subscription: Subscription = new Subscription();
  mainRippleColor: string = environment.mainRippleColor;


  // Booleans 
  isRequestSent: boolean = false;

  constructor(
    private _MatDialog: MatDialog,
    public authService: AuthService,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  onImgError(event: any){
    event.target.src = 'assets/media/logos/smile.svg'
  }



  shareToSeller(e: Event, productId: any): void {

    e.stopPropagation();
    if (!this.authService.isAuthenticated) {
      this.openAuthDialog();
      return
    }

    const payload = {
      productId,
    }
    this.subscription.add(this._HttpService.post(APIs.sendSellerRequest, payload)
    .subscribe((res: HResponse) => {
      this.isRequestSent = true;
      this._MessagesService.openSuccessSnackBar(
        this._TranslateService.instant('meassges.share-request-with-seller')
      , 3000)
    }));
  }

  
  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog',
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });
  }

 


}
