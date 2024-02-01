import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ShippingPaymentComponent } from './components/shipping-payment/shipping-payment.component';
import { ConfirmOrderGuard } from './guards/confirm-order/confirm-order.guard';

const routes: Routes = [
  {
    path: "",
    component: CartComponent,
    children: [
      {
        path: 'check-out',
        component: CheckOutComponent
      },
      {
        path: 'shipping-payment',
        component: ShippingPaymentComponent
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        // canActivate: [ConfirmOrderGuard]
      },
      {
        path: '',
        redirectTo: 'check-out'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
