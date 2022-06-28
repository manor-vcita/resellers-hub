import { TestBed } from '@angular/core/testing';

import { HubsResolver } from './hubs.resolver';

describe('HubsResolver', () => {
  let resolver: HubsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HubsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
