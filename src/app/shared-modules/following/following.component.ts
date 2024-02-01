import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { FollowingsActions } from './enums/followings-actions';

@Component({
  selector: 'app-Following',
  templateUrl: './Following.component.html',
  styleUrls: ['./Following.component.scss']
})
export class FollowingComponent implements OnInit, OnDestroy {


  // Props 
  follwinges: any[] = [];
  selectedUserId: string = '';
  subscription: Subscription = new Subscription();


  // Booleans 
  showReportForm: boolean = false;

  constructor(
    private _HttpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: HResponse,
    private _DialogRef: MatDialogRef<FollowingComponent>,
  ) { }

  ngOnInit(): void {
    this.setDataToProps();
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }



  setDataToProps(): void {
    this.follwinges = this.data?.responseData.items;
  }


  onAction(action: any, item: any ,index: number): void {
    switch (action.key) {
   
      case FollowingsActions.Mute:
        this.muteUnMuteFollowingUsers(item?.userId);
      break;

      case FollowingsActions.Unfollow:
        this.followUnfollowHandler(item?.userId, index);
      break;

      case FollowingsActions.Report:
        console.log(item, 'item');
        this.selectedUserId = item?.userId;
        console.log(this.selectedUserId, 'this.selectedUserId');
        
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


  followUnfollowHandler(userId: string, index: number): void {
    this.addUpdateFollow(userId);
    this.follwinges.splice(index, 1); // 2nd parameter means remove one item only
  }

  addUpdateFollow(userId: string): void {
    const query = {
      hideLoader: true
    }
    const payload = {
      userId
    }
    this.subscription.add(this._HttpService.postByParams(APIs.addUpdateFollow, query, payload).subscribe());
  }



  onReported(): void {
    this._DialogRef.close();
  }

}
