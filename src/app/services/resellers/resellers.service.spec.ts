import { TestBed } from '@angular/core/testing';

import { ResellersService } from './resellers.service';

describe('ResellersService', () => {
  let service: ResellersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResellersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
