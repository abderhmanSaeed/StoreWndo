import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { PaymentMethods } from 'src/app/shared/enums/payment-methods/payment-methods';
import { paymentMethods } from 'src/app/shared/lookups/payment-methods';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { PaymentMethod } from 'src/app/shared/models/payment-method/payment-method';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { Cart } from '../../models/cart/cart';
import { CartService } from '../../services/cart/cart.service';
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit, OnDestroy {


  // Inputs
  @Input() initValue: any = null;
  @Input() isEdit: boolean = false;

  // outputs 
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  
  // props 
  cart: Cart = {};
  hybridPayCalc = {
    walletShare: 0,
    remainingAmount: 0,
    totalAmount: 0
  };
  paymentData: any = {};
  faLongArrowLeft = faLongArrowLeft;
  paymentMethodsEnum = PaymentMethods;
  paymentMethods: any[] = paymentMethods;
  subscription: Subscription = new Subscription();
  walletPayMethod: PaymentMethod = this.paymentMethods[2];
  selectedPaymentMethod: PaymentMethods = PaymentMethods.Cash;


  // booleans 
  isHybridPayment: boolean = false;
  showHybridPayment: boolean = false;
  isNeededMultiplePayment: boolean = false;
  

  constructor(
    private _CartService: CartService,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
  ) { }

  ngOnInit(): void {
    this.initData();
    this.getCart();
    this.getWallet();
    this.emitChanges();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  initData(): void {    
    this.selectedPaymentMethod = this.initValue;
    this.isHybridPayment = this._BrowserService.getItem(Constant.isHybridPayment);
    this.showHybridPayment = this._BrowserService.getItem(Constant.showHybridPayment);
    if (this.isHybridPayment && !this.isEdit) {
      this.initValue = PaymentMethods.Cash;
      this.selectedPaymentMethod = PaymentMethods.Cash;
    }
  }


  calcHybirdPayment(walletAmount: number, totalAmount: any): void {
    this.hybridPayCalc.walletShare = walletAmount;
    this.hybridPayCalc.remainingAmount = totalAmount - walletAmount;
    this.hybridPayCalc.totalAmount = totalAmount;
  }


  addAnotherPayment(): void {
    this.initValue = this.paymentMethodsEnum.Cash;
    this.selectedPaymentMethod = this.paymentMethodsEnum.Cash;
    this.checkIfNeedMultiplePayment();
    this.emitChanges();
  }


  getCart(): void {
     this.subscription.add(
       this._CartService.cart.subscribe( (cart: Cart) => {
         if (cart) {          
           this.cart = cart;
           this.checkIfNeedMultiplePayment();
           this.emitChanges();
           this.calcHybirdPayment(this.paymentData.walletAmount, this.cart.totalPrice);
         }
       })
     )
  }


  noHybridPayment(): void {
    this.showHybridPayment = false;
    this.isHybridPayment = false;
    this._BrowserService.setItem(Constant.showHybridPayment, false);
    this._BrowserService.setItem(Constant.isHybridPayment, false);
  }


  onMethodChange(val: any) {    
    this.selectedPaymentMethod = val;
    this.initValue = val;
    this.checkIfNeedMultiplePayment();
    this.emitChanges();
  }


  emitChanges(): void {    
    this.onChange.emit({
      paymentMethod: this.selectedPaymentMethod,
      isNeededMultiplePayment: this.isNeededMultiplePayment
    });
  }


  checkIfNeedMultiplePayment(): void {    
    if (this.selectedPaymentMethod == PaymentMethods.Wallet || this.initValue == PaymentMethods.Wallet) {
      this.isNeededMultiplePayment = this.paymentData?.walletAmount < (this.cart?.totalPrice as number);
      this._BrowserService.setItem(Constant.isNeededMultiplePayment, this.isNeededMultiplePayment);
    } else {
      this.isNeededMultiplePayment = false;
      this._BrowserService.setItem(Constant.isNeededMultiplePayment, false);
    }

    if (!this.isNeededMultiplePayment && this.isHybridPayment) {
      // this.isHybridPayment = false;
      // this._BrowserService.setItem(Constant.isHybridPayment, false);
    } 
    
    if (this.isNeededMultiplePayment && this.showHybridPayment) {
      this.isHybridPayment = true;
      this._BrowserService.setItem(Constant.isHybridPayment, true);
      this.initValue = PaymentMethods.Cash;
      this.selectedPaymentMethod = PaymentMethods.Cash;
      this.emitChanges();
    }

  }
  

  getWallet(): void {
    this.subscription.add(
      this._HttpService.get(APIs.getCreditCard).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.paymentData = res?.responseData;
          this.paymentData.walletAmount = res?.responseData.walletAmount;
          this._BrowserService.setItem(Constant.walletAmount, this.paymentData.walletAmount);
          this.calcHybirdPayment(this.paymentData.walletAmount, this.cart.totalPrice);          
          if (this.initValue == null && !this.isHybridPayment) {
            this.initValue = res?.responseData.paymentMethod;
            this.selectedPaymentMethod = this.initValue;
          }

          if (this.initValue == PaymentMethods.Wallet && !this.paymentData.walletAmount) {
            this.initValue = PaymentMethods.Cash;
            this.selectedPaymentMethod = this.initValue;
          }

          this.checkIfNeedMultiplePayment();
          this.emitChanges();
        }
      })
    );
  }  
  
   
}
