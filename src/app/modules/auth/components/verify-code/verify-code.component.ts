import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription, timer, scan, takeWhile, Observable } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CountDownComponent } from 'src/app/shared-modules/count-down/count-down.component';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { environment } from 'src/environments/environment';
import { AuthComponent } from '../../auth.component';
import { AuthComponents } from '../../enums/auth-components';
import { LoginTypes } from '../../enums/login-types';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit, OnDestroy {

  // outputs 
  @Output() chengeCurrentAuth: EventEmitter<AuthComponents> = new EventEmitter();


  // Inputs
  @Input() isForget: boolean = false;

  // View Children
  @ViewChild('counter') counter!: CountDownComponent;

  // Properties 
  code: any;
  sentTo: any = ''
  userId: any = null; 
  userName: string = '00000000';
  timer$ = timer(0, 3000);
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
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
  ) { }

  ngOnInit(): void {
    this.getNededData();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getNededData(): void {
    this.sentTo = this._BrowserService.getItem(Constant.sentTo);
    this.userName = this._BrowserService.getItem(Constant.userData)?.userName;
    this.userId = this._BrowserService.getItem(Constant.userData)?.userId;
    if (!this.sentTo) {
      this.sentTo = {
        key: LoginTypes.Phone,
        phone: this._BrowserService.getItem(Constant.userData)?.phone
      }
    }
  }

  
  onOTPTimeRemainingEnd(isEnded: boolean): void {
    if(!isEnded) return    
    this.timeRemainingHasEnded = true;
  }


  onOtpChange(otp: any) {
    this.code = otp;
    if (this.code.length != 4) return;

    if (this.isForget) {
      this.verifyCodeForForgetPassword(this.code);
    } else {
      this.verifyCode(this.code);
    }

  }


  verifyCode(code: any): void {
    const payload = {
      code,
      userName: this.userName
    }

    this.subscription.add(
      this._HttpService.post(APIs.verifyCode, payload).subscribe( (res: HResponse) => {
        if (!res.isSuccess) return;
        this.chengeCurrentAuth.emit(this.authComponents.Login);
      })
    )
  }


  verifyCodeForForgetPassword(code: any): void {

    const payload = {
      code,
      userId: this.userId
    }

    this.subscription.add(
      this._HttpService.post(APIs.verifyCodeForForgetPassword, payload).subscribe( (res: HResponse) => {
        if (!res.isSuccess) return;
        this._BrowserService.setItem(Constant.userData,res.responseData);
        this.chengeCurrentAuth.emit(this.authComponents.NewPassword);
      })
    )
  }


  resendOTP(): void {

    if (this.isForget) {
      this.resendForgetPasswordOTP();
      return
    }

    const query = {
      userName: this.userName
    }

    this.subscription.add(
      this._HttpService.postByParams(APIs.reSendNewCode, null ,query).subscribe( (res: HResponse) => {
        if (!res.isSuccess) return;
        this.repeatCounter();
      })
    )


  }


  resendForgetPasswordOTP(): void {

    const query = {
      ...this.sentTo
    }

    this.subscription.add(
      this._HttpService.post(APIs.forgetPassword, query).subscribe( (res: HResponse) => {
        if (!res.isSuccess) return;
        this.repeatCounter();
      })
    )
    
  }


  repeatCounter(): void {
    this.timeRemainingHasEnded = false;
    this.counter.repeat();
  }

}
