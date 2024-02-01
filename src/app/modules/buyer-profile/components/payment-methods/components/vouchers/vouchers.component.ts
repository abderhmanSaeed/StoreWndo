import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {


  // input props
  @Input() data: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
