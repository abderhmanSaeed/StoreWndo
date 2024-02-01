import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-videos',
  templateUrl: './product-videos.component.html',
  styleUrls: ['./product-videos.component.scss']
})
export class ProductVideosComponent implements OnInit {


    
  // Inputs 
  @Input() videos: any = {};
  @Input() seller: any = {};

  constructor() { }

  ngOnInit(): void {
    this.moreProducts(this.videos);
  }


  moreProducts(videos: any[]): void {
    this.videos = videos?.filter( video =>  !video?.isMain)
  }

}
