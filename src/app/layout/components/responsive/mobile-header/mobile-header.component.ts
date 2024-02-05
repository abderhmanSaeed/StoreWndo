import { Component, OnInit } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {
  faTimesCircle = faTimesCircle;
  draweState: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  showFiller = false;
}
