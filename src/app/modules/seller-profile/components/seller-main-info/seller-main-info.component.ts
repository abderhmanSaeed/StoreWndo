import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuyerProfileService } from 'src/app/modules/buyer-profile/servises/buyer-profile/buyer-profile.service';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'seller-main-info',
  templateUrl: './seller-main-info.component.html',
  styleUrls: ['./seller-main-info.component.scss']
})
export class SellerMainInfoComponent implements OnInit {


  // Inputs 
  @Input() data: any = {};

  // props 
  rate: number = 3;
  sellerRoute: string = environment.routes.sellerProfile;
  subscription: Subscription = new Subscription();

  constructor(
    private _BuyerProfileService: BuyerProfileService,
  ) { }

  ngOnInit(): void {    
  }

  onImgError(event: any){
    event.target.src = 'assets/media/profile/profile.png'
  }
  
}
