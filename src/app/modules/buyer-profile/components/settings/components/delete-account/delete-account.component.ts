import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BuyerProfileService } from 'src/app/modules/buyer-profile/servises/buyer-profile/buyer-profile.service';
import { DeleteAccountReasons } from 'src/app/shared/enums/delete-account/delete-account';
import { deleteAccountReasons } from 'src/app/shared/lookups/delete-account-reasons';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';
import { DeleteAccountReason } from 'src/app/shared/models/delete-account-reason/delete-account-reason';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { MatDialog } from '@angular/material/dialog';
import { OtpTypes } from 'src/app/shared-modules/otp-validator/enums/otp-types/otp-types';
import { OtpValidatorComponent } from 'src/app/shared-modules/otp-validator/otp-validator.component';

@Component({
  selector: 'delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit, OnDestroy {


  // Props 
  profileData: BuyerProfile = {};
  subscription: Subscription = new Subscription();
  selectedReason: DeleteAccountReasons | null = null;
  deleteAccountReasons: DeleteAccountReason[] = deleteAccountReasons;

  constructor(
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _BuyerProfileService: BuyerProfileService
  ) { }

  ngOnInit(): void {
    this.onProfileDataChange();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onProfileDataChange(): void {
   this.subscription.add( this._BuyerProfileService.profileData$.subscribe( (profileData: BuyerProfile ) => {
      this.profileData = profileData;
    }))
  }


  deleteAccount(): void {
    this.sendOnTimePassword(this.selectedReason);
  }


  sendOnTimePassword(reason: DeleteAccountReasons | null): void {

    const payload = {
      reason
    }

    this.subscription.add(this._HttpService.postByParams(APIs.sendOnTimePassword, payload)
    .subscribe((res: HResponse ) => {   
      if (!res.isSuccess) return;
      this.openEditPhoneDialog();
    }));
  }

  
  openEditPhoneDialog(): void {
    const dialogRef = this._MatDialog.open(OtpValidatorComponent, {
      width: '523px',
      panelClass: 'light-dialog',
      data: {
        buyerProfile: true,
        sentTo: this.profileData.phoneNumber,
        otpType: OtpTypes.DeleteAccount
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
