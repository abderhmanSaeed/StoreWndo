import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { ProductDetailsResolver } from '../modules/product-details/guards/guards/product-details/product-details.resolver';
import { SellerProfileResolver } from '../modules/seller-profile/guards/seller-profile/seller-profile.resolver';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'explore',
        loadChildren: () =>
        import(
          '../modules/explore/explore.module'
        ).then((m) => m.ExploreModule),
      },
      {
        path: 'cart',
        canActivate: [AuthGuard],
        loadChildren: () =>
        import(
          '../modules/cart/cart.module'
        ).then((m) => m.CartModule),
      },
      {
        path: 'notifications',
        canActivate: [AuthGuard],
        loadChildren: () =>
        import(
          '../modules/notifications/notifications.module'
        ).then((m) => m.NotificationsModule),
      },
      {
        path: 'buyer-profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
        import(
          '../modules/buyer-profile/buyer-profile.module'
        ).then((m) => m.BuyerProfileModule),
      },
      {
        path: 'seller/:id',
        loadChildren: () =>
        import(
          '../modules/seller-profile/seller-profile.module'
        ).then((m) => m.SellerProfileModule),
        resolve: { sellerProfile: SellerProfileResolver }
      },
      {
        path: 'search-results',
        loadChildren: () =>
        import(
          '../modules/search-result/search-result.module'
        ).then((m) => m.SearchResultModule),
      },
      {
        path: 'product/:id',
        loadChildren: () =>
        import(
          '../modules/product-details/product-details.module'
        ).then((m) => m.ProductDetailsModule),
        resolve: { productData : ProductDetailsResolver}
      },
      {
        path: 'flash-sale',
        canActivate: [AuthGuard],
        loadChildren: () =>
        import(
          '../modules/flash-sale-page/flash-sale-page.module'
        ).then((m) => m.FlashSalepageModule),

      },
      {
        path: '',
        redirectTo: 'explore'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
