import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOrdComponent } from './agent-ord.component';

describe('AgentOrdComponent', () => {
  let component: AgentOrdComponent;
  let fixture: ComponentFixture<AgentOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
