import { Component, Input, OnInit } from '@angular/core';
import { Seller } from 'src/app/modules/explore/modules/shorts/models/explore-product/explore-product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'search-result-store-card',
  templateUrl: './search-result-store-card.component.html',
  styleUrls: ['./search-result-store-card.component.scss']
})
export class SearchResultStoreCardComponent implements OnInit {

  // inputs 
  @Input() seller: Seller = {};


  // props 
  mainRippleColor: string = environment.mainRippleColor

  constructor() { }

  ngOnInit(): void {
  }

  onImgError(event: any){
    event.target.src = 'assets/media/logos/smile.svg'
  }
}
