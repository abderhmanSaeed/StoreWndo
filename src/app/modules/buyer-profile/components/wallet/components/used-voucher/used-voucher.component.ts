import { Component, Input, OnInit } from '@angular/core';
import { Voucher } from 'src/app/modules/buyer-profile/models/user-vouchers/user-vouchers';

@Component({
  selector: 'used-voucher',
  templateUrl: './used-voucher.component.html',
  styleUrls: ['./used-voucher.component.scss']
})
export class UsedVoucherComponent implements OnInit {


  // Inputs 
  @Input() voucher: Voucher = {};

  constructor() { }

  ngOnInit(): void {
  }

}
