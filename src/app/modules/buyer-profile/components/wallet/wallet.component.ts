import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { RouterService } from 'src/app/shared/services/router/router.service';
import { UserWalletBalance } from '../../models/user-wallet-balance/user-wallet-balance';
import { BalanceChargedDialogComponent } from './components/balance-charged-dialog/balance-charged-dialog.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {


  // Props 
  lang: Languages = Languages.AR;
  userWalletBalance: UserWalletBalance = {
    walletPercentages: {
      sales:0,
      topUps:0
    }
  };
  subscription: Subscription = new Subscription();


  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _RouterService: RouterService,
    private _BrowserService: BrowserService,
    private _BreadcrumbService: BreadcrumbService,
  ) { }


  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
    this.setBreadcrumb();
    this.getUserWalletBalance();
    this.checkIfTheOnlinePymentIsFailed();
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
        name: 'breadcrumb.my-wallet',
        url: '/buyer-profile/wallet'
      }
    ])
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  

  getUserWalletBalance(): void {
    this.subscription.add(
      this._HttpService.get(APIs.userWalletBalance).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.userWalletBalance = res.responseData;
        }
      })
    );
  }


  openBalanceChargedDialog(): void {
    this._MatDialog.open(BalanceChargedDialogComponent, {
      width: '400px',
      panelClass: 'light-dialog',
      direction: this.lang ==  Languages.EN ? 'ltr' : 'rtl',
    });
  }


  checkIfTheOnlinePymentIsFailed(): void {
    if ( this._RouterService.hasRoute('balance-charged=true') ) {
      this.openBalanceChargedDialog();
    }
  }

}
