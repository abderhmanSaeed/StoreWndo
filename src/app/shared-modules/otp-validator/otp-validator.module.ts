import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpValidatorComponent } from './otp-validator.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CountDownModule } from '../count-down/count-down.module';



@NgModule({
  declarations: [
    OtpValidatorComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatDialogModule,
    CountDownModule,
    NgOtpInputModule,
  ],
  exports: [
    OtpValidatorComponent
  ]
})
export class OtpValidatorModule { }
