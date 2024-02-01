import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserWalletBalance } from 'src/app/modules/buyer-profile/models/user-wallet-balance/user-wallet-balance';

@Component({
  selector: 'wallet-navs',
  templateUrl: './wallet-navs.component.html',
  styleUrls: ['./wallet-navs.component.scss']
})
export class WalletNavsComponent implements OnInit {

  // Inputs
  @Input() set data(val: UserWalletBalance) {
    this.userWalletBalance = val;    
  }


  // props 
  userWalletBalance: UserWalletBalance = {
    walletPercentages: {
      sales:0,
      topUps:0
    }
  };

  constructor(
  ) { }

  ngOnInit(): void {
  }


  


  

}
