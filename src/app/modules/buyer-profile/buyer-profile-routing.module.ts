import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerProfileComponent } from './buyer-profile.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { WishListComponent } from './components/wish-list/wish-list.component';










const routes: Routes = [
  {
    path: '',
    component: BuyerProfileComponent,
    children: [
      {
        path: 'profile',
        component: ProfileTabComponent
      },
      {
        path: 'orders',
        loadChildren: () =>
        import(
          './modules/orders/orders.module'
        ).then((m) => m.OrdersModule),
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'addresses',
        component: AddressesComponent
      },
      {
        path: 'wish-list',
        component: WishListComponent
      },
      {
        path: 'payment-methods',
        component: PaymentMethodsComponent
      },
      {
        path: 'setting',
        component: SettingsComponent
      },
      {
        path: '',
        redirectTo: 'profile'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerProfileRoutingModule { }
