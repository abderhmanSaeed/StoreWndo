import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { OrderConfirmedComponent } from '../order-confirmed/order-confirmed.component';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { CartService } from '../../services/cart/cart.service';
import { Subscription } from 'rxjs';
import { Cart } from '../../models/cart/cart';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { Constant } from 'src/app/core/config/constant';
import { Order } from 'src/app/shared/models/order/order';
import { query } from '@angular/animations';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { Router } from '@angular/router';
import { paymentMethods } from 'src/app/shared/lookups/payment-methods';
import { PaymentMethod } from 'src/app/shared/models/payment-method/payment-method';
import { EditAddPayShipComponent } from '../edit-add-pay-ship/edit-add-pay-ship.component';
import { ConfirmFor } from 'src/app/shared-modules/confirmation-dialog/enums/confirm-for/confirm-for';
import { ConfirmationService } from 'src/app/shared-modules/confirmation-dialog/services/confirmation/confirmation.service';
import { RouterService } from 'src/app/shared/services/router/router.service';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { PaymentMethods } from 'src/app/shared/enums/payment-methods/payment-methods';
import { NotEnoughBalanceComponent } from '../not-enough-balance/not-enough-balance.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {


  // props 
  cart!: Cart;
  faPen = faPen;
  addressId!: any
  order: Order = {};
  LanguagesEnum = Languages;
  paymentMethodsEnum = PaymentMethods;
  paymentMethods: PaymentMethod[] = paymentMethods;
  subscription: Subscription = new Subscription();
  lang: Languages = (this._TranslateService.currentLang as Languages);



  // booleans 
  isDeductFromWallet: boolean | undefined = true;
  isNeededMultiplePayment: boolean | undefined = false;

  constructor(
    private _Router: Router,
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _CartService: CartService,
    private _RouterService: RouterService,
    private _BrowserService: BrowserService,
    private _TranslateService: TranslateService,
    private _BreadcrumbService: BreadcrumbService,
    private _ConfirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.onLangChange();
    this.getCart();
    this.setBreadcrumb();
    this.increaseProgressbarValue();
    this.getOrderData();
    this.checkIfTheOnlinePymentIsFailed();
  }  


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
  onLangChange(): void {
    this.subscription.add( this._TranslateService.onLangChange.subscribe(({lang}: any) => {
      this.lang = (lang as Languages);
    }));
  }


  getOrderData(): void {
    this.isDeductFromWallet = this._BrowserService.getItem(Constant.isHybridPayment);
    this.isNeededMultiplePayment = this._BrowserService.getItem(Constant.isNeededMultiplePayment);
    this.order =  this._BrowserService.getItem(Constant.order);
    this.addressId =  this.order?.addressId;
  }


  getCart(): void {
    this.subscription.add(
      this._CartService.cart.subscribe( (cart: Cart) => {
        if (cart) {          
          this.cart = cart;
          console.log(this.cart);

          this._CartService.checkIfNeedMultiplePayment(
            this.order.paymentMethod,
            this._BrowserService.getItem(Constant.walletAmount),
            this.cart.totalPrice
          );
          
          if (this.cart.hasOwnProperty('isNeededMultiplePayment')) {
            if (!this.cart.isNeededMultiplePayment) {
              this.isDeductFromWallet = this.cart.isNeededMultiplePayment
            }
          }

          this.getOrderData();          
        }
      })
    )
  }


  checkIfTheOnlinePymentIsFailed(): void {
    if ( this._RouterService.hasRoute('failed-payment=true') ) {
      this.openOrderNotConfirmedDialog();
    }
  }


  openOrderNotConfirmedDialog(): void {
    this.subscription.add( this._ConfirmationService.openConfirmationDialog(ConfirmFor.OrderNotConfirmed)
     .subscribe((confirmed) => {
        if (confirmed == ConfirmFor.OrderNotConfirmed) {
          this.submitOrder();
        }
     }));
  }


  increaseProgressbarValue(): void {
    this._CartService.$progressbarValue.next(99)
  }


  setBreadcrumb(): void {
    this._BreadcrumbService.$items.next([
      { 
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: 'breadcrumb.cart',
        url: '/cart/check-out'
      },
      {
        name: 'breadcrumb.confirmation',
        url: '/cart/confirmation'
      }
    ])
  }


  openOrderConfirmedDialog(data: any): void {
    this._CartService.$progressbarValue.next(100)
    this._MatDialog.open(OrderConfirmedComponent, {
      width: '400px',
      data,
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',
    });
  }




  openEditAddressAndPaymentMethodDialog(): void {
      
    const dialogRef = this._MatDialog.open(EditAddPayShipComponent, {
      width: '850px',
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl'
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res?.isSuccess) {
          this.getOrderData();
          if (this.addressId) {
            this._CartService.getUserCart({buyerAddressId: this.addressId})
          }
        }
      })
    )
  }


  openNotEnoughBalancedDialog(): void {
    const DialogRef = this._MatDialog.open(NotEnoughBalanceComponent, {
      width: '500px',
      panelClass: 'light-dialog',
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',
    });

    this.subscription.add(
      DialogRef.afterClosed().subscribe( (res: any) => {
        if (res) {
          this._BrowserService.setItem(Constant.isHybridPayment, true);
          this._BrowserService.setItem(Constant.showHybridPayment, true);
          this._BrowserService.setItem(Constant.isNeededMultiplePayment, false);
          this._Router.navigate(['/cart/shipping-payment'])
        }
      })
    );
  }


  submitOrder(): void {

    if (this.isNeededMultiplePayment) {
      this.openNotEnoughBalancedDialog();
      return
    }

    const {carts, ...clone} = this.cart;
    console.log(carts, 'hello',clone);
    let items: any;
    if (this.cart.carts) {
      items = this.cart.carts.map( item => {
        return {
          productId: item.productId,
          sellerId: item.sellerId,
          sizeId: item.sizeId,
          colorId: item.colorId,
          quantity: item.quantity,
          price: item.price,
          mainPrice: 0,
          voucherAmount: 0,
        }
      });
    } else {
      items = [];
    }

    const payload = {
      ...clone,
      isWeb: true,
      wndoFees: 0,
      ...this.order,
      orderItems: items,
      isDeductFromWallet: this._BrowserService.getItem(Constant.isHybridPayment),
      totalOrderPrice: clone.totalPrice,
    }
    delete payload.price
    delete payload.address
    delete payload.totalPrice
    delete payload.voucherAmount
    delete payload.expectedDeliveryAt
    delete payload.isNeededMultiplePayment
    
 
    this.subscription.add(
      this._HttpService.post(APIs.order, payload).subscribe( {
        
        
        next: (res: HResponse ) => {
          const redirectUrl = res?.responseData?.redirectUrl

          if (res.isSuccess) {
            this._CartService.onCartItemsCountChange$.next(0);
          }

          if (res.isSuccess && !redirectUrl) {
            this.openOrderConfirmedDialog(res.responseData);
            this._BrowserService.deleteItem(Constant.order);
            this._Router.navigate(['/cart']).then( _ => {
              this._CartService.cart.next(null);
            })
          } else {
            if (redirectUrl) {
              window.location.href = redirectUrl;
            }
          }
        },

        error: (error) => {
          // this.openOrderNotConfirmedDialog();
        }
      })
    )
  }
}