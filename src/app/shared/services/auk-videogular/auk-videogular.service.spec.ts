import { TestBed } from '@angular/core/testing';

import { AukVideogularService } from './auk-videogular.service';

describe('AukVideogularService', () => {
  let service: AukVideogularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AukVideogularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
