import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { CartService } from 'src/app/modules/cart/services/cart/cart.service';
import { DeliveryMethods } from 'src/app/shared/enums/delivery-methods/delivery-methods';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnInit {

  // Inputs producData
  @Input() set data(producData : any) {
    this.producData = producData;
  };

  // props 
  rate: number = 3;
  producData: any = {};
  productDetails: any = {};
  languagesEnum = Languages;
  lang: Languages = Languages.AR;
  deliveryMethods = DeliveryMethods;
  subscription: Subscription = new Subscription();



  // Booleans 
  isRequestSent: boolean = false;



  constructor(
    private _MatDialog: MatDialog,
    public authService: AuthService,
    private _CartService: CartService,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
  ) { }


  ngOnInit(): void {   
    this.lang = this._BrowserService.getItem(Constant.locale); 
  }


  onProductFeatursChange(productFeaturs: any): void {
    this.productDetails = productFeaturs;
  }


  addToCart(): void {  


    if (!this.authService.isAuthenticated) {
      this.openAuthDialog();
      return
    }


    const payload = {
      productId: this.producData.id,
      ...this.productDetails
    }
    this.subscription.add(
      this._HttpService.post(APIs.addToCart, payload).subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this._MessagesService.openSuccessSnackBar(res.responseData.message);
          let cartItemCount = this._CartService.onCartItemsCountChange$.getValue();
          cartItemCount++
          this._CartService.onCartItemsCountChange$.next(cartItemCount);
          this.producData.isInCart = true;
        } 
      })  
    );
  }


  openAuthDialog() {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog',
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });
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

}
