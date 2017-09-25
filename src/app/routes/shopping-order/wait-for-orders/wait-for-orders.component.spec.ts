import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForOrdersComponent } from './wait-for-orders.component';

describe('WaitForOrdersComponent', () => {
  let component: WaitForOrdersComponent;
  let fixture: ComponentFixture<WaitForOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
