import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'auk-rating',
  templateUrl: './auk-rating.component.html',
  styleUrls: ['./auk-rating.component.scss']
})
export class AukRatingComponent implements OnInit {
  
  @Input() theme: number = 1;
  @Input() data: number | undefined = 0
  @Input() textPanelClass: string = ''
  
  faStar = faStar;

  constructor() { }

  ngOnInit(): void {
  }

}
