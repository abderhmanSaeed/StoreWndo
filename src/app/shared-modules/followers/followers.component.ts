import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { FollowersActions } from './enums/followers-actions';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {


  // Props 
  follwers: any[] = [];
  selectedUserId: string = '';
  subscription: Subscription = new Subscription();

  // Booleans 
  showReportForm: boolean = false;

  constructor(
    private _HttpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: HResponse,
    private _DialogRef: MatDialogRef<FollowersComponent>,
  ) { }

  ngOnInit(): void {
    this.setDataToProps();
  }


  setDataToProps(): void {
    this.follwers = this.data?.responseData.items;   
  }


  ngOnDestroy(): void {
     this.subscription.unsubscribe()
   }

  

  onAction(action: any, item: any ,index: number): void {
    switch (action.key) {
   
      case FollowersActions.Mute:
        this.muteUnMuteFollowingUsers(item?.userId);
      break;

      case FollowersActions.Report:
        this.selectedUserId = item?.userId;
        this.showReportForm = true;
      break;
    
      default:
        break;
    }
  }

  muteUnMuteFollowingUsers(userId: string): void {
    const query = {
      hideLoader: true
    }
    const payload = {
      userId,
    }
    this.subscription.add(
      this._HttpService.postByParams(APIs.muteUnMuteFollowingUsers, query, payload)
      .subscribe()
    );
  }


  

  onReported(): void {
    this._DialogRef.close();
  }

}
