import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'play-btn',
  templateUrl: './play-btn.component.html',
  styleUrls: ['./play-btn.component.scss']
})
export class PlayBtnComponent implements OnInit {
  
  faPlay = faPlay;

  constructor() { }

  ngOnInit(): void {
  }

}
