import { TestBed } from '@angular/core/testing';

import { MortgageModelService } from './mortgage-model.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MortgageModelService', () => {
  let service: MortgageModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(MortgageModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
