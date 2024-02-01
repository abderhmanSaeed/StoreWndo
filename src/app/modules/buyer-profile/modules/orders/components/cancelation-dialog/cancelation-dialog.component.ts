import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CancelationReason } from 'src/app/shared/enums/cancellation-reason/cancelation-reason';
import { cancelOrderRasons } from 'src/app/shared/lookups/cancel-order-reasons';
import { CancelReason } from 'src/app/shared/models/cancel-reason/cancel-reason';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { CancelationTypes } from '../../enums/cancelation-types';

@Component({
  selector: 'app-cancelation-dialog',
  templateUrl: './cancelation-dialog.component.html',
  styleUrls: ['./cancelation-dialog.component.scss']
})
export class CancelationDialogComponent implements OnInit, OnDestroy {


  // props 
  selectedReason: CancelReason | null = null
  cancelOrderRasonsEnum = CancelationReason;
  subscription: Subscription = new Subscription();
  cancelOrderRasons: CancelReason[] = cancelOrderRasons;

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
      case CancelationTypes.Order:
        this.cancelOrder();
        break;

      case CancelationTypes.OrderItem:
        this.cancelOrderItem();
      break;
    
      default:

        break;
    }

  }


  cancelOrder(): void {

    const payload = {
      orderNumber: this.data.orderNumber,
      cancellationReason: this.selectedReason?.id
    }

    this.subscription.add(
      this._HttpService.post(APIs.cancelOrder, payload).subscribe((res: HResponse ) => {
        this._DialogRef.close(res);
      })
    );
  }


  cancelOrderItem(): void {

    const payload = {
      orderItemNumber: this.data.orderItemNumber,
      cancellationReason: this.selectedReason?.id
    }

    this.subscription.add(
      this._HttpService.post(APIs.cancelOrderItem, payload).subscribe((res: HResponse ) => {
        this._DialogRef.close(res);
        if (res.isSuccess) {
          this._MessagesService.openSuccessSnackBar('The item has been canceled successfully', 3000)
        }
      })
    );
  }


}
