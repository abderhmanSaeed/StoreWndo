import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FollowingsActions } from '../../enums/followings-actions';
import { FollowingComponent } from '../../following.component';

@Component({
  selector: 'Follwing-card',
  templateUrl: './Follwing-card.component.html',
  styleUrls: ['./Follwing-card.component.scss']
})
export class FollwingCardComponent implements OnInit {

 
  // inputs 
  @Input() data: any = {};


  // Outputs
  @Output() onAction: EventEmitter<any> = new EventEmitter();



  // props 
  actions: any[] = [];
  imgPlaceholder: string = 'assets/media/users/user-placeholder.png';

  constructor(
    private _DialogRef: MatDialogRef<FollowingComponent>,
  ) { }

  ngOnInit(): void {    
    this.prepareOrderActions();
  }
  
  onImgError(event: any){
    event.target.src = this.imgPlaceholder
  }


    onActionClick(action: any): void {
      switch (action.key) {
        case FollowingsActions.Mute:
          this.toggleMute();
          break;
      
        default:
          break;
      }

      this.onAction.emit(action);
      this.prepareOrderActions();
    }


  toggleMute(): void {
    this.data.isMute = !this.data.isMute
  }


  prepareOrderActions(): void {
    this.actions = [
      {
        label: 'actions.unfollow',
        key: FollowingsActions.Unfollow
      },
      {
        label: this.data?.isMute ? 'un-mute' : 'actions.mute',
        key: FollowingsActions.Mute
      },
      {
        label: 'actions.report',
        key: FollowingsActions.Report
      },
    ]
  }


  closeDialog(): void {
    this._DialogRef.close();
  }

}
