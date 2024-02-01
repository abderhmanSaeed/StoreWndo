import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderConfirmedComponent implements OnInit {

  constructor(
    private _Router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _OrderConfirmedComponentDialogRef: MatDialogRef<OrderConfirmedComponent>,
  ) { }

  ngOnInit(): void {

  }


  trackOrder(): void {
    this._Router.navigate(['/buyer-profile/orders']).then( _ => {
      this._OrderConfirmedComponentDialogRef.close();
    } )
  }

}
