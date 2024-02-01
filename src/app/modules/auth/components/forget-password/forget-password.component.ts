import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';
import { AuthComponents } from '../../enums/auth-components';
import { LoginTypes } from '../../enums/login-types';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  
  // Inputs
  @Input() countriesCodes: any[] = [];

  // outputs 
  @Output() chengeCurrentAuth: EventEmitter<any> = new EventEmitter();

  // properties 
  form!: FormGroup;
  formError: boolean = false;
  authComponents = AuthComponents;
  subscription: Subscription = new Subscription();
  selectedLoginType: LoginTypes = LoginTypes.Phone;


  constructor(
    private _FormBuilder: FormBuilder,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
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
      isAngular: false,
      phone: ['', [Validators.required]],
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
        phoneControl.setValidators(Validators.required);
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
      ...this.form.value?.phone,
    }

    if (this.selectedLoginType == LoginTypes.Email) {
      delete payload['phoneCode']
    }

    this.forgetPassword(this._HelperFunctionsService.deleteNullValueOfObj(payload));

  }


  forgetPassword(payload: object): void {
    this.subscription.add(this._HttpService.post(APIs.forgetPassword, payload).subscribe((res: HResponse ) => {

      if (!res.isSuccess) return;
      this._BrowserService.setItem(Constant.userData,res.responseData);
      this.forgetPasswordHandler();

    }));
  }


  forgetPasswordHandler(): void {
    this.chengeCurrentAuth.emit({AuthComponent: AuthComponents.VerifyCode, isForget: true});

    let sendTo = {};

    if (this.selectedLoginType == LoginTypes.Email) {
      sendTo = {
        key: LoginTypes.Email,
        email: this.getControl('email').value 
      }

    } else {
      sendTo = {
        key: LoginTypes.Phone,
        phone: this.getControl('phone').value?.phone,
        phoneCode: this.getControl('phoneCode').value,
      }
    }
    
    this._BrowserService.setItem(Constant.sentTo, sendTo);
  }


  onPhoneChange(e: any): void {
    this.getControl('phoneCode').setValue(e.code);
  }

}
