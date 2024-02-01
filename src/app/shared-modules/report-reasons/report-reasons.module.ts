import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportReasonsComponent } from './report-reasons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ReportReasonsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
  ],
  exports: [
    ReportReasonsComponent
  ]
})
export class ReportReasonsModule { }
