import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { MonthWithYearListItem } from 'src/app/modules/buyer-profile/models/user-wallet-balance/user-wallet-balance';
import { APIs } from 'src/app/core/config/apis';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'cd-cards',
  templateUrl: './cd-cards.component.html',
  styleUrls: ['./cd-cards.component.scss']
})
export class CDCardsComponent implements OnInit, OnDestroy {



  // Inputs
  @Input() set currentMonthTrans(val: any) {
    this.currentMonthTransArr = val?.items;
  }

  @Input() set monthWithYearList(val: MonthWithYearListItem[] | undefined) {
    this.reFormatMonthWithYearList(val);
  }


  monthWithYearListArr: any[] | undefined = [];
  currentMonthTransArr: any[] | undefined = [];
  subscription: Subscription = new Subscription();

  

  constructor(
    private _HttpService: HttpService,
  ) { }

  ngOnInit(): void {
    console.log(this.monthWithYearList, 'MonthWithYearListItem');
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
  onDateChange(selectedDate: any): void {    
    const query = {
      month: selectedDate.month,
      year: selectedDate.year
    }
    this.walletTransactionsByMonth(query);
  }


  walletTransactionsByMonth(query: any): void {
    this.subscription.add(this._HttpService.get(APIs.walletTransactionsByMonth, query)
    .subscribe((res: HResponse ) => {   
      if (!res.isSuccess) return;
        this.currentMonthTransArr = res.responseData.items
    }));
  }


  reFormatMonthWithYearList(MonthYearList: MonthWithYearListItem[] | undefined): void {
    this.monthWithYearListArr = MonthYearList?.map( item => {
      return {
        ...item,
        name: `${item.monthName} ${item.year}`
      }
    })
  }


}
