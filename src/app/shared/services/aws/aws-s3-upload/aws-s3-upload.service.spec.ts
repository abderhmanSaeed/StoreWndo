import { TestBed } from '@angular/core/testing';

import { AwsS3UploadService } from './aws-s3-upload.service';

describe('AwsS3UploadService', () => {
  let service: AwsS3UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsS3UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
