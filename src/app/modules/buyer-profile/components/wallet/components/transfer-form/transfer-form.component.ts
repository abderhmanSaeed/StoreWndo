import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CompanyData } from 'src/app/modules/buyer-profile/models/company-data/company-data';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnInit {

  // Props 
  companyData: CompanyData = {};
  subscription: Subscription = new Subscription();


  constructor(
    private _HttpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.userWalletBalancType();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
  userWalletBalancType(): void {
    this.subscription.add(this._HttpService.get(APIs.userWalletBalancType)
    .subscribe((res: HResponse ) => {   
      if (!res.isSuccess) return;
      this.companyData = res.responseData.companyDataDto;
    }));
  }

}
