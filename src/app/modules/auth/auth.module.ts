
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { CountDownModule } from 'src/app/shared-modules/count-down/count-down.module';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    VerifyCodeComponent,
    NewPasswordComponent,
    SocialLoginComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    CountDownModule,
    MatDialogModule,
    NgOtpInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    AuthComponent
  ],
})
export class AuthModule { }
