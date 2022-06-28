import { TestBed } from '@angular/core/testing';

import { ResellerResolver } from './reseller.resolver';

describe('ResellerResolver', () => {
  let resolver: ResellerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResellerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
