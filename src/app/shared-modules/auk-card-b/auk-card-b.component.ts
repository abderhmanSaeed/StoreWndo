import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlashSale } from 'src/app/modules/explore/modules/shorts/models/explore-product/explore-product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'auk-card-b',
  templateUrl: './auk-card-b.component.html',
  styleUrls: ['./auk-card-b.component.scss', './auk-card-b.component.rtl.scss']
})
export class AukCardBComponent implements OnInit {

  // Inputs
  @Input() data!: FlashSale;  
  
  // Outputs
  @Output() addedToCart: EventEmitter<boolean> = new EventEmitter();
  @Output() onProductWishChange: EventEmitter<any> = new EventEmitter();


  // props 
  mainRippleColor: string = environment.mainRippleColor;

  constructor() { }

  ngOnInit(): void {
  }

}
