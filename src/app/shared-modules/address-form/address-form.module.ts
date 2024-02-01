import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from './address-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddressFormComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddressFormComponent,
  ]
})
export class AddressFormModule { }
