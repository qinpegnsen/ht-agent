import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentordApplyComponent } from './agentord-apply.component';

describe('AgentordApplyComponent', () => {
  let component: AgentordApplyComponent;
  let fixture: ComponentFixture<AgentordApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentordApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentordApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
