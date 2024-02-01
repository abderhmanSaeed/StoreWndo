import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { paymentMethods } from 'src/app/shared/lookups/payment-methods';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { PaymentMethod } from 'src/app/shared/models/payment-method/payment-method';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { CancelationDialogComponent } from '../../components/cancelation-dialog/cancelation-dialog.component';
import { CancelationTypes } from '../../enums/cancelation-types';
import { OrderStatsObject } from '../../enums/order-stats-object';
import { MatDialog } from '@angular/material/dialog';
import { RefundDialogComponent } from '../../components/refund-dialog/refund-dialog.component';
import { PaymentMethods } from 'src/app/shared/enums/payment-methods/payment-methods';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {


  order: any = {};
  paymentMethodsEnum = PaymentMethods;
  orderStatsObject =  OrderStatsObject;
  paymentMethods: PaymentMethod[] = paymentMethods;
  subscription: Subscription = new Subscription();

  constructor(
    private _MatDialog: MatDialog,
    private _ActivatedRoute: ActivatedRoute,
    private _BreadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.getOrder();
    this.setBreadcrumb();
  }

  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
        name: `Order No. ${this.order?.orderNumber} Details`,
        active: true
      }
    ])
  }



  getOrder(): void {
    this.order = this._ActivatedRoute.snapshot.data['orderDetails']?.responseData; 
  }


  cancelAll(orderNumber: number): void {
    this.openReasonsForCancelationDialog(orderNumber)
  }


  refundAll(orderNumber: number): void {
    this.openReasonsForRefundDialog(orderNumber)
  }

  openReasonsForCancelationDialog(orderNumber: number): void {
    const dialogRef = this._MatDialog.open(CancelationDialogComponent, {
      width: '750px',
      panelClass: 'custom-dialog-container',
      data: {
        type: CancelationTypes.Order,
        orderNumber
      }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this.order.orderState = this.orderStatsObject.cancelled.key;   
        }
      })
    )
  }


  openReasonsForRefundDialog(orderNumber: number): void {
    const dialogRef = this._MatDialog.open(RefundDialogComponent, {
      width: '750px',
      panelClass: 'custom-dialog-container',
      data: {
        type: CancelationTypes.Order,
        orderNumber
      }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res.isSuccess) {
        }
      })
    )
  }
  
}
