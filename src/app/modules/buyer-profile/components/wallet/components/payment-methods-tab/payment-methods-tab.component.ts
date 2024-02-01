import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'payment-methods-tab',
  templateUrl: './payment-methods-tab.component.html',
  styleUrls: ['./payment-methods-tab.component.scss']
})
export class PaymentMethodsTabComponent implements OnInit {


  // props 
  creditCard: any = {};
  subscription: Subscription = new Subscription();


  constructor(
    private _HttpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getCreditCard();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getCreditCard(): void {
    this.subscription.add(
      this._HttpService.get(APIs.getCreditCard).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.creditCard = res?.responseData;
        }
      })
    );
  } 
}
