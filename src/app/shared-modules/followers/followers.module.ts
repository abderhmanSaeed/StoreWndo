import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowersComponent } from './followers.component';
import { FollwerCardComponent } from './components/follwer-card/follwer-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { FollowModule } from '../follow/follow.module';
import { ReportReasonsModule } from '../report-reasons/report-reasons.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FollowersComponent,
    FollwerCardComponent
  ],
  imports: [
    CommonModule,
    FollowModule,
    RouterModule,
    SharedModule,
    MatDialogModule,
    ReportReasonsModule
  ],
  exports: [
    FollowersComponent
  ]
})
export class FollowersModule { }
