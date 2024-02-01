import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { AuthComponent } from '../../auth.component';

import { AuthComponents } from '../../enums/auth-components';
import { LoginTypes } from '../../enums/login-types';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  // Inputs
  @Input() countriesCodes: any[] = [];

  // outputs 
  @Output() chengeCurrentAuth: EventEmitter<AuthComponents> = new EventEmitter();

  // properties 
  form!: FormGroup;
  formError: boolean = false;
  authComponents = AuthComponents;
  subscription: Subscription = new Subscription();
  selectedLoginType: LoginTypes = LoginTypes.Phone;


  constructor(
    private _FormBuilder: FormBuilder,
    private _HttpService: HttpService,
    private _AuthService: AuthService,
    private _BrowserService: BrowserService,
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _AuthDialogRef: MatDialogRef<AuthComponent>,
    private _HelperFunctionsService: HelperFunctionsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  initForm(): void {
    this.form = this._FormBuilder.group({
      email: [''],
      phoneCode: [''],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required]],
    });
  }


  getControl(controlName: string): any {
    return this.form.get(controlName)
  }


  onLoginTypeChange(loginType: LoginTypes): void {
    this.selectedLoginType = loginType;

    const phoneControl = this.getControl('phone')
    const emailControl = this.getControl('email')

    phoneControl.clearValidators();
    emailControl.clearValidators();

    switch (this.selectedLoginType) {
      case LoginTypes.Email:
        emailControl.setValidators([Validators.required, Validators.email]);
        phoneControl.setValue(null);
      break;

      case LoginTypes.Phone:
        phoneControl.setValidators([Validators.required, Validators.maxLength(10)]);
        emailControl.setValue(null);
      break;
    
      default:
      break;
    }

    this.form.updateValueAndValidity();
  }


  submit(): void {    

    if (!this.form.valid) {
      this.formError = true;
      return
    }

    const payload = {
      ...this.form.value,
      ...this.form.value.phone
    }

    if (this.selectedLoginType == LoginTypes.Email) {
      delete payload['phoneCode']
    }

    this.login(this._HelperFunctionsService.deleteNullValueOfObj(payload));

  }


  login(payload: object): void {
    this.subscription.add(this._HttpService.post(APIs.login, payload).subscribe((res: HResponse ) => {

      if (!res.isSuccess) return;

      this._BrowserService.setItem(Constant.userData,res.responseData);
      if (res.responseData.access_Token) {
        this._BrowserService.setItem(Constant.token,res.responseData.access_Token);
        this._AuthService.authChange$.next(res.responseData);
      }
      
      if (!res.responseData.isVerified) {
        this.notVerifiedHandler();
      } else {
        this._BrowserService.setItem(Constant.explorePages, []);
        this._MessagesService.openSuccessSnackBar(
          this._TranslateService.instant('meassges.loged-in')
        , 3000)
        this._AuthDialogRef.close();
      }

    }));
  }

 
  notVerifiedHandler(): void {
    this.chengeCurrentAuth.emit(AuthComponents.VerifyCode);

    let sendTo = {};

    if (this.selectedLoginType == LoginTypes.Email) {
      sendTo = {
        key: LoginTypes.Email,
        email: this.getControl('email').value 
      }

    } else {
      sendTo = {
        key: LoginTypes.Phone,
        phone: this.getControl('phone').value,
        phoneCode: this.getControl('phoneCode').value,
      }
    }

    this._BrowserService.setItem(Constant.sentTo, sendTo);
  }


  onPhoneChange(e: any): void {
    this.getControl('phoneCode').setValue(e.code);
  }

}
