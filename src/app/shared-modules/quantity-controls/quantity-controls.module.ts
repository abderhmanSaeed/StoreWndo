import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityControlsComponent } from './quantity-controls.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    QuantityControlsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    QuantityControlsComponent
  ]
})
export class QuantityControlsModule { }
