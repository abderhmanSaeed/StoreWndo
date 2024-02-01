import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FollowersActions } from '../../enums/followers-actions';

@Component({
  selector: 'follwer-card',
  templateUrl: './follwer-card.component.html',
  styleUrls: ['./follwer-card.component.scss']
})
export class FollwerCardComponent implements OnInit {

  // inputs 
  @Input() data: any = {};

  
  // Outputs
  @Output() onAction: EventEmitter<any> = new EventEmitter();


  // props 
  actions: any[] = [];
  faEllipsisVertical = faEllipsisVertical;
  imgPlaceholder: string = 'assets/media/users/user-placeholder.png';


  constructor(
    private _DialogRef: MatDialogRef<FollwerCardComponent>,
  ) { }

  ngOnInit(): void {
    this.prepareOrderActions();
  }
  
  onImgError(event: any){
    event.target.src = this.imgPlaceholder;
  }


  onActionClick(action: any): void {
    console.log('action', action);

    switch (action.key) {
      case FollowersActions.Mute:
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
        label: this.data?.isMute ? 'un-mute' : 'actions.mute',
        key: FollowersActions.Mute
      },
      {
        label: 'actions.report',
        key: FollowersActions.Report
      },
    ]
  }


  
  closeDialog(): void {
    this._DialogRef.close();
  }

}