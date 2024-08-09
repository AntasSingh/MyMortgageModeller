import { TestBed } from '@angular/core/testing';

import { MortgageModelService } from './mortgage-model.service';

describe('MortgageModelService', () => {
  let service: MortgageModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
