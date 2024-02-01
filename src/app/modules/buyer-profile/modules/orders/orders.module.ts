import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderStatusCardComponent } from './components/order-status-card/order-status-card.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { ImgPlaceholderModule } from 'src/app/shared-modules/img-placeholder/img-placeholder.module';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OwnerSmallCardModule } from 'src/app/shared-modules/owner-small-card/owner-small-card.module';
import { CancelationDialogComponent } from './components/cancelation-dialog/cancelation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { TrackOrderItemComponent } from './components/track-order-item/track-order-item.component';
import { TrackOrderProgressComponent } from './components/track-order-progress/track-order-progress.component';
import { RefundDialogComponent } from './components/refund-dialog/refund-dialog.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { createTranslateBuyerProfileLoader } from 'src/app/core/config/translate-loaders';
import { AddRateDialogComponent } from './components/add-rate-dialog/add-rate-dialog.component';
import { BarRatingModule } from "ngx-bar-rating";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderItemComponent,
    OrdersListComponent,
    OrderSummaryComponent,
    OrderDetailsComponent,
    OrderStatusCardComponent,
    CancelationDialogComponent,
    TrackOrderComponent,
    TrackOrderItemComponent,
    TrackOrderProgressComponent,
    RefundDialogComponent,
    AddRateDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BarRatingModule,
    MatDialogModule,
    ReactiveFormsModule,
    OwnerSmallCardModule,
    OrdersRoutingModule,
    ImgPlaceholderModule,
    TranslateModule.forChild({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateBuyerProfileLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ]
})
export class OrdersModule { }
