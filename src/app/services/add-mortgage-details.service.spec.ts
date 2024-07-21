import { TestBed } from '@angular/core/testing';

import { AddMortgageDetailsService } from './add-mortgage-details.service';

describe('AddMortgageDetailsService', () => {
  let service: AddMortgageDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMortgageDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
