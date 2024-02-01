import { Component, OnInit } from '@angular/core';
import { App } from 'src/app/layout/models/app/app';
import { appsList } from '../../../footer/footer-data/footer-links';

@Component({
  selector: 'app-sell-dialog',
  templateUrl: './sell-dialog.component.html',
  styleUrls: ['./sell-dialog.component.scss']
})
export class SellDialogComponent implements OnInit {

  // props 
  apps: App[] = appsList;


  constructor() { }

  ngOnInit(): void {
  }

}
