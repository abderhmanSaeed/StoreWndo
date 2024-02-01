import { TestBed } from '@angular/core/testing';

import { SellerProfileResolver } from './seller-profile.resolver';

describe('SellerProfileResolver', () => {
  let resolver: SellerProfileResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SellerProfileResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
