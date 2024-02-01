import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constant } from 'src/app/core/config/constant';
import { PaymentMethods } from 'src/app/shared/enums/payment-methods/payment-methods';
import { paymentMethods } from 'src/app/shared/lookups/payment-methods';
import { PaymentMethod } from 'src/app/shared/models/payment-method/payment-method';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';

@Component({
  selector: 'hybrid-payment-methods',
  templateUrl: './hybrid-payment-methods.component.html',
  styleUrls: ['./hybrid-payment-methods.component.scss']
})
export class HybridPaymentMethodsComponent implements OnInit {


  // Inputs
  @Input() initValue: any = null;

  // outputs 
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  // props 
  walletAmount: any = 0;
  paymentMethodsEnum = PaymentMethods;
  paymentMethods: any[] = paymentMethods;
  walletPayMethod: PaymentMethod = this.paymentMethods[2];
  selectedPaymentMethod: PaymentMethods = PaymentMethods.Cash;


  constructor(
    private _BrowserService: BrowserService,
  ) { }

  ngOnInit(): void {
    this.walletAmount = this._BrowserService.getItem(Constant.walletAmount);
  }


  onMethodChange(val: any) {    
    this.selectedPaymentMethod = val;
    this.emitChanges();
  }


  emitChanges(): void {    
    this.onChange.emit({
      paymentMethod: this.selectedPaymentMethod,
    });
  }


  isHybridPaymentChange(e: any): void {
    this._BrowserService.setItem(Constant.isHybridPayment, e.target?.checked);
  }

}
