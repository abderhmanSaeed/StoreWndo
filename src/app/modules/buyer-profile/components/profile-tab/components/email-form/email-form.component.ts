import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { MatDialog } from '@angular/material/dialog';
import { OtpValidatorComponent } from 'src/app/shared-modules/otp-validator/otp-validator.component';
import { OtpTypes } from 'src/app/shared-modules/otp-validator/enums/otp-types/otp-types';

@Component({
  selector: 'email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit, OnDestroy {

  // inputs
  @Input() set profileData( data: BuyerProfile) {
    this.profile = data;
    this.initForm();    
    this.form?.patchValue(this.profile);
  }

  // props 
  form!: FormGroup; 
  profile: BuyerProfile = {};
  subscription: Subscription = new Subscription();


  // booleans 
  formError: boolean = false;


  constructor(
    private _MatDialog: MatDialog,
    private _FormBuilder: FormBuilder,
    private _HttpService: HttpService,
    private _MessagesService: MessagesService,
  ) { }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  initForm(): void {
    this.form = this._FormBuilder.group({
      email: [null, [Validators.required, Validators.email]],
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

    this.sendVerifyEmailCode(payload);
  }


  
  sendVerifyEmailCode(payload: object): void {
    this.subscription.add(this._HttpService.postByParams(APIs.sendVerifyEmailCode, payload)
    .subscribe((res: HResponse ) => {   
      this.openEditPhoneDialog(payload);   
      if (!res.isSuccess) return;
      console.log(res);
    }));
  }



  openEditPhoneDialog(payload: any): void {
    const dialogRef = this._MatDialog.open(OtpValidatorComponent, {
      width: '523px',
      panelClass: 'light-dialog',
      data: {
        sentTo: payload.email,
        buyerProfile: true,
        otpType: OtpTypes.Email
      }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res?.isSuccess) {
          console.log('res: ', res);
        }
      })
    )
  }


}
