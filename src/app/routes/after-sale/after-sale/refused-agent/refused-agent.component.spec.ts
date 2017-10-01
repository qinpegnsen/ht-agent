import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusedAgentComponent } from './refused-agent.component';

describe('RefusedAgentComponent', () => {
  let component: RefusedAgentComponent;
  let fixture: ComponentFixture<RefusedAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefusedAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusedAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
