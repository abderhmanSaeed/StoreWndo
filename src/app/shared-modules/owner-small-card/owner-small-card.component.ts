import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'owner-small-card',
  templateUrl: './owner-small-card.component.html',
  styleUrls: ['./owner-small-card.component.scss']
})
export class OwnerSmallCardComponent implements OnInit {

  @Input() ownerId: any;
  @Input() txtPanelClass: any;
  @Input() imgBoxPanelClass: any;
  @Input() name: string | undefined;
  @Input() imagePath: string | undefined;
  

  constructor() { }

  ngOnInit(): void {
  }

  onImgError(event: any){
    event.target.src = 'assets/media/users/user-placeholder.png'
  }
}
