import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title: any = 'Title';
  @Input() buttonTxt: any = 'ok';
  @Input() message: any = 'Bla Bla Bla Bla Bla';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ConfirmationDialogComponent: MatDialogRef<ConfirmationDialogComponent>,
  ) { }


  ngOnInit(): void {
    this.title = this.data?.title;
    this.message = this.data?.message;
    this.buttonTxt = this.data?.buttonTxt;
  }

  
  confirm(): void {
    this._ConfirmationDialogComponent.close(this.data?.confirmFor)
  }

}
