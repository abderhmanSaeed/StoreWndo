import { FlashSale } from 'src/app/modules/explore/modules/shorts/models/explore-product/explore-product';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashSalePageComponent } from './flash-sale-page.component';


const routes: Routes = [
  {
    path: '',
    component: FlashSalePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashSalePageRoutingModule { }
