import { Injectable } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Injectable({
  providedIn: 'root'
})
export class AukVideogularService {

  private videos: VgApiService[] = [];

  addVideo(video: VgApiService) {
    this.videos.push(video);
  }

  pauseAllVideos() {
    this.videos.forEach(video => video.pause());
  }

}
