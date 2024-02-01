import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ValidatorComplexPassword } from 'src/app/shared/helpers/validators/complex-password.validators';
import { MustMatch } from 'src/app/shared/helpers/validators/must-match';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { HelperFunctionsService } from 'src/app/shared/services/helper-funcctions/helper-functions.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { AuthComponents } from '../../enums/auth-components';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  // Inputs
  @Input() countriesCodes: any[] = [];

  // outputs 
  @Output() chengeCurrentAuth: EventEmitter<AuthComponents> = new EventEmitter();


  // properties 
  form!: FormGroup; 
  formError: boolean = false;
  authComponents = AuthComponents
  subscription: Subscription = new Subscription();

  constructor(
    private _FormBuilder: FormBuilder,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    private _MessagesService: MessagesService,
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
      phone: [null, [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, ValidatorComplexPassword()]],
      phoneCode: ['', [Validators.required]],
      confirmPassword: [ null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    },
    {
      validator: MustMatch('password', 'confirmPassword'),
    }
    );
  }


  getControl(controlName: string): any {
    return this.form.get(controlName)
  }


  onPhoneChange(e: any): void {
    this.getControl('phoneCode').setValue(e.code);
  }


  submit(): void {        
    if (!this.form.valid) {
      this.formError = true;
      if((this.getControl('password') as FormControl).hasError('complexPassword')) {
        this._MessagesService.openErrorSnackBar('Invalid password format ,must be between 8 and 16 characters that contains one upper and one lower character and one special character and one number', 5000)
      }
      return
    }

    const payload = {
      ...this.form.value,
      ...this.form.value.phone
    }

    this.signup(this._HelperFunctionsService.deleteNullValueOfObj(payload));
  }


  signup(payload: object): void {
    this.subscription.add(this._HttpService.post(APIs.register, payload).subscribe((res: HResponse ) => {

      if (!res.isSuccess) return;

      this._BrowserService.deleteItem(Constant.sentTo);
      this._BrowserService.setItem(Constant.userData,res.responseData);
      if (res.responseData.access_Token) {
        this._BrowserService.setItem(Constant.token,res.responseData.access_Token);
      }

      this.chengeCurrentAuth.emit(AuthComponents.VerifyCode);

      
    }));
  }


}
