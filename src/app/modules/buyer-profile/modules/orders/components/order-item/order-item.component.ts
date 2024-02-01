import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faTrashCan, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { Product } from 'src/app/shared/models/product/product';
import { CancelationTypes } from '../../enums/cancelation-types';
import { OrderItemStatsObject } from '../../enums/order-item-stats.object';
import { CancelationDialogComponent } from '../cancelation-dialog/cancelation-dialog.component';
import { RefundDialogComponent } from '../refund-dialog/refund-dialog.component';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AddRateDialogComponent } from '../add-rate-dialog/add-rate-dialog.component';
import { Constant } from 'src/app/core/config/constant';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { Languages } from 'src/app/shared/enums/languages/languages';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  // inputs props 
  @Input() item!: Product;

  // props
  faTrashCan = faTrashCan;
  faStar: IconProp = faStar;
  languagesEnum = Languages;
  lang: Languages = Languages.AR;
  faEllipsisVertical = faEllipsisVertical;
  orderItemStatsObject =  OrderItemStatsObject;
  subscription: Subscription = new Subscription();

  constructor(
    private _MatDialog: MatDialog,
    private _BrowserService: BrowserService,
  ) { }


  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  cancelOrderItem(orderItemNumber: number | undefined): void {
    this.openReasonsForCancelationDialog(orderItemNumber)
  }


  openReasonsForCancelationDialog(orderItemNumber: number | undefined): void {
    const dialogRef = this._MatDialog.open(CancelationDialogComponent, {
      width: '750px',
      panelClass: 'custom-dialog-container',
      data: {
        type: CancelationTypes.OrderItem,
        orderItemNumber
      }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this.item.orderItemState = this.orderItemStatsObject.cancelled.key;
        }
      })
    )
  }



  openAddRateDialog(): void {
    
    const dialogRef = this._MatDialog.open(AddRateDialogComponent, {
      width: '750px',
      panelClass: 'custom-dialog-container',
      data: {
        productId: this.item.productId
      },
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: any) => {
        if (res.isSuccess) {
          this.item.rate = res?.rate
          this.item.isRated = true;
        }
      })
    )
  }

  
  refundItem(orderItemNumber: number | undefined): void {
    this.openReasonsForRefundDialog(orderItemNumber)
  }


  openReasonsForRefundDialog(orderItemNumber: number | undefined): void {
    const dialogRef = this._MatDialog.open(RefundDialogComponent, {
      width: '750px',
      panelClass: 'custom-dialog-container',
      data: {
        type: CancelationTypes.OrderItem,
        orderItemNumber
      }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this.item.orderItemState = this.orderItemStatsObject.refund.key;
        }
      })
    )
  }

}
