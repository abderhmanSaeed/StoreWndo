import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Constant } from 'src/app/core/config/constant';
import { AccountSettings } from 'src/app/modules/buyer-profile/models/account-settings/account-settings';
import { CancelationTypes } from 'src/app/modules/buyer-profile/modules/orders/enums/cancelation-types';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {


  // Inputs
  @Input() accountSettings: AccountSettings | null | undefined = null;

  // Props
  languagesEnum = Languages;
  lang: Languages = Languages.AR;
  subscription: Subscription = new Subscription();


  constructor(
    private _MatDialog: MatDialog,
    private _BrowserService: BrowserService,
  ) { }

  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  openChangePasswordDialog(orderNumber: number): void {
    const dialogRef = this._MatDialog.open(ChangePasswordDialogComponent, {
        width: '750px',
        panelClass: 'custom-dialog-container',
        data: {
          accountSettings: this.accountSettings
        },
        direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
      });
  
      this.subscription.add(
        dialogRef.afterClosed().subscribe( (res: HResponse) => {
          if (res?.isSuccess) {
            
          }
        })
      )
  }

}
