import { TestBed } from '@angular/core/testing';

import { TrackOrderResolver } from './track-order.resolver';

describe('TrackOrderResolver', () => {
  let resolver: TrackOrderResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TrackOrderResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
