import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { NameFormComponent } from '../name-form/name-form.component';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})
export class PhoneFormComponent implements OnInit {


  // props 
  form!: FormGroup;
  phone: string = ''
  countriesCode: any[] = []; 
  subscription: Subscription = new Subscription();


  // booleans 
  showOTP: boolean = false;
  formError: boolean = false;
  constructor(
    private _FormBuilder: FormBuilder,
    private _HttpService: HttpService,
    private _AddressFormComponentsDialogRef: MatDialogRef<NameFormComponent>,
  ) { }


  ngOnInit(): void {
    this.initForm();
    this.getCountriesCode();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  
  initForm(): void {
    this.form = this._FormBuilder.group({
      phone: [null, [Validators.required]],
      phoneCode: ['', [Validators.required]],
    });
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
      return
    }
    this.sendVerifPhoneCode(this.form.value);
  }


  sendVerifPhoneCode(data: any): void {  
    
    
    const payload = {
      ...this.form.value,
      ...this.form.value.phone
    }

    this.subscription.add(
      this._HttpService.post(APIs.sendVerifPhoneCode, payload).subscribe((res: HResponse ) => {
        if (res?.isSuccess) {
          this.showOTP = true;
          this.phone = payload?.phone
        }
      })
    );
  }



  onOTPChange(otp: any): void {
    if (otp.length != 4) return;
    this.verifyCode(otp);
  }


  verifyCode(code: any): void {
    const payload = {
      code,
      ...this.form.value,
      ...this.form.value.phone
    }

    this.subscription.add(
      this._HttpService.post(APIs.confirmVerifPhoneCode, payload).subscribe( (res: HResponse) => {
        if (!res.isSuccess) return;
        this._AddressFormComponentsDialogRef.close(res);
      })
    )
  }



  getCountriesCode(): void {
    this.subscription.add( this._HttpService.get(APIs.getCountriesCode)
    .pipe( map( data => data.responseData ) ).subscribe(data => this.countriesCode = data));
  }

}
