import { TestBed } from '@angular/core/testing';

import { ActivateVcitaGuard } from './activate-vcita.guard';

describe('ActivateVcitaGuard', () => {
  let guard: ActivateVcitaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivateVcitaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
