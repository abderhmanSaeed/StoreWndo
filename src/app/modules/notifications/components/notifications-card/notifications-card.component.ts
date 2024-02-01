import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import { NotificationType } from '../../enums/notifications-view';

@Component({
  selector: 'app-notifications-card',
  templateUrl: './notifications-card.component.html',
  styleUrls: ['./notifications-card.component.scss']
})
export class NotificationsCardComponent implements OnInit {

  NotificationType = NotificationType;

  // inputs 
  @Input() data: any = {};

  // Output
  @Output() deleteNotification = new EventEmitter();

  // props 
  imgPlaceholder: string = 'assets/media/users/user-placeholder.png';

  constructor() { }

  ngOnInit(): void {
  }
  
  onImgError(event: any){
    event.target.src = this.imgPlaceholder;
  }

}
