import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.scss']
})
export class StarsRatingComponent implements OnInit {


  @Input() max: number = 0;
  @Input() rate: number = 0;
  @Input() readOnly: boolean = true;
  @Input() customStars: boolean = false;

  @Input() widthClass: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
