import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.scss']
})
export class TopUpComponent implements OnInit {

  form!: FormGroup;
  subscription: Subscription = new Subscription();

  // booleans 
  formError: boolean = false;


  constructor(
    private _FormBuilder: FormBuilder,
    private _HttpService: HttpService,
  ) { }


  ngOnInit(): void {
    this.initForm();    
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  initForm(): void {
    this.form = this._FormBuilder.group({
      amount: [null, [Validators.required]],
    });
  }


  submit(): void {        
    if (!this.form.valid) {
      this.formError = true;
      return
    }

    const payload = {
      ...this.form.value,
      isWeb: true
    }

    this.topupYourWallet(payload);
  }

  topupYourWallet(payload: object): void {
    this.subscription.add(this._HttpService.get(APIs.topupYourWallet, payload)
    .subscribe((res: HResponse ) => {   
      if (!res.isSuccess) return;
      const redirectUrl = res?.responseData?.redirectUrl
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    }));
  }



  resetForm(): void {
    this.form.reset();
  }

}
