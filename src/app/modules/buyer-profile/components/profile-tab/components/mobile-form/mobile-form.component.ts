import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { MatDialog } from '@angular/material/dialog';
import { OtpValidatorComponent } from 'src/app/shared-modules/otp-validator/otp-validator.component';
import { OtpTypes } from 'src/app/shared-modules/otp-validator/enums/otp-types/otp-types';

@Component({
  selector: 'mobile-form',
  templateUrl: './mobile-form.component.html',
  styleUrls: ['./mobile-form.component.scss']
})
export class MobileFormComponent implements OnInit, OnDestroy {
  
  // inputs
  @Input() set profileData( data: BuyerProfile) {
    this.profile = data;
    console.log(this.profile, 'this.profilethis.profilethis.profilethis.profile');
    let phone = {
      phone: this.profile?.phoneNumber,
      phoneCode: this.profile?.phoneCode
    }
    this.initForm();    
    this.form?.patchValue({...phone});
  }


  // props 
  form!: FormGroup;
  countriesCode: any[] = []; 
  profile: BuyerProfile = {};
  subscription: Subscription = new Subscription();



  // booleans 
  formError: boolean = false;

  constructor(
    private _MatDialog: MatDialog,
    private _FormBuilder: FormBuilder,
    private _HttpService: HttpService,
  ) { }


  ngOnInit(): void {
    this.getCountriesCode();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

   
  initForm(): void {
    this.form = this._FormBuilder.group({
      phone: [null, [Validators.required]],
      phoneCode: ['01003468340', [Validators.required]],
    });
  }


  onPhoneChange(e: any): void {
    this.getControl('phoneCode').setValue(e.code);
  }

  
  getControl(controlName: string): any {
    return this.form.get(controlName)
  }


  submit(): void {        
    if (!this.form.valid) {
      this.formError = true;
      return
    }

    const payload = {
      ...this.form?.value,
      ...this.form?.value?.phone
    }

    this.sendVerifPhoneCode(payload);
  }


  sendVerifPhoneCode(payload: object): void {
    this.subscription.add(this._HttpService.post(APIs.sendVerifPhoneCode, payload)
    .subscribe((res: HResponse ) => {   
      if (!res.isSuccess) return;
      this.openEditPhoneDialog(payload);   
    }));
  }


  openEditPhoneDialog(payload: any): void {
    const dialogRef = this._MatDialog.open(OtpValidatorComponent, {
      width: '523px',
      panelClass: 'light-dialog',
      data: {
        ...payload,
        buyerProfile: true,
        sentTo: payload.phone,
        otpType: OtpTypes.Phone
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


  getCountriesCode(): void {
    this.subscription.add( this._HttpService.get(APIs.getCountriesCode)
    .pipe( map( data => data.responseData ) ).subscribe((data:any) => this.countriesCode = data));
  }

}
