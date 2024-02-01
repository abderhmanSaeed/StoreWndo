import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsHomeComponent } from './pages/product-details-home/product-details-home.component';
import { ProductReviewsComponent } from './pages/product-reviews/product-reviews.component';
import { ProductDetailsComponent } from './product-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent,
    children: [
      {
        path: '',
        component: ProductDetailsHomeComponent
      },
      {
        path: 'reviews',
        component: ProductReviewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailsRoutingModule { }
