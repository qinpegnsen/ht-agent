import { TestBed, inject } from '@angular/core/testing';

import { DataDictService } from './data-dict.service';

describe('DataDictService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataDictService]
    });
  });

  it('should ...', inject([DataDictService], (service: DataDictService) => {
    expect(service).toBeTruthy();
  }));
});
