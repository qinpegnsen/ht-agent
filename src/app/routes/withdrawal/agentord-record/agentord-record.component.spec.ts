import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentordRecordComponent } from './agentord-record.component';

describe('AgentordRecordComponent', () => {
  let component: AgentordRecordComponent;
  let fixture: ComponentFixture<AgentordRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentordRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentordRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
