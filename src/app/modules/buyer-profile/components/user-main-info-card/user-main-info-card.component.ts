import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';
import { BuyerProfileService } from '../../servises/buyer-profile/buyer-profile.service';

@Component({
  selector: 'user-main-info-card',
  templateUrl: './user-main-info-card.component.html',
  styleUrls: ['./user-main-info-card.component.scss']
})
export class UserMainInfoCardComponent implements OnInit, OnDestroy {


  // props 
  rate: number = 3;
  profileData: BuyerProfile = {};
  subscription: Subscription = new Subscription();

  constructor(
    private _BuyerProfileService: BuyerProfileService,
  ) { }
  

  ngOnInit(): void {
    this.onProfileDataChange();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onProfileDataChange(): void {
    this.subscription.add(this._BuyerProfileService.profileData$.subscribe( (profileData: BuyerProfile ) => {
      this.profileData = profileData;
    }))
  }

  onImgError(event: any){
    event.target.src = 'assets/media/profile/profile.png'
  }
}
