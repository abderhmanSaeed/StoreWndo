import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
import { LoginTypes } from '../../enums/login-types';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

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
    password: ['', [
      ValidatorComplexPassword(),
      Validators.required,
    ]],
     confirmPassword: [ null, [
      ValidatorComplexPassword(),
      Validators.required,
      ]
    ],
     userId: [this._BrowserService.getItem(Constant.userData)?.userId],
   },
   {
    validator: MustMatch('password', 'confirmPassword'),
  }
   );
 }


 getControl(controlName: string): any {
   return this.form.get(controlName)
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
   }

   delete payload?.confirmPassword

   this.resetPassword(this._HelperFunctionsService.deleteNullValueOfObj(payload));

 }


 resetPassword(payload: object): void {
   this.subscription.add(this._HttpService.post(APIs.resetPassword, payload).subscribe((res: HResponse ) => {
    if (!res.isSuccess) return;
    this.clearOldData();
    this.chengeCurrentAuth.emit(AuthComponents.Login);
   }));
 }


 clearOldData(): void {
   this._BrowserService.deleteItem(Constant.token);
   this._BrowserService.deleteItem(Constant.sentTo);
    this._BrowserService.deleteItem(Constant.userData);
 }

}

