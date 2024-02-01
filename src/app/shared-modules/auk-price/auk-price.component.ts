import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'auk-price',
  templateUrl: './auk-price.component.html',
  styleUrls: ['./auk-price.component.scss']
})
export class AukPriceComponent implements OnInit {


  // input props 
  @Input() panelClass: string = '';
  @Input() price: number | undefined = 0;
  @Input() priceAfterOffer: number | undefined = 0;
  @Input() isVertical: boolean | undefined = false;

  constructor() { }

  ngOnInit(): void {
  }

}
