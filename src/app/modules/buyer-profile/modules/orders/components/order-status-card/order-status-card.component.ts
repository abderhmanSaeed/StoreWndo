import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'order-status-card',
  templateUrl: './order-status-card.component.html',
  styleUrls: ['./order-status-card.component.scss']
})
export class OrderStatusCardComponent implements OnInit {

  // input props
  @Input() status: any = {};



  constructor() { }

  ngOnInit(): void {
  }

}
