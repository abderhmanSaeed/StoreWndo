import { Component, Input, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Seller } from 'src/app/modules/explore/modules/shorts/models/explore-product/explore-product';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  // inputs 
  @Input() followersCount: number | undefined = 0;
  @Input() data: Seller | undefined = {}

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
