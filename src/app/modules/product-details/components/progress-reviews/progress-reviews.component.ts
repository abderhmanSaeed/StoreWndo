import { Component, OnInit, Input } from '@angular/core';
import { ReviewsStarsObjectEnum } from '../../enums/reviews-stars-object';

@Component({
  selector: 'app-progress-reviews',
  templateUrl: './progress-reviews.component.html',
  styleUrls: ['./progress-reviews.component.scss']
})
export class ProgressReviewsComponent implements OnInit {

  // inputs 
  @Input() star: any = "";
  @Input() starRate: any = "";

  ReviewsStarsObjectEnum = ReviewsStarsObjectEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
