import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { paymentMethods } from 'src/app/shared/lookups/payment-methods';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { PaymentMethod } from 'src/app/shared/models/payment-method/payment-method';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {

  // props 
  data: any = {};
  subscription: Subscription = new Subscription();


  constructor(
    private _HttpService: HttpService,
    private _BreadcrumbService: BreadcrumbService,
  ) { }


  ngOnInit(): void {
    this.setBreadcrumb();
    this.getCreditCard();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  setBreadcrumb(): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: 'breadcrumb.profile',
        url: '/buyer-profile'
      },
      {
        name: 'breadcrumb.payment-methods',
        url: '/buyer-profile/payment-methods'
      }
    ])
  }


  getCreditCard(): void {
    this.subscription.add(
      this._HttpService.get(APIs.getCreditCard).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.data = res?.responseData;
        }
      })
    );
  }  

}
