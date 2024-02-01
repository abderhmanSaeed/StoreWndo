import { TestBed } from '@angular/core/testing';

import { AukVideoService } from './auk-video.service';

describe('AukVideoService', () => {
  let service: AukVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AukVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
