import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AccountSettings } from 'src/app/modules/buyer-profile/models/account-settings/account-settings';
import { ValidatorComplexPassword } from 'src/app/shared/helpers/validators/complex-password.validators';
import { MustMatch } from 'src/app/shared/helpers/validators/must-match';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {

  // props 
  form!: FormGroup; 
  subscription: Subscription = new Subscription();

  // Booleans
  formError: boolean = false;

 constructor(
  private _FormBuilder: FormBuilder,
   private _HttpService: HttpService,
   private _MessagesService: MessagesService,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private _DialogRef: MatDialogRef<ChangePasswordDialogComponent>,
 ) { }

 ngOnInit(): void {
  console.log(this.data, 'hello');
  this.initForm();
 }


 ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }


 initForm(): void {
   this.form = this._FormBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: ['', [Validators.required, ValidatorComplexPassword()]],
      confirmNewPassword: [ null, [Validators.required]],
   },
   {
     validator: MustMatch('newPassword', 'confirmNewPassword'),
   }
   );
 }


  getControl(controlName: string): any {
    return this.form.get(controlName)
  }


  submit(): void {
    if (!this.form.valid) {
      this.formError = true;
      if((this.getControl('newPassword') as FormControl)?.hasError('complexPassword')) {
        this._MessagesService.openErrorSnackBar('Invalid password format ,must be between 8 and 16 characters that contains one upper and one lower character and one special character and one number', 5000)
      }
      return
    }
    this.checkPassword(this.form.value);
  }

  
  checkPassword(payload: any): void {
    this.subscription.add(this._HttpService.post(APIs.checkPassword, payload).subscribe((res: HResponse ) => {
      
      if (!res.isSuccess) return;
      
      if (!res?.responseData?.isValid) {
        this.formError = true;
        (this.getControl('oldPassword') as FormControl)?.setErrors({invalidOldPassword: true});
        return
      }

      this.data.accountSettings.password = (this.getControl('newPassword') as FormControl).value;
      this.updateaccountSettings(this.data.accountSettings);
    }));
  }


  updateaccountSettings(accountSettings: AccountSettings): void {
    this.subscription.add(
      this._HttpService.post(APIs.editaccountSettings, accountSettings).subscribe( (res: HResponse) => {
        if (!res.isSuccess) return;
        this._DialogRef.close(res);
      })
    );
  }
 

}
