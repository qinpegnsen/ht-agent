import { TestBed, inject } from '@angular/core/testing';

import { ShoppingOrderService } from './shopping-order.service';

describe('ShoppingOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingOrderService]
    });
  });

  it('should ...', inject([ShoppingOrderService], (service: ShoppingOrderService) => {
    expect(service).toBeTruthy();
  }));
});
