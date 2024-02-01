import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss']
})
export class NameFormComponent implements OnInit {

  // props 
  form!: FormGroup;
  subscription: Subscription = new Subscription();


  // booleans 
  formError: boolean = false;

  constructor(
    private _FormBuilder: FormBuilder,
    private _HttpService: HttpService,
    private _AddressFormComponentsDialogRef: MatDialogRef<NameFormComponent>,
  ) { }


  ngOnInit(): void {
    this.initForm();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  
  initForm(): void {
    this.form = this._FormBuilder.group({
      name: ["", [Validators.required]],
    });
  }



  submit(): void {    
    if (!this.form.valid) {
      this.formError = true;
      return
    }
    this.editProfile(this.form.value);
  }


  editProfile(payload: any): void {    
    const formData = new FormData();
    formData.append('name', this.form.value.name)

    this.subscription.add(
      this._HttpService.post(APIs.editProfile, formData).subscribe((res: HResponse ) => {
        if (res?.isSuccess) {
          console.log(res);
          this._AddressFormComponentsDialogRef.close(res);
        }
      })
    );
  }

}
