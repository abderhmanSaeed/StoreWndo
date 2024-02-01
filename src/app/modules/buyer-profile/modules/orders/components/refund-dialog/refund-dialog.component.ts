import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { RefundReasons } from 'src/app/shared/enums/refund-reasons/refund-reasons';
import { refundRasons } from 'src/app/shared/lookups/refund-order-reasons';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { RefundReason } from 'src/app/shared/models/refund-reason/refund-reason';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { RefundTypes } from '../../enums/refund-types';
import { CancelationDialogComponent } from '../cancelation-dialog/cancelation-dialog.component';

@Component({
  selector: 'app-refund-dialog',
  templateUrl: './refund-dialog.component.html',
  styleUrls: ['./refund-dialog.component.scss']
})
export class RefundDialogComponent implements OnInit {


  // props 
  selectedReason: RefundReason | null = null
  refundReasonsEnum = RefundReasons;
  subscription: Subscription = new Subscription();
  refundRasons: RefundReason[] = refundRasons;

  constructor(
    private _HttpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _MessagesService: MessagesService,
    private _DialogRef: MatDialogRef<CancelationDialogComponent>,
  ) { }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onReasonChange(item: any): void {
    this.selectedReason = item;
  }



  submit(): void {

    switch (this.data.type) {
      case RefundTypes.Order:
        this.refundOrder();
        break;

      case RefundTypes.OrderItem:
        this.refundOrderItem();
      break;
    
      default:

        break;
    }

  }


  refundOrder(): void {

    const payload = {
      orderNumber: this.data.orderNumber,
      refundReason: this.selectedReason?.id
    }

    this.subscription.add(
      this._HttpService.post(APIs.refundOrder, payload).subscribe((res: HResponse ) => {
        this._DialogRef.close(res);
        if (res.isSuccess) {
          this._MessagesService.openSuccessSnackBar('Your request has been submited successfully', 3000)
        }
      })
    );
  }


  refundOrderItem(): void {

    const payload = {
      orderItemNumber: this.data.orderItemNumber,
      refundReason: this.selectedReason?.id
    }

    this.subscription.add(
      this._HttpService.post(APIs.refundOrderItem, payload).subscribe((res: HResponse ) => {
        this._DialogRef.close(res);
        if (res.isSuccess) {
          this._MessagesService.openSuccessSnackBar('Your request has been submited successfully', 3000)
        }
      })
    );
  }


}