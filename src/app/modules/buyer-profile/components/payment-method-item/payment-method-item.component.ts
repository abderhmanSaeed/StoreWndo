import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { paymentMethods } from 'src/app/shared/lookups/payment-methods';
import { PaymentMethod } from 'src/app/shared/models/payment-method/payment-method';

@Component({
  selector: 'payment-method-items',
  templateUrl: './payment-method-item.component.html',
  styleUrls: ['./payment-method-item.component.scss']
})
export class PaymentMethodItemComponent implements OnInit {

  // Inputs 
  @Input() data: any = {};



  // props 
  subscription: Subscription = new Subscription();
  paymentMethods: PaymentMethod[] = paymentMethods;

  constructor(
    private _HttpService: HttpService,
  ) { }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onPaymentMethodChange(paymentMethod: PaymentMethod): void {
    const query = {
      hideLoader: true,
      paymentMethod: paymentMethod.id,
    }
    this.setDefaultPaymentMethod(query);
  }



  setDefaultPaymentMethod(query: any): void {
    this.subscription.add(
      this._HttpService.postByParams(APIs.setDefaultPaymentMethod, query).subscribe()
    )
  }
}
