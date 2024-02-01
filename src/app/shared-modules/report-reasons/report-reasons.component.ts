import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ReportReasons } from 'src/app/shared/enums/report-reason/report-reason';
import { ReportRasonsList } from 'src/app/shared/lookups/report-reasons';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { ReportReason } from 'src/app/shared/models/report-reason/report-reason';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

@Component({
  selector: 'report-reasons',
  templateUrl: './report-reasons.component.html',
  styleUrls: ['./report-reasons.component.scss']
})
export class ReportReasonsComponent implements OnInit {

// Inputs
@Input() userId: string = '';


// Outputs
@Output() reported: EventEmitter<any> = new EventEmitter();

 // props 
 reportRasonsEnum = ReportReasons;
 subscription: Subscription = new Subscription();
 reportRasons: ReportReason[] = ReportRasonsList;
 selectedReason: ReportReason | null = ReportRasonsList[0];

 constructor(
   private _HttpService: HttpService,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private _MessagesService: MessagesService,
   private _TranslateService: TranslateService,
   private _DialogRef: MatDialogRef<ReportReasonsComponent>,
   
 ) { }

 ngOnInit(): void {
 }


 ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }


 onReasonChange(item: any): void {
   this.selectedReason = item;
 }



 submit(): void {
  console.log(this.userId, 'this.userId');
  
  this.report(this.userId);
 }


 report(userId: string): void {

   const payload = {
    userId,
    reportReason: this.selectedReason?.id
   }

   this.subscription.add(
     this._HttpService.post(APIs.reportForUser, payload).subscribe((res: HResponse ) => {
      this.reported.emit();
       this._DialogRef.close(res);
       this._MessagesService.openSuccessSnackBar(
        this._TranslateService.instant('meassges.submission-sent')
       );
     })
  );

 }


}
