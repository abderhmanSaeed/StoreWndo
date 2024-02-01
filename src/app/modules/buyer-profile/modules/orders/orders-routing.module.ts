import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsResolver } from './guards/order-details/order-details.resolver';
import { TrackOrderResolver } from './guards/track-order/track-order.resolver';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: OrdersListComponent
      },
      {
        path: ':orderNumber',
        component: OrderDetailsComponent,
        resolve: { orderDetails: OrderDetailsResolver }
      },
      {
        path: 'track-order/:orderNumber',
        component: TrackOrderComponent,
        resolve: { trackOrder: TrackOrderResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
