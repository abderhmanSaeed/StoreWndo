import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { AwsS3UploadService } from 'src/app/shared/services/aws/aws-s3-upload/aws-s3-upload.service';
import { FileService } from 'src/app/shared/services/file/file.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { environment } from 'src/environments/environment';
import { CancelationDialogComponent } from '../cancelation-dialog/cancelation-dialog.component';

@Component({
  selector: 'app-add-rate-dialog',
  templateUrl: './add-rate-dialog.component.html',
  styleUrls: ['./add-rate-dialog.component.scss']
})
export class AddRateDialogComponent implements OnInit {


  // props 
  rate: any = '';
  form!: FormGroup;
  faCamera = faCamera;
  mediaPath: string =  '';
  file: File | null = null;
  subscription: Subscription = new Subscription();
  mainRippleColor: string = environment.mainRippleColor;

  constructor(
    private _HttpService: HttpService,
    private _FileService: FileService,
    private _FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _AwsS3UploadService: AwsS3UploadService,
    private _DialogRef: MatDialogRef<CancelationDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  initForm(): void {
    this.form = this._FormBuilder.group({
      description: [null],
    });
  }


  submit(): void {    

    if (!this.rate && !this.form.value.description && !this.mediaPath) {
      this._MessagesService.openErrorSnackBar(
        this._TranslateService.instant('meassges.kindly-add-feedback')
      )
      return
    }


    if (this.file) {
      this._AwsS3UploadService.uploadFile(this.file).then( (res: any) => {
        this.review(res?.Location);
      });
      return
    }

    this.review();

  }


  review(mediaLocation: string = ''): void {
    const payload = {
      rate: this.rate,
      urlThumbnail: mediaLocation, 
      urlPreview: mediaLocation,
      urlDownload: mediaLocation,
      productId: this.data.productId,
      description: this.form.value.description,
    }
    

    this.subscription.add(
      this._HttpService.post(APIs.review, payload).subscribe( (res: HResponse) => {
        if (res.isSuccess) {
          this._DialogRef.close({
            ...res,
            rate: this.rate
          });
        } 
      })  
    );
  }


  onFileChange(event: any): void {
    this.file = event.target.files[0];
    this._FileService.createObjectURL(event).then( value => {
      this.mediaPath = value;
    });


  }


  onImgError(event: any){
    event.target.src = 'assets/media/users/user-placeholder.png'
  }


  deleteSelectedMedia(): void {
    this.mediaPath = '';
  }

}