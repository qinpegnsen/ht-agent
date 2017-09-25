import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWorkOrdersComponent } from './all-work-orders.component';

describe('AllWorkOrdersComponent', () => {
  let component: AllWorkOrdersComponent;
  let fixture: ComponentFixture<AllWorkOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllWorkOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWorkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
