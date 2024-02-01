import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { OrderConfirmedComponent } from 'src/app/modules/cart/components/order-confirmed/order-confirmed.component';
import { OtpTypes } from 'src/app/shared-modules/otp-validator/enums/otp-types/otp-types';
import { OtpValidatorComponent } from 'src/app/shared-modules/otp-validator/otp-validator.component';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { BalanceChargedDialogComponent } from '../balance-charged-dialog/balance-charged-dialog.component';
import { TransferRequestDialogComponent } from '../transfer-request-dialog/transfer-request-dialog.component';

@Component({
  selector: 'transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  // Props 
  form!: FormGroup;
  lang: Languages = Languages.AR;
  faChevronRight = faChevronRight;
  subscription: Subscription = new Subscription();



  // booleans 
  public isCollapsed = true;
  formError: boolean = false;
  requestTransferd: boolean = false;


  constructor(
    private _MatDialog: MatDialog,
    private _FormBuilder: FormBuilder,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
  ) { }

  
  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
    this.initForm();    
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  initForm(): void {
    this.form = this._FormBuilder.group({
      amount: [null, [Validators.required]],
    });
  }


  submit(): void {        
    if (!this.form.valid) {
      this.formError = true;
      return
    }

    const payload = {
      ...this.form.value
    }

    this.codeTransferAmountToUser(payload);
  }


  openTransferRequestDialog(): void {
    this._MatDialog.open(TransferRequestDialogComponent, {
      width: '400px',
      panelClass: 'light-dialog',
      direction: this.lang ==  Languages.EN ? 'ltr' : 'rtl',
    });
  }


  codeTransferAmountToUser(payload: any): void {
    this.subscription.add(this._HttpService.get(APIs.codeTransferAmountToUser, payload)
    .subscribe((res: HResponse ) => {   
      if (!res.isSuccess) return;
      this.openOtpValidatorDialog(res.responseData);
    }));
  }


  
  openOtpValidatorDialog(payload: any): void {
    const dialogRef = this._MatDialog.open(OtpValidatorComponent, {
      width: '523px',
      panelClass: 'light-dialog',
      data: {
        ...payload,
        buyerProfile: true,
        sentTo: payload.sendTo,
        otpType: OtpTypes.TransferAmount
      }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res?.isSuccess) {
          this.requestTransferd = true;
          this.openTransferRequestDialog();
        }
      })
    )
  }

}
