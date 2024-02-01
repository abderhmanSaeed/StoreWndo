import { Component, OnInit } from '@angular/core';
import { socilList } from '../../footer-links';


@Component({
  selector: 'social-list',
  templateUrl: './social-list.component.html',
  styleUrls: ['./social-list.component.scss']
})
export class SocialListComponent implements OnInit {

  // props 
  socilLinks: any[] = socilList;

  constructor() { }

  ngOnInit(): void {
  }

}
