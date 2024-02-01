import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { FormControl, Validators } from '@angular/forms';
import { Order } from 'src/app/shared/models/order/order';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { shippingTimes } from 'src/app/shared/lookups/shipping-times';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { ShippingTime } from 'src/app/shared/models/shipping-time/shipping-time';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { PaymentMethods } from 'src/app/shared/enums/payment-methods/payment-methods';
import { PickUpTime } from 'src/app/shared/enums/pick-up-time/pick-up-time';
import { Address } from 'src/app/shared/models/address/address';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-add-pay-ship',
  templateUrl: './edit-add-pay-ship.component.html',
  styleUrls: ['./edit-add-pay-ship.component.scss']
})
export class EditAddPayShipComponent implements OnInit, OnDestroy {

  order: Order = {}
  addresses: Address[] = [];
  pickUpTime: number = PickUpTime.Any;
  shippingTimes: ShippingTime[] = shippingTimes;
  subscription: Subscription = new Subscription();
  paymentMethod: PaymentMethods = PaymentMethods.Cash;
  address: FormControl = new FormControl('', [Validators.required]);


  // booleans 
  saveError: boolean = false;
  isHybridPayment: boolean = false;
  showAddressForm: boolean = false;

  constructor(
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    private _EditAddPayShipComponentRef: MatDialogRef<EditAddPayShipComponent>,
  ) { }


  ngOnInit(): void {
    this.getOrderData();
    this.getAddresses();
  }

    
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getOrderData(): void {
    this.order =  this._BrowserService.getItem(Constant.order);  
    this.isHybridPayment = this._BrowserService.getItem(Constant.isHybridPayment);      
    this.address.setValue(this.order?.address ? this.order.address : null);    
    this.pickUpTime = this.order?.pickUpTime ? this.order?.pickUpTime : PickUpTime.Any;
  }


  getAddresses(): void {
    const query = {
      hideLoader: true
    }

    this.subscription.add(
      this._HttpService.get(APIs.getAddresses, query).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.addresses = res.responseData?.items
          console.log('Hello', res);
        }
      })
    );
  }


  openAddressForm(): void {
    this.showAddressForm = true;
  }


  save(): void {

    if (!this.address.valid) {
      this.saveError = true;
      return
    }

    this.order = {
      ...this.order,
      address: this.address.value,
      pickUpTime: this.pickUpTime,
      addressId: this.address.value.id,
      paymentMethod: this.paymentMethod,
    }

    this._BrowserService.setItem(Constant.order, this.order);
    this._EditAddPayShipComponentRef.close({isSuccess: true});
  }

}
