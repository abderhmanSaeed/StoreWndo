import { Component, Input, OnInit } from '@angular/core';
import { OrderItemState } from 'src/app/shared/enums/order-item-state/order-item-state';

@Component({
  selector: 'track-order-progress',
  templateUrl: './track-order-progress.component.html',
  styleUrls: ['./track-order-progress.component.scss', './track-order-progress.component-rtl.scss']
})
export class TrackOrderProgressComponent implements OnInit {


  // Inputs
  @Input() stateOfSellerOrder: OrderItemState = OrderItemState.OrderPlaced;


  // Props 
  orderItemStateEnum = OrderItemState;
  progressbarValue: number = 33.3333;

  constructor(

  ) { }

  ngOnInit(): void {
    this.setProgressbarValue();
  }


  setProgressbarValue(): void {
    switch (this.stateOfSellerOrder) {
      case OrderItemState.OrderPlaced:
        this.progressbarValue = 0;          
        break;

      case OrderItemState.Shipping:
        this.progressbarValue = (100 / 3);          
        break;

      case OrderItemState.PickUp:
        this.progressbarValue = (100 / 3);          
        break;

      case OrderItemState.Refund:
        this.progressbarValue = (100 / 3);          
        break;

      case OrderItemState.DeliveryOnTheWay:
        this.progressbarValue = (100 / 3) + (100 / 3);          
        break;


      case OrderItemState.Delivered:
        this.progressbarValue = 100;          
        break;

      case OrderItemState.Returned:
        this.progressbarValue = 100;          
        break;
  
      default:
        break;
    }
  }


}
