import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb/breadcrumb.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { APIs } from 'src/app/core/config/apis';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { OrderStatsList } from 'src/app/shared/lookups/order-stats';
import { OrderStatsObject } from '../../enums/order-stats-object';
import { OrderStats } from 'src/app/shared/enums/order-stats/order-stats';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderActions } from '../../enums/order-actions';
import { MatDialog } from '@angular/material/dialog';
import { CancelationDialogComponent } from '../../components/cancelation-dialog/cancelation-dialog.component';
import { CancelationTypes } from '../../enums/cancelation-types';
import { RefundDialogComponent } from '../../components/refund-dialog/refund-dialog.component';
import { Constant } from 'src/app/core/config/constant';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {



  // props 
  faEllipsisVertical = faEllipsisVertical;
  orderActions: any[] = [
    {
      name: 'my-orders.view-details',
      key: OrderActions.View,
      canShowIn: [] // to display the action only in specific statuses for order.
    },
    {
      name: 'my-orders.tracking-order',
      key: OrderActions.Track,
      canShowIn: [] // to display the action only in specific statuses for order.
    },
    {
      name: 'my-orders.cancel-order',
      key: OrderActions.Cancel,
      canShowIn: [
        OrderStats.OrderPlaced
      ] // to display the action only in specific statuses for order.
    },
    {
      name: 'my-orders.refund',
      key: OrderActions.Refund,
      canShowIn: [
        OrderStats.Delivered
      ] // to display the action only in specific statuses for order.
    },
  ]
  
  orders: any[] = [];
  sellers: any[] = [];
  fetchCriteria: any = {};
  languagesEnum = Languages;
  orderStatistics: any[] = [];
  totalOedersCount: number = 0;
  lang: Languages = Languages.AR;
  orderStatsObject =  OrderStatsObject;
  orderStatuses: any[] = OrderStatsList; 
  subscription: Subscription = new Subscription();

  constructor(
    private _Router: Router,
    private _MatDialog: MatDialog,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    private _ActivatedRoute: ActivatedRoute,
    private _BreadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.setBreadcrumb();
    this.getAllData();
    this.onQueryParamsChange();
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onQueryParamsChange(): void {
    this.subscription.add(
      this._ActivatedRoute.queryParams.subscribe((queryParams:any) => {
        queryParams['order-status'] ? this.fetchCriteria.orderStatus = queryParams['order-status'] : null;
        queryParams['seller-id'] ? this.fetchCriteria.sellerId = queryParams['seller-id'] : null;
        this.getOrders(this.fetchCriteria);
      })
    )
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
      }
    ])
  }


 
  getAllData(): void {
    this.getOrderStatistics();
    this.getSellers();
  }


  getOrders(payload?: any): void {
    this.subscription.add(
      this._HttpService.post(APIs.ordersHistory, payload).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.orders = res.responseData?.items;
          this.totalOedersCount = res?.responseData?.totalCount
          console.log('res', res);
        }
      })
    );
  }  


  getOrderStatistics(): void {
    this.subscription.add(
      this._HttpService.get(APIs.orderStatistics).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.orderStatistics = res.responseData;
          console.log('orderStatistics', this.orderStatistics);
          this.addProductCountToOrderStatusesArray(this.orderStatistics);
        }
      })
    );
  }  


  addProductCountToOrderStatusesArray(orderStatistics: any): void {
    this.orderStatuses.forEach( (item:any) => {
      switch (item?.key) {
        case OrderStats.Canceled:
          item.prodCount = orderStatistics?.cancelled
          break;

        case OrderStats.Delivered:
          item.prodCount = orderStatistics?.delivered
          break;

        case OrderStats.OrderPlaced:
          item.prodCount = orderStatistics?.placed
          break;

        case OrderStats.Refund:
          item.prodCount = orderStatistics?.refund
          break;

        case OrderStats.Returned:
          item.prodCount = orderStatistics?.returned
          break;
      
        case OrderStats.Shipping:
          item.prodCount = orderStatistics?.shipped
          break;

        default:
          break;
      }
    })
  }


  getSellers(): void {
    this.subscription.add(
      this._HttpService.get(APIs.getSellers).subscribe((res: HResponse ) => {
        if (res.isSuccess) {
          this.sellers = res.responseData?.items;
          console.log('this.sellers', this.sellers);
        }
      })
    );
  }  


  onSellerChange(sellerId: string): void {
    this.fetchCriteria.sellerId = sellerId;
    this._Router.navigate(  
    [],
    {
      relativeTo: this._ActivatedRoute,
      queryParams: { 'seller-id': sellerId },
      queryParamsHandling: 'merge'
    });
  }



  onOrderAction(action: any, orderNumber: any) {
    console.log('action', action);
    switch (action?.key) {
      case OrderActions.View:
          this.viewOrder(orderNumber)
        break;

      case OrderActions.Track:
        this.trackOrder(orderNumber)
        break;

      case OrderActions.Cancel:
          this.openReasonsForCancelationDialog(orderNumber)
        break;

      case OrderActions.Refund:
        this.openReasonsForRefundDialog(orderNumber)
        break;
    
      default:
        break;
    }
  }


  viewOrder(orderNumber: any): void {
    this._Router.navigate((['/buyer-profile/orders', orderNumber]))
  }

  
  trackOrder(orderNumber: any): void {
    this._Router.navigate((['/buyer-profile/orders/track-order', orderNumber]))
  }



  openReasonsForCancelationDialog(orderNumber: number): void {
    const dialogRef = this._MatDialog.open(CancelationDialogComponent, {
        width: '750px',
        panelClass: 'custom-dialog-container',
        data: {
          type: CancelationTypes.Order,
          orderNumber
        },
        direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
      });
  
      this.subscription.add(
        dialogRef.afterClosed().subscribe( (res: HResponse) => {
          if (res.isSuccess) {
          }
        })
      )
  }


  openReasonsForRefundDialog(orderItemNumber: number | undefined): void {
    const dialogRef = this._MatDialog.open(RefundDialogComponent, {
      width: '750px',
      panelClass: 'custom-dialog-container',
      data: {
        type: CancelationTypes.Order,
        orderItemNumber
      },
      direction: this.lang ==  this.languagesEnum.EN ? 'ltr' : 'rtl',
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe( (res: HResponse) => {
        if (res.isSuccess) {
        }
      })
    )
  }


  onImgError(event: any){
    event.target.src = 'assets/media/logos/smile.svg'
  }

}
