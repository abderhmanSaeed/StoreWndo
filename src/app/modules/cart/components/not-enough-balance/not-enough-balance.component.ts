import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-enough-balance',
  templateUrl: './not-enough-balance.component.html',
  styleUrls: ['./not-enough-balance.component.scss']
})
export class NotEnoughBalanceComponent implements OnInit {

  constructor(
    private _Router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _MatDialogRef: MatDialogRef<NotEnoughBalanceComponent>,
  ) { }

  ngOnInit(): void {
  }


  yes(): void {
    this._MatDialogRef.close(true)
  }

}
