import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reviews-bar',
  templateUrl: './reviews-bar.component.html',
  styleUrls: ['./reviews-bar.component.scss']
})
export class ReviewsBarComponent implements OnInit {

  // inputs 
  @Input() star: any = "";
  @Input() starRate: any = "";

  constructor() { }

  ngOnInit(): void {
    console.log(this.star, this.starRate);
  }

}
