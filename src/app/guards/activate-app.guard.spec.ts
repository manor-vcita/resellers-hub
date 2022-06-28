import { TestBed } from '@angular/core/testing';

import { ActivateAppGuard } from './activate-app.guard';

describe('ActivateAppGuard', () => {
  let guard: ActivateAppGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivateAppGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
