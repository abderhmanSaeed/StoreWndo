import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { CartService } from '../../services/cart/cart.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AddressFormComponent } from 'src/app/shared-modules/address-form/address-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { APIs } from 'src/app/core/config/apis';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { UserNamePhone } from 'src/app/shared/models/user-nmae-phone/user-name-phone';
import { Address } from 'src/app/shared/models/address/address';
import { ShippingTime } from 'src/app/shared/models/shipping-time/shipping-time';
import { shippingTimes } from 'src/app/shared/lookups/shipping-times';
import { PickUpTime } from 'src/app/shared/enums/pick-up-time/pick-up-time';
import { Order } from 'src/app/shared/models/order/order';
import { FormControl, Validators } from '@angular/forms';
import { PaymentMethods } from 'src/app/shared/enums/payment-methods/payment-methods';
import { DeliveryMethods } from 'src/app/shared/enums/delivery-methods/delivery-methods';
import { NameFormComponent } from '../name-form/name-form.component';
import { PhoneFormComponent } from '../phone-form/phone-form.component';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { Router } from '@angular/router';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { Constant } from 'src/app/core/config/constant';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { NotEnoughBalanceComponent } from '../not-enough-balance/not-enough-balance.component';
import { PaymentMethodsComponent } from '../payment-methods/payment-methods.component';

@Component({
  selector: 'app-shipping-payment',
  templateUrl: './shipping-payment.component.html',
  styleUrls: ['./shipping-payment.component.scss']
})
export class ShippingPaymentComponent implements OnInit, OnDestroy {

  // ViewChilds
  @ViewChild("paymentMethodsComponent") paymentMethodsComponent!: PaymentMethodsComponent;


  // props 
  faPen = faPen
  order: Order = {}
  addresses: Address[] = [];
  LanguagesEnum = Languages;
  userNamePhone: UserNamePhone = {};
  paymentMethodsEnum = PaymentMethods;
  pickUpTime: number = PickUpTime.Any;
  shippingTimes: ShippingTime[] = shippingTimes;
  subscription: Subscription = new Subscription();
  paymentMethod: PaymentMethods = PaymentMethods.Cash;
  lang: Languages = (this._TranslateService.currentLang as Languages);
  deliveryMethod: DeliveryMethods = DeliveryMethods.ShippingCarrier;
  address: FormControl = new FormControl('', [Validators.required]);


  // booleans 
  saveError: boolean = false;
  isNeededMultiplePayment: boolean = false;

  constructor(
    private _Router: Router,
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _CartService: CartService,
    private _BrowserService: BrowserService,
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _BreadcrumbService: BreadcrumbService,
  ) { }




  ngOnInit(): void {
    this.onLangChange();
    this.getAllData();
    this.setBreadcrumb();
    this.getOrderData();
    this.increaseProgressbarValue();
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  
  onLangChange(): void {
    this.subscription.add( this._TranslateService.onLangChange.subscribe(({lang}: any) => {
      this.lang = (lang as Languages);
    }));
  }


  getAllData(): void {
    this.getAddresses();
    this.getUserNamePhone();
  }


  getOrderData(): void {
    this.order =  this._BrowserService.getItem(Constant.order);
    this.address.setValue(this.order?.addressId ? this.order.address : null);    
    this.pickUpTime = this.order?.pickUpTime ? this.order?.pickUpTime : PickUpTime.Any;    
    if (this.address.value) {
      this._CartService.getUserCart({buyerAddressId: this.order?.addressId})
    }
    this.isNeededMultiplePayment =  this._BrowserService.getItem(Constant.isNeededMultiplePayment);        
  }

  onAddressChange(address: Address): void {
    if (!address.id) {
      return
    }
    this._CartService.getUserCart({buyerAddressId: address?.id})
  }


  increaseProgressbarValue(): void {
    this._CartService.$progressbarValue.next(50)
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
          name: 'breadcrumb.shipping-payment',
          url: '/cart/shipping-payment'
        }
      ])
  }


  getUserNamePhone(): void {
    this.subscription.add(
      this._HttpService.get(APIs.getUserNamePhone).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.userNamePhone = res.responseData;
        }
      })
    );
  }


  getAddresses(): void {
    const query = {
      hideLoader: true
    }

    this.subscription.add(
      this._HttpService.get(APIs.getAddresses, query).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.addresses = res.responseData?.items
        }
      })
    );
  }


  openEditNameDialog(): void {
    const dialogRef = this._MatDialog.open(NameFormComponent, {
      width: '400px',
      panelClass: 'light-dialog',
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res?.isSuccess) {
          this.userNamePhone.name = res?.responseData?.name
        }
      })
    )
  }


  openEditPhoneDialog(): void {
    const dialogRef = this._MatDialog.open(PhoneFormComponent, {
      width: '400px',
      panelClass: 'light-dialog',
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res?.isSuccess) {
          this.userNamePhone.phone = res?.responseData?.phone
        }
      })
    )
  }



  openAddressFormDialog(): void {
   
   const dialogRef = this._MatDialog.open(AddressFormComponent, {
      width: '850px',
      panelClass: 'address-dialog',
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',

    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this.getAddresses();
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
          this.paymentMethodsComponent.isHybridPayment = true;
          this.paymentMethodsComponent.addAnotherPayment();
          this._BrowserService.setItem(Constant.isHybridPayment, true);
        }
      })
    );
  }



  onSaveClick(): void {
  
    if (!this.address.valid) {
      this.saveError = true;
      return
    }

    // if (!this.userNamePhone.phone || !this.userNamePhone.name) {
    //   this._MessagesService.openErrorSnackBar('Your Name And Phone Are Mandatory To Proceed Your Order.');
    //   return
    // }

    if (this.isNeededMultiplePayment && !this.paymentMethodsComponent.isHybridPayment) {
      this.openNotEnoughBalancedDialog();
      return
    }

    this.order = {
      address: this.address.value,
      pickUpTime: this.pickUpTime,
      paymentMethod: this.paymentMethod,
      addressId: this.address.value.id,
      deliveryMethod: this.deliveryMethod,
    }

    this._BrowserService.setItem(Constant.order, this.order);


    this._Router.navigate(['cart/confirmation'], {
      state: {
        allowAccess: true
      }
    });
  }


  onPaymentMethodChange(payment: any) {    
    this.paymentMethod = payment.paymentMethod;
    this.isNeededMultiplePayment = payment.isNeededMultiplePayment;    
  }




}
