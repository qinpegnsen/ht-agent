import { TestBed, inject } from '@angular/core/testing';

import { BillingDetailsService } from './billing-details.service';

describe('BillingDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillingDetailsService]
    });
  });

  it('should ...', inject([BillingDetailsService], (service: BillingDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
