import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFeaturesComponent } from './product-features.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuantityControlsModule } from '../quantity-controls/quantity-controls.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductFeaturesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatDialogModule,
    QuantityControlsModule
  ],
  exports: [
    ProductFeaturesComponent
  ]
})
export class ProductFeaturesModule { }
