import { Component, OnInit, Input } from '@angular/core';

import { ReviewsStarsObjectEnum } from '../../enums/reviews-stars-object';

@Component({
  selector: 'app-stars-reviews',
  templateUrl: './stars-reviews.component.html',
  styleUrls: ['./stars-reviews.component.scss']
})
export class StarsReviewsComponent implements OnInit {

  ReviewsStarsObjectEnum = ReviewsStarsObjectEnum

  // inputs 
  @Input() star: any = "";
  @Input() starRate: number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.star);
    
  }

}
