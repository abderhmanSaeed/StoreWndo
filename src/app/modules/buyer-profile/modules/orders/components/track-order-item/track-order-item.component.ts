import { Component, Input, OnInit } from '@angular/core';
import { OrderItemStatsObject } from '../../enums/order-item-stats.object';
import { OrderStatsObject } from '../../enums/order-stats-object';

@Component({
  selector: 'track-order-item',
  templateUrl: './track-order-item.component.html',
  styleUrls: ['./track-order-item.component.scss']
})
export class TrackOrderItemComponent implements OnInit {

  // Inputs 
  @Input() data: any = {};

  // props
  orderStatsObject =  OrderStatsObject;
  orderItemStatsObject =  OrderItemStatsObject;


  constructor() { }

  ngOnInit(): void {
  }

  onImgError(event: any){
    event.target.src = 'assets/media/logos/smile.svg'
  }
}
