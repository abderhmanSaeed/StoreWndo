import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowingComponent } from './following.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { FollwingCardComponent } from './components/follwer-card/follwing-card.component';
import { ReportReasonsModule } from '../report-reasons/report-reasons.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FollowingComponent,
    FollwingCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatDialogModule,
    ReportReasonsModule
  ],
  exports: [
    FollowingComponent
  ]
})
export class FollowingModule { }
