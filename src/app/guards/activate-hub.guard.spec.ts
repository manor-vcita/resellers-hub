import { TestBed } from '@angular/core/testing';

import { ActivateHubGuard } from './activate-hub.guard';

describe('ActivateHubGuard', () => {
  let guard: ActivateHubGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivateHubGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
