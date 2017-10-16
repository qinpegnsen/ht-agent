import { TestBed, inject } from '@angular/core/testing';

import { MessageInformService } from './message-inform.service';

describe('MessageInformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageInformService]
    });
  });

  it('should ...', inject([MessageInformService], (service: MessageInformService) => {
    expect(service).toBeTruthy();
  }));
});
