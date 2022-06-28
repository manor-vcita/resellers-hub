import { TestBed } from '@angular/core/testing';

import { ResellerUserResolver } from './reseller-user.resolver';

describe('ResellerUserResolver', () => {
  let resolver: ResellerUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResellerUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
