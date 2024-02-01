import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AwsS3UploadService {

  private readonly awsS3Config = environment.awsS3Config;

  constructor(
    private _NgxSpinnerService: NgxSpinnerService
  ) { }

  uploadFile(file: File): Promise<any> {
    this._NgxSpinnerService.show();
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: this.awsS3Config.accessKeyId,
        secretAccessKey: this.awsS3Config.secretAccessKey,
        region: this.awsS3Config.region,
      }
    );
    const params = {
      Bucket: this.awsS3Config.bucket,
      Key: uuidv4() + file.name.substring(file.name.indexOf(".")),
      Body: file,
      ContentType: contentType
    };
    let that = this;

    return new Promise((resolve, reject) => {
      bucket.upload(params, function (err: any, data: any) {
        if (err) {
          that._NgxSpinnerService.hide()
          reject(err);
          return false;
        }
        resolve(data);
        that._NgxSpinnerService.hide()
        return true;
      });
    });

  }







}
