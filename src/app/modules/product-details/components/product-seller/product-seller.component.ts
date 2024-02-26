import { Component, Input, OnInit } from '@angular/core';
import { Seller } from 'src/app/modules/explore/modules/shorts/models/explore-product/explore-product';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'product-seller',
  templateUrl: './product-seller.component.html',
  styleUrls: ['./product-seller.component.scss']
})
export class ProductSellerComponent implements OnInit {
  // inputs
  @Input() data: Seller | undefined = {};
  @Input() followersCount: number | undefined = 0;
  @Input() isFollowed: boolean | undefined = false;

  // props
  faUser = faUser;
  imgPlaceholder: string = 'assets/media/users/user-placeholder.png'

  constructor() { }

  ngOnInit(): void {
  }



  onImgError(event: any){
    event.target.src = this.imgPlaceholder
  }
}
