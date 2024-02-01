import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { timer, Observable, Subscription, scan, takeWhile } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { AuthComponents } from 'src/app/modules/auth/enums/auth-components';
import { LoginTypes } from 'src/app/modules/auth/enums/login-types';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { environment } from 'src/environments/environment';
import { CountDownComponent } from '../count-down/count-down.component';
import { OtpTypes } from './enums/otp-types/otp-types';

@Component({
  selector: 'otp-validator',
  templateUrl: './otp-validator.component.html',
  styleUrls: ['./otp-validator.component.scss']
})
export class OtpValidatorComponent implements OnInit {

  // outputs 
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onResend: EventEmitter<any> = new EventEmitter();


  // Inputs
  @Input() sentTo: any = false;

    
  // View Children
  @ViewChild('counter') counter!: CountDownComponent;

  // properties 
  code: any;
  userId: any = null; 
  userName: string = '00000000';
  timer$ = timer(0, 1000);
  seconds$!:Observable<number>;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '-',
    inputStyles: {
      'width': '45px',
      'height': '45px'
    }
  };
  authComponents = AuthComponents;
  subscription: Subscription = new Subscription();

  
  // Booleans 
  timeRemainingHasEnded: boolean = false;

  constructor(
    private _Router: Router,
    public authService: AuthService,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    private _MessagesService: MessagesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _MatDialogRef: MatDialogRef<OtpValidatorComponent>
  ) { }

  ngOnInit(): void {
    this.timerSubscription();    
    if (this.data?.sentTo) {
      this.sentTo = this.data?.sentTo;
    }
  }
  


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  timerSubscription(): void {
    this.seconds$ = this.timer$
      .pipe(
        scan(acc => --acc, environment.otpExpiredIn),
        takeWhile(x => x >= 0)
      )
  }


  
  onOTPTimeRemainingEnd(isEnded: boolean): void {
    if(!isEnded) return    
    this.timeRemainingHasEnded = true;
  }
  

  onOtpChange(otp: any) {
    this.onChange.emit(otp)

    this.code = otp;
    if (this.code.length != 4) return;

    let payload =  {}


    switch (this.data?.otpType) {
      case OtpTypes.Email:
      
        payload = {
          code: this.code,
          email : OtpTypes.Email
        }
        this.sendVerifyEmailCode(payload);

        break;

      case OtpTypes.Phone:
      
        payload = {
          ...this.data,
          code: this.code,
        }
        this.confirmVerifPhoneCode(payload);

        break;

      case OtpTypes.DeleteAccount:
      
        payload = {
          onTimePassword: this.code,
        }
        this.confirmDeleteAccount(payload);

        break;

      case OtpTypes.TransferAmount:
    
        payload = {
          onTimePassword: this.code,
        }
        this.confirmTransferAmountToUser(payload);

        break;
    
      default:
        break;
    }

  }



  sendVerifyEmailCode(payload: object): void {
    this.subscription.add(this._HttpService.post(APIs.confirmVerifyEmailCode, payload)
    .subscribe((res: HResponse ) => {   
      if (!res.isSuccess) return;
      this._MatDialogRef.close(res);
    }));
  }


  
  confirmVerifPhoneCode(payload: object): void {
    this.subscription.add(this._HttpService.post(APIs.confirmVerifPhoneCode, payload)
    .subscribe((res: HResponse ) => {   
      if (!res.isSuccess) return;
      this._MatDialogRef.close(res);
    }));
  }


  confirmDeleteAccount(payload: object): void {
    this.subscription.add(this._HttpService.post(APIs.confirmDeleteAccount, payload)
    .subscribe((res: HResponse ) => {   
      if (!res.isSuccess) return;
      this._MatDialogRef.close(res);
      this.logout();
    }));
  }


  confirmTransferAmountToUser(payload: object): void {
    this.subscription.add(this._HttpService.post(APIs.confirmTransferAmountToUser, payload)
    .subscribe((res: HResponse ) => {   
      if (!res.isSuccess) return;
      this._MatDialogRef.close(res);
    }));
  }


  logout(): void {
    this._BrowserService.deleteItem(Constant.token);
    this._BrowserService.deleteItem(Constant.userData);
    this.authService.authChange$.next(null);
    this._MessagesService.openSuccessSnackBar('Your account has deleted successfully', 3000)
    this._Router.navigate(['/explore'])
  }


  repeatCounter(): void {
    this.timeRemainingHasEnded = false;
    this.counter.repeat();
  }

}
