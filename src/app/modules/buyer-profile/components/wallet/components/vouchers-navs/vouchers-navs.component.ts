import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { UserVouchers } from 'src/app/modules/buyer-profile/models/user-vouchers/user-vouchers';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'vouchers-navs',
  templateUrl: './vouchers-navs.component.html',
  styleUrls: ['./vouchers-navs.component.scss']
})
export class VouchersNavsComponent implements OnInit, OnDestroy {


  // Props 
  userVouchers: UserVouchers = {};
  subscription: Subscription = new Subscription();


  constructor(
    private _HttpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getUserVouchers();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getUserVouchers(): void {
    this.subscription.add(
      this._HttpService.get(APIs.userVouchers).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.userVouchers = res.responseData;
        }
      })
    );
  } 

}
