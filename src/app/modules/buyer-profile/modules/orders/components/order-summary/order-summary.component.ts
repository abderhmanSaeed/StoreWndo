import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/modules/cart/models/cart/cart';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  @Input() order!: any

  constructor() { }

  ngOnInit(): void {
  }

}
