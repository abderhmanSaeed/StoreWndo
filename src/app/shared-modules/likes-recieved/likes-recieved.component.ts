import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Component({
  selector: 'app-likes-recieved',
  templateUrl: './likes-recieved.component.html',
  styleUrls: ['./likes-recieved.component.scss']
})
export class LikesRecievedComponent implements OnInit {


  // Props 
  likesComments: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: HResponse,
  ) { }

  ngOnInit(): void {
    this.setDataToProps();
  }

  setDataToProps(): void {
    this.likesComments = this.data?.responseData.items;
    console.log(this.likesComments, 'this.likesComments');
    // this.likesComments = [

    // ]
    
  }

}
