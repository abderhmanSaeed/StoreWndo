import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'auk-card-a-price',
  templateUrl: './auk-card-a-price.component.html',
  styleUrls: ['./auk-card-a-price.component.scss']
})
export class AukCardAPriceComponent implements OnInit {

  @Input() price: number | undefined = 0;
  @Input() priceAfterOffer: number | undefined = 0;


  constructor() { }

  ngOnInit(): void {
  }

}
