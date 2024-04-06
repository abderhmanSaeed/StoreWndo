import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-download-app-dialog',
  template: `
    <h2 mat-dialog-title>{{ 'header.downloadApp' | translate }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancelClick()">{{ 'actions.cancel' | translate }}</button>
      <button mat-button (click)="onOkClick()">{{ 'actions.ok' | translate }}</button>
    </mat-dialog-actions>
  `
})
export class DownloadAppDialogComponent  {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DownloadAppDialogComponent>
  ) {}

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onOkClick(): void {
    // Close the dialog
    this.dialogRef.close('ok');
    // Redirect to app store
    this.redirectToAppStore();
  }


  redirectToAppStore(): void {
    if (this.isIOS) {
      window.location.href = environment.mobileAppIosUrl;
    } else if (this.isAndroid) {
      window.location.href = environment.mobileAppGooglePlayUrl;
    } else {
      console.log('Non-mobile device detected');
      // Optional: Handle other devices or show a message
    }
  }

  get isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  get isAndroid(): boolean {
    return /android/i.test(navigator.userAgent);
  }

}
