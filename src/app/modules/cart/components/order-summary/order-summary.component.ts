import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../../models/cart/cart';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  @Input() cart!: Cart

  constructor() { }

  ngOnInit(): void {
  }

}
