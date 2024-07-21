import { TestBed } from '@angular/core/testing';

import { MortgageDetailsService } from './mortgage-service.service';

describe('MortgageServiceService', () => {
  let service: MortgageDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
