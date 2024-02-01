import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'auk-card-b-price',
  templateUrl: './auk-card-b-price.component.html',
  styleUrls: ['./auk-card-b-price.component.scss']
})
export class AukCardBPriceComponent implements OnInit {

  @Input() price: number | undefined = 0;
  @Input() priceAfterOffer: number | undefined = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
