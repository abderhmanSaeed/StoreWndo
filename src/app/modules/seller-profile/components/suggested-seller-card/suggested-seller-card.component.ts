import { Component, Input, OnInit } from '@angular/core';
import { Seller } from 'src/app/modules/explore/modules/shorts/models/explore-product/explore-product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'suggested-seller-card',
  templateUrl: './suggested-seller-card.component.html',
  styleUrls: ['./suggested-seller-card.component.scss']
})
export class SuggestedSellerCardComponent implements OnInit {

  // inputs 
  @Input() data: Seller | undefined = {}


  // props 
  mainRippleColor: string = environment.mainRippleColor
  imgPlaceholder: string = 'assets/media/users/user-placeholder.png'

  constructor() { }

  ngOnInit(): void {
  }
  
  onImgError(event: any){
    event.target.src = this.imgPlaceholder
  }

}
