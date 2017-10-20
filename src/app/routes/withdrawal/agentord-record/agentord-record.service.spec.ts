import { TestBed, inject } from '@angular/core/testing';

import { AgentordRecordService } from './agentord-record.service';

describe('AgentordRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentordRecordService]
    });
  });

  it('should ...', inject([AgentordRecordService], (service: AgentordRecordService) => {
    expect(service).toBeTruthy();
  }));
});
