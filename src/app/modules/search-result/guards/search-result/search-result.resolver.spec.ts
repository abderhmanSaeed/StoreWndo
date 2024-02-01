import { TestBed } from '@angular/core/testing';

import { SearchResultResolver } from './search-result.resolver';

describe('SearchResultResolver', () => {
  let resolver: SearchResultResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SearchResultResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
