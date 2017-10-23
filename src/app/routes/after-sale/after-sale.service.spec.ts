import { TestBed, inject } from '@angular/core/testing';

import { AfterSaleService } from './after-sale.service';

describe('AfterSaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfterSaleService]
    });
  });

  it('should ...', inject([AfterSaleService], (service: AfterSaleService) => {
    expect(service).toBeTruthy();
  }));
});
