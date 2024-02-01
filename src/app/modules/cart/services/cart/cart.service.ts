import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { PaymentMethods } from 'src/app/shared/enums/payment-methods/payment-methods';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { Product } from 'src/app/shared/models/product/product';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { Cart } from '../../models/cart/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // props 
  subscription: Subscription = new Subscription();
  cart: BehaviorSubject<any> = new BehaviorSubject(null);
  $progressbarValue: BehaviorSubject<number> = new BehaviorSubject(0);
  onCartItemsCountChange$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private _AuthService: AuthService,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
  ) { }





  removeItem(cartId: number, data: Cart): void {
    const cart = {
      ...this.cart.getValue(),
      ...data
    }
    cart.carts.forEach( (product: Product, index: number) => {
      if (product.cartId == cartId) {
        cart.carts.splice(index, 1)
      }
    });
    this.cart.next(cart)
  }


  
  updateItem(cartProduct: Product, data: Cart): void {
    const cart = {
      ...this.cart.getValue(),
      ...data
    }
    cart.carts.forEach( (product: Product, index: number) => {
      if (product.cartId == cartProduct.cartId) {
        cart.carts[index] = cartProduct
      }
    });
    this.cart.next(cart)
  }


  updateQuantity(cartId: number, quantity: number, data: Cart): void {
    const cart = {
      ...this.cart.getValue(),
      ...data
    }
    cart.carts.forEach( (product: Product, index: number) => {
      if (product.cartId == cartId) {
        cart.carts[index].quantity = quantity
      }
    });
    this.cart.next(cart)
  }




  getUserCart(params?: any): void {
    if (!this._AuthService.isAuthenticated) return
    const query = {
      ...params
    }
    this.subscription.add(
      this._HttpService.get(APIs.getUserCart, query).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.cart.next(res.responseData)
        }
      })
    );
  }



  updateData(data: Cart): void {
    const cart = {
      ...this.cart.getValue(),
      ...data
    }
    this.cart.next(cart)
  }



  checkIfNeedMultiplePayment(payMethod: any, walletAmount: any, totalAmount: any): boolean {   

    if (walletAmount < totalAmount) {
      if (!this._BrowserService.getItem(Constant.isHybridPayment) && payMethod == PaymentMethods.Wallet) {
        this._BrowserService.setItem(Constant.isNeededMultiplePayment, true);
      } else {
        this._BrowserService.setItem(Constant.isNeededMultiplePayment, false);
      }
      return true
    } else {
      if (this._BrowserService.getItem(Constant.isHybridPayment)) {
        const order = this._BrowserService.getItem(Constant.order);
        order.paymentMethod = PaymentMethods.Wallet;
        this._BrowserService.setItem(Constant.order, order);
      }
      this._BrowserService.setItem(Constant.isNeededMultiplePayment, false);
      this._BrowserService.setItem(Constant.isHybridPayment, false);
      this._BrowserService.setItem(Constant.showHybridPayment, false);
      return false
    }
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
