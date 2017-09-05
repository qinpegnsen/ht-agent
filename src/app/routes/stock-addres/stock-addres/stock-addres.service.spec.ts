import { TestBed, inject } from '@angular/core/testing';

import { StockAddresService } from './stock-addres.service';

describe('StockAddresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockAddresService]
    });
  });

  it('should ...', inject([StockAddresService], (service: StockAddresService) => {
    expect(service).toBeTruthy();
  }));
});
