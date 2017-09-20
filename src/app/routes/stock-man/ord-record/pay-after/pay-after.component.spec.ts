import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayAfterComponent } from './pay-after.component';

describe('PayAfterComponent', () => {
  let component: PayAfterComponent;
  let fixture: ComponentFixture<PayAfterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayAfterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
