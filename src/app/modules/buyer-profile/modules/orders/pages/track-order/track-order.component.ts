import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { OrderStatsObject } from '../../enums/order-stats-object';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {


  // props 
  order: any = {};
  orderStatsObject =  OrderStatsObject;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _BreadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.setBreadcrumb();
    this.getOrder();
  }

  setBreadcrumb(): void {
    this._BreadcrumbService.$items.next([
      {
        name: 'breadcrumb.home',
        url: '/'
      },
      {
        name: 'breadcrumb.profile',
        url: '/buyer-profile'
      },
      {
        name: 'breadcrumb.my-orders',
        url: '/buyer-profile/orders'
      },
      {
        name: 'breadcrumb.track-the-order',
        active: true
      }
    ])
  }



  getOrder(): void {
    this.order = this._ActivatedRoute.snapshot.data['trackOrder']?.responseData;    
    console.log('trackOrder', this.order);
  }

}
