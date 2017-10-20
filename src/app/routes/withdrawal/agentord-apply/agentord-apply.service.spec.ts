import { TestBed, inject } from '@angular/core/testing';

import { AgentordApplyService } from './agentord-apply.service';

describe('AgentordApplyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentordApplyService]
    });
  });

  it('should ...', inject([AgentordApplyService], (service: AgentordApplyService) => {
    expect(service).toBeTruthy();
  }));
});
