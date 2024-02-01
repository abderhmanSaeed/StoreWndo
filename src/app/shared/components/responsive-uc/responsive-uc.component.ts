import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { appsList } from 'src/app/layout/components/footer/footer-data/footer-links';
import { App } from 'src/app/layout/models/app/app';

@Component({
  selector: 'app-responsive-uc',
  templateUrl: './responsive-uc.component.html',
  styleUrls: ['./responsive-uc.component.scss']
})
export class ResponsiveUCComponent implements OnInit {


  // props 
  apps: App[] = appsList;

  constructor(
    private _DialogRef: MatDialogRef<ResponsiveUCComponent>,
  ) { }

  ngOnInit(): void {
  }


  close(): void {
    this._DialogRef.close();
  }
}
