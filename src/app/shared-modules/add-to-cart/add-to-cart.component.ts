import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { CartService } from 'src/app/modules/cart/services/cart/cart.service';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { ProductFeaturesComponent } from '../product-features/product-features.component';

@Component({
  selector: 'add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss', './add-to-cart.component.rtl.scss']
})
export class AddToCartComponent implements OnInit {

  // inputs props 
  @Input() panelClass: string = '';
  @Input() isInCart: boolean | undefined = false;
  @Input() isIsolated: boolean | undefined = false;
  @Input() productId: string | undefined = undefined;

  // Outputs
  @Output() addedToCart: EventEmitter<boolean> = new EventEmitter();

  
  // props
  languagesEnum = Languages;
  lang: Languages = Languages.AR;
  subscription: Subscription = new Subscription();

  constructor(
    private _MatDialog: MatDialog,
    public authService: AuthService,
    private _HttpService: HttpService,
    private _CartService: CartService,
    private _BrowserService: BrowserService,
    private _MessagesService: MessagesService,
  ) {}


  ngOnInit(): void {   
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  addToCartHandler(e: any) {

    if (this.isIsolated) return;

    e.stopPropagation();

    if (!this.authService.isAuthenticated) {
      this.openAuthDialog();
      return
    }

    if (this.productId) {
      this.getSizesColorsOfProducts(this.productId);
    }

  }


  openProductFeaturesDialog(data: string): void {
    const dialogRef = this._MatDialog.open(ProductFeaturesComponent, {
      width: '650px',
      data,
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( res => {
        if (res?.isSuccess) {
          this.isInCart = true;
          this.addedToCart.emit(true);
        }
      })
    )
  }


  addToCart(productId: string): void {
    const payload = {
      productId,
      quantity: 1
    }
    this.subscription.add(
      this._HttpService.post(APIs.addToCart, payload).subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this.isInCart = true;
          this._MessagesService.openSuccessSnackBar(res.responseData.message);
          let cartItemCount = this._CartService.onCartItemsCountChange$.getValue();
          cartItemCount++
          this._CartService.onCartItemsCountChange$.next(cartItemCount);
          this.addedToCart.emit(true);
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


  getSizesColorsOfProducts(productId: any): void {
    this.subscription.add( this._HttpService.get(`${APIs.getSizesColorsOfProducts}/${productId}`)
    .subscribe((res: HResponse) => {
      if (res.responseData?.colorWithSizes?.length || res.responseData?.sizes.length) {
        this.openProductFeaturesDialog(res.responseData);
      } else {
        this.addToCart(productId);
      }
    }))
  }



  checkOutHandler(e: any): void {
    if (this.isIsolated) return
    e.stopPropagation()
  }

}
