import { Component, Input, OnInit } from '@angular/core';
import { TransactionType } from 'src/app/modules/auth/enums/transaction-type';
import { CurrentMonthTransData } from 'src/app/modules/buyer-profile/models/user-wallet-balance/user-wallet-balance';

@Component({
  selector: 'credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {


  // Inputs
  @Input() set data(val: any) {
    this.trans = val;
    console.log(this.trans, 'this.Trans');
  }

  trans: CurrentMonthTransData = {};
  transactionTypeEnum = TransactionType;

  constructor() { }

  ngOnInit(): void {
  }

}
