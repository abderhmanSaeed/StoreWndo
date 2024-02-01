import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'like-recieved-card',
  templateUrl: './like-recieved-card.component.html',
  styleUrls: ['./like-recieved-card.component.scss']
})
export class LikeRecievedCardComponent implements OnInit {

  // inputs 
  @Input() data: any = {}


  // props 
  imgPlaceholder: string = 'assets/media/users/user-placeholder.png';

  orderActions: any[] = [
    {
      label: 'actions.block',
    },
    {
      label: 'actions.mute',
    },
    {
      label: 'actions.report',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }
  
  onImgError(event: any){
    event.target.src = this.imgPlaceholder
  }
}