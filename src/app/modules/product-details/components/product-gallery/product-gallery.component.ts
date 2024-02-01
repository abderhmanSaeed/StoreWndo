import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/shared/models/product/video/video';
import { Image } from 'src/app/shared/models/product/image/image';
import { environment } from 'src/environments/environment';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {

  // Inputs producData
  @Input() set videos(videos : Video[]) {
    this.mainVideo = videos.filter( video => video.isMain)[0];
    this.getMedia();
  };

  // Inputs producData
  @Input() set images(images :Image[]) {
    this.imagesList = images;
    this.getMedia();
  };


  // props 
  media: any[] = [];
  imagesList: Image[] = [];
  mainVideo!: Video
  faVideo = faVideo;
  selectedMedia!: any;
  mainRippleColor: string = environment.mainRippleColor

  constructor() { }

  ngOnInit(): void {

   

    console.log(this.media, 'this.mediathis.mediathis.media');
    
  }


  getMedia(): void {
    this.media = [
      this.mainVideo,
      ...this.imagesList,
    ];

    
    console.log(this.media, 'this.media');
    
    this.selectedMedia = this.mainVideo;
  }

  
  onImgError(event: any){
    event.target.src = 'assets/media/logos/smile.svg'
  }

}