import { Component, Input, OnInit } from '@angular/core';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { VideoPopupComponent } from 'src/app/shared-modules/video-popup/video-popup.component';
import { Seller } from 'src/app/modules/explore/modules/shorts/models/explore-product/explore-product';

@Component({
  selector: 'product-video-card',
  templateUrl: './product-video-card.component.html',
  styleUrls: ['./product-video-card.component.scss']
})
export class ProductVideoCardComponent implements OnInit {

  // inputs props 
  @Input() video: any = {};
  @Input() seller: Seller = {};

  // props
  faExpand = faExpand;

  constructor(
    private _MatDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.video, 'videovideovideovideovideovideovideovideovideovideo');
    
  }

  onImgError(event: any){
    event.target.src = 'assets/media/logos/smile.svg'
  }

  openVideoPopup(): void {
    this._MatDialog.open(VideoPopupComponent, {
      width: '700px',
      maxWidth: '100%',
      panelClass: 'light-dialog',
      data: {
        video: this.video
      }
    });
  }
}
