import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './pages/guest/guest.component';
import { SellerProductsComponent } from './pages/seller-products/seller-products.component';
import { SellerProfileComponent } from './seller-profile.component';

const routes: Routes = [
  {
    path: '',
    component: SellerProfileComponent,
    children: [
      {
        path: '',
        component: GuestComponent,
        children: [
          {
            path: 'products',
            component: SellerProductsComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'products'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerProfileRoutingModule { }
